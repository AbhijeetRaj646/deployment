# Power BI Code Coverage Dashboard Guide

## Dashboard Structure & Data Model

### 1. Data Preparation & Import

#### Setting up Auto-Refresh from Shared Folder
```powerquery
// Power Query M code for combining all CSV files from folder
let
    Source = Folder.Files("C:\SharedFolder\CoverageData"),
    FilteredRows = Table.SelectRows(Source, each Text.EndsWith([Name], ".csv")),
    #"Added Custom" = Table.AddColumn(FilteredRows, "Data", each Csv.Document([Content])),
    #"Expanded Data" = Table.ExpandTableColumn(#"Added Custom", "Data", 
        {"Build Number", "Model", "Subfolder", "Script Name", "Module", "Complexity", 
         "Decision", "Condition", "MCDC", "TBL", "Execution"}, 
        {"Build Number", "Model", "Subfolder", "Script Name", "Module", "Complexity", 
         "Decision", "Condition", "MCDC", "TBL", "Execution"}),
    #"Removed Other Columns" = Table.SelectColumns(#"Expanded Data",
        {"Build Number", "Model", "Subfolder", "Script Name", "Module", "Complexity", 
         "Decision", "Condition", "MCDC", "TBL", "Execution"})
in
    #"Removed Other Columns"
```

#### Data Transformation Steps
1. **Extract Build Info**: Parse build number and date from filename or content
2. **Calculate Coverage Percentages**:
```powerquery
// Add calculated columns for coverage percentages
= Table.AddColumn(PreviousStep, "Line Coverage %", 
    each if [TBL] = 0 then 0 else [Execution] / [TBL] * 100)
= Table.AddColumn(PreviousStep, "Branch Coverage %", 
    each if [Decision] = 0 then 0 else [Condition] / [Decision] * 100)
= Table.AddColumn(PreviousStep, "Function Coverage %", 
    each if [Module] = 0 then 0 else [Execution] / [Module] * 100)
```

### 2. Data Model Design

#### Recommended Table Structure:
- **FactCoverage**: Main metrics table
- **DimBuild**: Build dimension (Build Number, Date, Version)
- **DimModule**: Module hierarchy (Module, Subfolder, Script Name)
- **DimModel**: Model information

#### Relationships:
```
DimBuild[Build Number] → FactCoverage[Build Number] (1:*)
DimModule[Module Key] → FactCoverage[Module Key] (1:*)
DimModel[Model] → FactCoverage[Model] (1:*)
```

## Dashboard Pages Structure

### Page 1: Executive Summary
**Purpose**: High-level overview across all builds

#### Key Visualizations:
1. **KPI Cards** (Top Row):
   - Overall Line Coverage %
   - Overall Branch Coverage %
   - Overall Function Coverage %
   - Total Modules Tested

2. **Trend Analysis** (Middle):
   - Line chart: Coverage trends over builds
   - Column chart: Coverage by build (last 10 builds)

3. **Summary Table** (Bottom):
   - Build summary with overall metrics
   - Conditional formatting for coverage levels

#### DAX Measures:
```dax
// Overall Line Coverage
Overall_Line_Coverage = 
DIVIDE(
    SUM(FactCoverage[Execution]),
    SUM(FactCoverage[TBL]),
    0
) * 100

// Coverage Status
Coverage_Status = 
SWITCH(
    TRUE(),
    [Overall_Line_Coverage] >= 80, "Good",
    [Overall_Line_Coverage] >= 60, "Fair",
    "Poor"
)

// Build Count
Total_Builds = DISTINCTCOUNT(FactCoverage[Build Number])
```

### Page 2: Build Deep Dive
**Purpose**: Detailed view when a specific build is selected

#### Key Visualizations:
1. **Build Header**: Selected build info and overall metrics
2. **Module Performance Matrix**: Heatmap of modules by coverage types
3. **Top/Bottom Performers**: 
   - Top 10 modules by coverage
   - Bottom 10 modules needing attention
4. **Module Breakdown Table**: Detailed metrics per module

#### Slicers:
- Build Number (connected from Page 1)
- Model filter
- Coverage threshold filter

### Page 3: Module Analysis (Drill-through)
**Purpose**: Submodule/test file level details

#### Setup Drill-through:
1. Add "Module" to drill-through filters
2. Configure drill-through from Page 2 module visuals

