// =====================================================
// Power Query M Script for Code Coverage Data
// =====================================================

// Main transformation function
let
    // =====================================================
    // STEP 1: CONNECT TO SHARED FOLDER AND GET ALL CSV FILES
    // =====================================================
    
    // Update this path to your shared folder
    FolderPath = "C:\SharedFolder\CoverageData",
    
    // Get all files from the folder
    Source = Folder.Files(FolderPath),
    
    // Filter only CSV files
    FilteredFiles = Table.SelectRows(Source, each Text.EndsWith([Name], ".csv") and not Text.StartsWith([Name], "~")),
    
    // =====================================================
    // STEP 2: EXTRACT BUILD INFORMATION FROM FILENAMES
    // =====================================================
    
    // Extract build number from filename (assuming format like "coverage_build_282.csv")
    AddBuildNumber = Table.AddColumn(FilteredFiles, "Build Number", 
        each 
            let
                FileName = [Name],
                // Extract build number using regex or text functions
                BuildMatch = Text.BetweenDelimiters(FileName, "build_", ".csv"),
                BuildNum = if BuildMatch = "" then Text.BetweenDelimiters(FileName, "_", ".csv") else BuildMatch
            in
                "build_" & BuildNum,
        type text),
    
    // Add file modified date as build date
    AddBuildDate = Table.AddColumn(AddBuildNumber, "Build Date", each [Date modified], type datetime),
    
    // =====================================================
    // STEP 3: IMPORT AND COMBINE CSV CONTENT
    // =====================================================
    
    // Add custom column to load CSV content
    AddContent = Table.AddColumn(AddBuildDate, "CSV Content", 
        each 
            try 
                Csv.Document([Content], [Delimiter=",", Columns=11, Encoding=65001, QuoteStyle=QuoteStyle.None])
            otherwise 
                #table({"Column1", "Column2", "Column3", "Column4", "Column5", "Column6", "Column7", "Column8", "Column9", "Column10", "Column11"}, {})),
    
    // Expand the CSV content
    ExpandedContent = Table.ExpandTableColumn(AddContent, "CSV Content", 
        {"Column1", "Column2", "Column3", "Column4", "Column5", "Column6", "Column7", "Column8", "Column9", "Column10", "Column11"}, 
        {"Column1", "Column2", "Column3", "Column4", "Column5", "Column6", "Column7", "Column8", "Column9", "Column10", "Column11"}),
    
    // =====================================================
    // STEP 4: CLEAN AND STRUCTURE THE DATA
    // =====================================================
    
    // Remove rows where Column1 is null or contains header information
    FilteredRows = Table.SelectRows(ExpandedContent, each [Column1] <> null and [Column1] <> "Build Number" and not Text.StartsWith([Column1], "build")),
    
    // Rename columns based on your CSV structure
    RenamedColumns = Table.RenameColumns(FilteredRows, {
        {"Column1", "Original Build Number"},
        {"Column2", "Model"}, 
        {"Column3", "Subfolder"}, 
        {"Column4", "Script Name"}, 
        {"Column5", "Module"}, 
        {"Column6", "Complexity"}, 
        {"Column7", "Decision"}, 
        {"Column8", "Condition"}, 
        {"Column9", "MCDC"}, 
        {"Column10", "TBL"}, 
        {"Column11", "Execution"}
    }),
    
    // =====================================================
    // STEP 5: DATA TYPE CONVERSIONS
    // =====================================================
    
    // Convert numeric columns to proper data types
    ConvertedTypes = Table.TransformColumnTypes(RenamedColumns, {
        {"Build Number", type text},
        {"Build Date", type datetime},
        {"Model", type text},
        {"Subfolder", type text},
        {"Script Name", type text},
        {"Module", type text},
        {"Complexity", Int64.Type},
        {"Decision", Int64.Type},
        {"Condition", Int64.Type},
        {"MCDC", Int64.Type},
        {"TBL", Int64.Type},
        {"Execution", Int64.Type}
    }),
    
    // =====================================================
    // STEP 6: ADD CALCULATED COLUMNS
    // =====================================================
    
    // Add Line Coverage Percentage
    AddLineCoverage = Table.AddColumn(ConvertedTypes, "Line Coverage %", 
        each if [TBL] = 0 then 0 else Number.Round([Execution] / [TBL] * 100, 2), type number),
    
    // Add Branch Coverage Percentage
    AddBranchCoverage = Table.AddColumn(AddLineCoverage, "Branch Coverage %", 
        each if [Decision] = 0 then 0 else Number.Round([Condition] / [Decision] * 100, 2), type number),
    
    // Add MCDC Coverage Percentage
    AddMCDCCoverage = Table.AddColumn(AddBranchCoverage, "MCDC Coverage %", 
        each if [Decision] = 0 then 0 else Number.Round([MCDC] / [Decision] * 100, 2), type number),
    
    // Add Function Coverage (binary: covered if Execution > 0)
    AddFunctionCoverage = Table.AddColumn(AddMCDCCoverage, "Function Covered", 
        each if [Execution] > 0 then 1 else 0, Int64.Type),
    
    // Add Coverage Category
    AddCoverageCategory = Table.AddColumn(AddFunctionCoverage, "Coverage Category", 
        each 
            if [Line Coverage %] >= 80 then "High Coverage"
            else if [Line Coverage %] >= 60 then "Medium Coverage"
            else "Low Coverage", type text),
    
    // Add Complexity Category
    AddComplexityCategory = Table.AddColumn(AddCoverageCategory, "Complexity Category", 
        each 
            if [Complexity] >= 20 then "Very High"
            else if [Complexity] >= 15 then "High"
            else if [Complexity] >= 10 then "Medium"
            else if [Complexity] >= 5 then "Low"
            else "Very Low", type text),
    
    // =====================================================
    // STEP 7: CREATE HIERARCHICAL COLUMNS
    // =====================================================
    
    // Create Module Key for relationships
    AddModuleKey = Table.AddColumn(AddComplexityCategory, "Module Key", 
        each [Model] & "|" & [Module], type text),
    
    // Create Script Key
    AddScriptKey = Table.AddColumn(AddModuleKey, "Script Key", 
        each [Module Key] & "|" & [Script Name], type text),
    
    // Extract Build Number for sorting
    AddBuildSort = Table.AddColumn(AddScriptKey, "Build Sort", 
        each 
            let
                BuildText = [Build Number],
                NumberPart = Text.AfterDelimiter(BuildText, "_"),
                BuildInt = try Number.FromText(NumberPart) otherwise 0
            in
                BuildInt, Int64.Type),
    
    // =====================================================
    // STEP 8: DATA QUALITY CHECKS AND CLEANUP
    // =====================================================
    
    // Remove rows with invalid data
    CleanedData = Table.SelectRows(AddBuildSort, each 
        [Module] <> null and 
        [Module] <> "" and
        [TBL] >= 0 and
        [Execution] >= 0 and
        [Execution] <= [TBL]
    ),
    
    // Replace null values in text columns
    ReplacedNulls = Table.ReplaceValue(CleanedData, null, "Unknown", Replacer.ReplaceValue, {"Model", "Subfolder", "Script Name", "Module"}),
    
    // =====================================================
    // STEP 9: ADD AUDIT COLUMNS
    // =====================================================
    
    // Add data load timestamp
    AddLoadTimestamp = Table.AddColumn(ReplacedNulls, "Data Load Time", each DateTime.LocalNow(), type datetime),
    
    // Add record hash for change detection
    AddRecordHash = Table.AddColumn(AddLoadTimestamp, "Record Hash", 
        each Text.From(Number.BitwiseAnd(
            Number.Mod(
                Text.Length([Build Number] & [Module] & [Script Name]) * 
                ([TBL] + [Execution] + 1), 
                999999
            ), 
            999999
        )), type text),
    
    // =====================================================
    // STEP 10: FINAL COLUMN SELECTION AND ORDERING
    // =====================================================
    
    // Select and reorder final columns
    FinalColumns = Table.SelectColumns(AddRecordHash, {
        "Build Number",
        "Build Date", 
        "Build Sort",
        "Model",
        "Module",
        "Module Key",
        "Subfolder",
        "Script Name",
        "Script Key",
        "Complexity",
        "Complexity Category",
        "Decision",
        "Condition", 
        "MCDC",
        "TBL",
        "Execution",
        "Function Covered",
        "Line Coverage %",
        "Branch Coverage %",
        "MCDC Coverage %",
        "Coverage Category",
        "Data Load Time",
        "Record Hash"
    }),
    
    // Sort by Build Number and Module
    SortedData = Table.Sort(FinalColumns, {{"Build Sort", Order.Descending}, {"Module", Order.Ascending}, {"Script Name", Order.Ascending}})

in
    SortedData

// =====================================================
// ADDITIONAL HELPER QUERIES
// =====================================================

// Query: DimBuild - Build dimension table
DimBuild = 
let
    Source = FactCoverage,
    BuildDim = Table.Distinct(Table.SelectColumns(Source, {"Build Number", "Build Date", "Build Sort"})),
    AddBuildIndex = Table.AddIndexColumn(BuildDim, "Build Index", 1, 1, Int64.Type),
    AddIsLatest = Table.AddColumn(AddBuildIndex, "Is Latest Build", 
        each [Build Sort] = List.Max(BuildDim[Build Sort]), type logical)
in
    AddIsLatest

// Query: DimModule - Module dimension table  
DimModule = 
let
    Source = FactCoverage,
    ModuleDim = Table.Distinct(Table.SelectColumns(Source, {"Model", "Module", "Module Key"})),
    SortedModules = Table.Sort(ModuleDim, {{"Model", Order.Ascending}, {"Module", Order.Ascending}})
in
    SortedModules

// Query: DimScript - Script dimension table
DimScript = 
let
    Source = FactCoverage,
    ScriptDim = Table.Distinct(Table.SelectColumns(Source, {
        "Module Key", "Module", "Subfolder", "Script Name", "Script Key"
    })),
    SortedScripts = Table.Sort(ScriptDim, {{"Module", Order.Ascending}, {"Script Name", Order.Ascending}})
in
    SortedScripts

// Query: BuildSummary - Aggregated metrics by build
BuildSummary = 
let
    Source = FactCoverage,
    GroupedByBuild = Table.Group(Source, {"Build Number", "Build Date", "Build Sort"}, {
        {"Total Modules", each Table.RowCount(Table.Distinct(Table.SelectColumns(_, {"Module"}))), Int64.Type},
        {"Total Scripts", each Table.RowCount(_), Int64.Type},
        {"Total Lines", each List.Sum([TBL]), Int64.Type},
        {"Executed Lines", each List.Sum([Execution]), Int64.Type},
        {"Total Decisions", each List.Sum([Decision]), Int64.Type},
        {"Covered Conditions", each List.Sum([Condition]), Int64.Type},
        {"Avg Complexity", each Number.Round(List.Average([Complexity]), 1), type number}
    }),
    AddCoverageMetrics = Table.AddColumn(GroupedByBuild, "Overall Line Coverage %", 
        each if [Total Lines] = 0 then 0 else Number.Round([Executed Lines] / [Total Lines] * 100, 2), type number),
    AddBranchMetrics = Table.AddColumn(AddCoverageMetrics, "Overall Branch Coverage %", 
        each if [Total Decisions] = 0 then 0 else Number.Round([Covered Conditions] / [Total Decisions] * 100, 2), type number)
in
    AddBranchMetrics