// BONUS: Build the Gauge Chart

  function buildGauge(sample) {
    var URL = `/metadata/${sample}`;
    
    d3.json(URL).then((sampleData) => {

        //Enter a level between 0 and 9
        var level = sampleData["WFREQ"];

        // Trig to calc meter point
        var degrees = 180-(level)*20 ;
        var radius = 0.5;
        var radians = degrees * Math.PI / 180;
        var x = radius * Math.cos(radians);
        var y = radius * Math.sin(radians);

        // Path: may have to change to create a better triangle
        var mainPath = 'M -.0 -0.035 L .0 0.035 L ',
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
        var path = mainPath.concat(pathX,space,pathY,pathEnd);

        var data = [{ type: 'category',
        x: [0], y:[0],
            marker: {size: 28, color:'850000'},
            showlegend: false,
            name: 'gauge',
            text: level,
            hoverinfo: 'text+name'},
        { values: [2,2,2,2,2,2,2,2,2,18],
        rotation: 90,
        
        text: ['8-9','7-8','6-7','5-6','4-5','3-4','2-3','1-2','0-1', ' '],
        textinfo: 'text',
        textposition:'inside',      
        marker: {colors:["#7DB482",  "#82BC88" ,   "#84BF7C" , "#B6CD87", 
                    "#D4E590", "E4E9AB","#E8E6C7", "#F3F0E3","#F7F2EB","#FFFFFF"]},
        hole: .5,
        type: 'pie',
        showlegend: false
        }];

        var layout = {
            shapes:[{
                type: 'path',
                path: path,
                fillcolor: '850000',
                line: {
                    color: '850000'
                }
                }],
            title: "<b>Belly Button Washing Frequency</b><br>Scrubs Per Week",
            "titlefont": {size: 12},
            height: 500,
            width: 500,
            xaxis: {type:'category',zeroline:false, showticklabels:false,
                        showgrid: false, range: [-1, 1]},
            yaxis: {type:'category',zeroline:false, showticklabels:false,
                        showgrid: false, range: [-1, 1]}
        };

        Plotly.newPlot('gauge', data, layout);
    });
}