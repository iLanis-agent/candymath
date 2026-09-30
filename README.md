# CandyMath

Six candy syrup stages with approximate elevation correction and a thermometer reading check.

The stage ranges are converted from Exploratorium's Fahrenheit table. The elevation rule is 1 F per 500 ft (1 C per 274.32 m), as described by Exploratorium and Colorado State University Extension. Weather and thermometer calibration affect results. Use a recipe and cold-water test; the model does not cover dry caramel. Hot sugar can cause serious burns.

Sources:
- https://www.exploratorium.edu/explore/cooking/candy-making-stages
- https://extension.colostate.edu/resource/candy-making-at-high-elevation/

Static client-side app. No account or data collection.

Run tests: `node test-engine.js`.