#### Key Visualizations:
1. **Module Header**: Selected module info
2. **Subfolder/Script Breakdown**: 
   - Bar chart of coverage by script
   - Tree map of complexity vs coverage
3. **Detailed Metrics Table**: All submodule metrics
4. **Trend Analysis**: Module performance over builds

## Interactive Features Implementation

### 1. Slicers Configuration

#### Build Slicer:
```dax
// Custom sort for build numbers
Build_Sort = 
VAR BuildNum = VALUE(RIGHT(FactCoverage[Build Number], LEN(FactCoverage[Build Number]) - 6))
RETURN BuildNum
```

#### Hierarchy Slicer:
- Create hierarchy: Model → Module → Subfolder → Script Name
- Enable drill-down in slicer settings

### 2. Conditional Formatting

#### Coverage Percentage Rules:
- **Green**: ≥ 80%
- **Yellow**: 60-79%
- **Red**: < 60%

#### Implementation:
```dax
// Color coding measure
Coverage_Color = 
SWITCH(
    TRUE(),
    [Line Coverage %] >= 80, "#4CAF50", // Green
    [Line Coverage %] >= 60, "#FF9800", // Orange
    "#F44336" // Red
)
```

### 3. Dynamic Titles and Context

```dax
// Dynamic page title
Page_Title = 
"Code Coverage Analysis - " & 
IF(
    ISFILTERED(DimBuild[Build Number]),
    "Build " & SELECTEDVALUE(DimBuild[Build Number]),
    "All Builds"
)
```

## Auto-Refresh Setup

### 1. Gateway Configuration:
1. Install On-premises Data Gateway on server with access to shared folder
2. Configure data source with folder path
3. Set up scheduled refresh (recommend every 4-6 hours)

### 2. Refresh Settings:
```json
{
  "refreshSchedule": {
    "days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "times": ["06:00", "12:00", "18:00"],
    "localTimeZoneId": "UTC"
  }
}
```

### 3. Error Handling:
```powerquery
// Add error handling for missing files
let
    Source = try Folder.Files(FolderPath) otherwise #table({"Name", "Content"}, {}),
    HandleErrors = if Source[HasError] then #table({"Build Number"}, {{"No Data"}}) else Source
in
    HandleErrors
```

## Advanced Features

### 1. Bookmarks for Navigation:
- Create bookmarks for different views
- Add navigation buttons between pages

### 2. Custom Tooltips:
- Create tooltip pages showing trend details
- Add complexity vs coverage scatter plots

### 3. Mobile Layout:
- Configure mobile-optimized layouts
- Prioritize KPI cards and key metrics

### 4. Export Capabilities:
```dax
// Measure for export-ready format
Export_Summary = 
"Build: " & SELECTEDVALUE(DimBuild[Build Number]) & 
" | Line Coverage: " & FORMAT([Overall_Line_Coverage], "0.0%") &
" | Branch Coverage: " & FORMAT([Overall_Branch_Coverage], "0.0%")
```

## Performance Optimization

### 1. Data Model Optimizations:
- Use calculated columns sparingly
- Implement proper data types
- Create relationships efficiently

### 2. DAX Optimizations:
```dax
// Use variables for complex calculations
Optimized_Coverage = 
VAR TotalLines = SUM(FactCoverage[TBL])
VAR ExecutedLines = SUM(FactCoverage[Execution])
RETURN 
    IF(TotalLines = 0, 0, DIVIDE(ExecutedLines, TotalLines) * 100)
```

### 3. Visual Optimizations:
- Limit data points in visuals (top N filtering)
- Use appropriate visual types for data volume
- Implement row-level security if needed

## Deployment Checklist

- [ ] Data source connections configured
- [ ] Gateway installed and configured
- [ ] Scheduled refresh set up
- [ ] User permissions configured
- [ ] Mobile layouts created
- [ ] Bookmarks and navigation tested
- [ ] Performance validated with full dataset
- [ ] Documentation provided to users

## Troubleshooting Common Issues

### Data Refresh Failures:
1. Check gateway connectivity
2. Verify folder permissions
3. Validate CSV file formats
4. Review error logs in Power BI Service

### Performance Issues:
1. Reduce visual complexity
2. Implement data source filters
3. Optimize DAX measures
4. Consider data aggregation strategies

This comprehensive setup will provide a robust, interactive dashboard that meets all your requirements for code coverage analysis and monitoring.