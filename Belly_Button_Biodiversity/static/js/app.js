function buildMetadata(sample) {

  var URL = `/metadata/${sample}`;
  var selectMetaData = d3.select("#sample-metadata");

  d3.json(URL).then((sampleMetaData) => {
    selectMetaData.html("");     
    Object.entries(sampleMetaData).forEach(([key,value]) => {
      selectMetaData
        .append("p")
        .append("text")
        .text(`${key}: ${value}`)
    });
  });

}

// BONUS: Build the Gauge Chart
// buildGauge(data.WFREQ);


function buildCharts(sample) {

  var URL = `/samples/${sample}`;
  var selectPieData = d3.select("#pie");
  var selectBubbleData = d3.select("#bubble");
  var selectGaugeData = d3.select("#gauge");

  // Build Charts
  d3.json(URL).then((sampleData) => {

    // selectPieData.html("");     
    // selectBubbleData.html("");     
    // selectGaugeData.html("");     
    var dataPie = [{
      "labels": sampleData["otu_ids"].slice(0,10),
      "values": sampleData["sample_values"].slice(0,10),
      "hovertext": sampleData["otu_labels"].slice(0,10),
      "type": "pie"
    }];

    var pieLayout = [{
      overwrite: true,
      showlegend: true
    }];

    Plotly.plot("pie", dataPie, pieLayout);

    var traceBubble = {
      x: sampleData["otu_ids"],
      y: sampleData["sample_values"],
      text: sampleData["otu_labels"],
      mode: 'markers',
      marker: {
        size: sampleData["sample_values"],
        color: sampleData["otu_ids"]
      }
    };
    
    var dataBubble = [traceBubble];
 
    Plotly.plot('bubble', dataBubble);

  });

}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
}

// Initialize the dashboard
init();
