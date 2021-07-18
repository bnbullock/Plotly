# Plotly Dashboarding


## Project Overview

Our Client has asked us to take an existing UFO website that performs searches based on a single criteria and expand it to filter on multiple criteria.

- Deliverables:
  1. Horizantal bar chart displaying the top 10 bacterial species (OTU's)
  2. Bubble chart showing bacterial cultures for a specific individual
  3. Gauge Chart showing weekly washing frequency
------------------------------------------------------------------------------------------------------------

## Resources
- Software: Visual Studio Code 1.56.2, JavaScript shell inside VS Code
- Browser : Google Chrome v91.0.4472.124 
- Libraries: Bootstrap v4.0, d3 v4.11.0, Plotly v1.58.5
------------------------------------------------------------------------------------------------------------

## Results

- As you can see from the screen capture below 

![Website](/static/images/dash.png)

### Horizontal Bar Chart

![Website](static/images/hbar.png)

### Bubble Chart

![Website](static/images/bubble.png)

### Gauge Chart

![Website](static/images/gauge.png)

### Dashboard Customizations

- The following features were changed/added to cutomize the dashboard further:
  - Added mobile-responsiveness for different devices
  - Reduced the Hemispheric images to smaller size with width="200"
  - Increased the Mars Facts table for a larger width and added mobile responsiveness
  - Moved the Memisphere title to above the image
  - Changed the background color for Mission to Mars jumbotron
  - Added a style.css file that includes a jumbotron image
  - Also in the styles file, the font color was set to DarkBlue and font to Arial.


------------------------------------------------------------------------------------------------------------

## Summary Analysis

- The display results have generally met the deliverables and the website panel filtering performed as expected with valid data being returned for a selected individual. We can filter on one person and have all charts updated simultaneously to allow for a more visually comphrensive view of the data within the dashboard.