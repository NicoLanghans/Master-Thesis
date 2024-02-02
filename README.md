# Master thesis

## Content
Accessibility to urban green spaces is crucial for urban development, especially for growing cities. The most popular method to measure proximity (as one concept of accessibility) is the street network analysis. This method calculates the farthest point a person can reach using manhattan distance considering the actual street network and natural barriers. Street network analysis uses two input paramters: walking distance and starting point. Recent studies used the parks centroid as starting point to calculate parks catchment area. 
This study's aim is to use street network analysis and compare two different approaches for defining the input parameter of starting point: centroid vs. park entrances. Both approaches result in different catchment areas per park which have different sociodemographic characteristics and number of residents. A accessibility score calculation and a correlation analysis is the basis for answering the question which approach suits better for assessing spatial and social equity in park accessibility: centroid-based approach or entrance-based approach. 

## Repository structure
The repository structure follows the different step of data processing and calculation:

### get_park_data
Processing of raw data concerning parks. Source data is a subset of all green spaces of the city of hamburg (Urban Data Platform / Geoportal Hamburg).
Steps of data processing includes
- merging multiple polygons of the same park to one polygon
- adding a centroid per park polygon
- adding walking distance buckets depending on park size
- excluding large regional parks and small < 1 ha parks
- collection of park entrances with leaflet.js application

### get_population_data
Processing of census data of Statistikamt Nord
Steps of processing includes
- creating sames sized polygons based on provided census block centroid (using crs 3395 transformation and square styled buffering)
- adding unique ID per census block

### get_isodistances
Includes API Request for isodistance polygons and isodistance processing
API Request includes
- 118 requests for centroid coordinates
- > 1300 requests for entrance coordinates

Isodistance processing includes
- merge and group isodistances of entrances by park (-> catchment area)
- calculate share of intersection between catchment area polygon and census blocks per park
- weighting of residents and sociodemographics per catchment area by intersection share

### accessibilty_score
Calculation of accessibility score and correlation analysis
- accessibility score per park includes catchment areas residents and parks size
- correlation analysis was conducted for accessibility score and weighted sociodemographics


### visualizations
Includes relevant visualizations for written paper, includes descriptives and different maps