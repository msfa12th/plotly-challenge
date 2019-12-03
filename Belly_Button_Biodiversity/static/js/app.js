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


function buildCharts(sample) {

  var URL = `/samples/${sample}`;

  d3.json(URL).then((sampleData) => {

  // BUILD PIE CHART
    var dataPie = [{
      "labels": sampleData["otu_ids"].slice(0,10),
      "values": sampleData["sample_values"].slice(0,10),
      "hovertext": sampleData["otu_labels"].slice(0,10),
      "type": "pie"
    }];

    var layoutPie = {
      autosize: true,
      width: 400,
      height: 400,
      margin: { l: 0, r: 0, t:0, b:0}
    };
    
    Plotly.newPlot("pie", dataPie, layoutPie);

  // BUILD BUBBLE CHART
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

    var layoutBubble = {
        xaxis: {
          title: {
            text: "OTU_IDS"
          }},
        height: 500,
        width: 1200
    };
    
    var dataBubble = [traceBubble];
 
    Plotly.newPlot('bubble', dataBubble,layoutBubble);

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

    buildMetadata(firstSample);
    buildCharts(firstSample);
    buildGauge(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  buildGauge(newSample);
}

// Initialize the dashboard
init();
