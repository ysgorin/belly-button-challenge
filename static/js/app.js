// Read samples.json from URL
const samplesURL = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

d3.json(samplesURL).then(function(data) {
  // Initial sample
  let sample = "940";

  // Create a filter function
  function filterByID(data) {
    return data.id === sample;
  };

  // Apply filter to get sample data
  let sampleData = data.samples.filter(filterByID)[0];
  
  // Create top ten otuIDS list
  let topTenIDs = sampleData.otu_ids.slice(0,10);

  // Reverse the list for Plotly defaults
  topTenIDs.reverse();

  // Create top ten labels list
  let topTenLabels = sampleData.otu_labels.slice(0,10);
  //Reverse the list
  topTenLabels.reverse();

  // Create top ten values list and reverse the list
  let topTenValues = sampleData.sample_values.slice(0,10);
  topTenValues.reverse();

  // Create bar chart trace
  let trace1 = {
    x: topTenValues,
    y: topTenIDs.map(function(id) {
      return "OTU " + id;
    }),
    text: topTenLabels,
    type: "bar",
    orientation: "h"
  };

  // Create chart data variable
  let chartData = [trace1];

  // Add a title
  let layout = {
    title: "Top Ten OTUs"
  };

  // Create chart
  Plotly.newPlot("bar", chartData, layout);
// Close the .then function
});