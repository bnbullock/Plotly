function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("static/js/samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("static/js/samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("static/js/samples.json").then((data) => {

    // 3. Create a variable that holds the samples array. 
    var allSamples = data.samples;

     // Gauge Chart
    var metadata = data.metadata;

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultSamples = allSamples.filter(sampleObj => sampleObj.id == sample);
    console.log(resultSamples);

    // Gauge Chart
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    console.log(resultSamples);

    //  5. Create a variable that holds the first sample in the array.
    var resultOne = resultSamples[0];
    console.log(resultOne);

     // Gauge Chart
    var result = resultArray[0];
    console.log(result);

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = resultOne.otu_ids;
    var otu_labels = resultOne.otu_labels;
    var sample_values = resultOne.sample_values;

     // Gauge Chart
    var washFreq = parseFloat(result.wfreq).toFixed(2);
    console.log(washFreq);

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`);

    // 8. Create the trace for the bar chart. 

    var barData = [
      {
        x:sample_values,
        y:yticks,
        text: otu_labels,
        type: "bar",
        orientation: "h",
        marker: {
          //color: 'rgb(158,202,225)',
          color: 'rgb(250,146,28)',
          opacity: 0.6,
          line: {
            //color: 'rgb(8,48,107)',
            color: 'rgb(5,28,85)',
            width: 1.5
          }
        }
      }
    ];

    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "<b>Top 10 Bacteria Cultures Found</b>",
      font: { color: "darkblue", family: "Arial"},
      yaxis: {autorange: "reversed"} 
    };

    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);

    // Deliverable 2
        
    // 1. Create the data for the bubble chart.

    var bubbleData = [
      {
        x:otu_ids,
        y:sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: 'Portland',
          type: 'heatmap'
        }
      }
    ];
    console.log(bubbleData);

    // 2. Create the layout for the bubble chart.

    var bubbleLayout = {
      title: '<b>Bacteria Cultures Per Sample</b>',
      font: { color: "darkblue", family: "Arial" },
      showlegend: false,
      height: 610,
      width: 1138,
      plot_bgcolor:"SeaShell",
      paper_bgcolor: "SeaShell",
      xaxis: {title: { text: 'OTU ID'}}
    };
    
    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);

    // Deliverable 3

    // 4. Create the data for the gauge chart.
    var gaugeData = [
      {
        domain: { x: [0, 10], y: [0, 10] },
        value: washFreq,
        title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 10] },
          steps: [
            { range: [0, 2], color: "red" },
            { range: [2, 4], color: "orange" },
            { range: [4, 6], color: "yellow" },
            { range: [6, 8], color: "lightgreen" },
            { range: [8, 10], color: "green" }
          ],
          bar: { color: "black" }
        }
      }
    ];
        
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
          width: 465, 
          height: 500, 
          margin: { t: 0, b: 0 },
          font: { color: "darkblue", family: "Arial" }
    };
    
    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge', gaugeData, gaugeLayout);
  });
}
