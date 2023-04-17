// Read samples.json from URL
const samplesURL = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

d3.json(samplesURL).then(function(data) {
  // Create function for initial view
  function init() {
    // Initial sample
    let sample = "940";

    // Create a filter function
    function filterByID(data) {
      return data.id === sample;
    };
    
    // Apply filter to get sample data
    let sampleData = data.samples.filter(filterByID)[0];

    // Create horizontal bar chart with top ten OTUs of sample
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
    let barTrace = {
      x: topTenValues,
      y: topTenIDs.map(function(id) {
        return "OTU " + id;
      }),
      text: topTenLabels,
      type: "bar",
      orientation: "h"
    };
    // Create chart data variable
    let barData = [barTrace];
    // Add a title
    let barLayout = {
      title: "Top Ten OTUs"
    };
    // Create chart
    Plotly.newPlot("bar", barData, barLayout);

    // Create bubble chart
    let bubbleTrace = {
      x: sampleData.otu_ids,
      y: sampleData.sample_values,
      mode: "markers",
      marker: {
        size: sampleData.sample_values,
        color: sampleData.otu_ids
      },
      text: sampleData.otu_labels,
    };
    let bubbleData = [bubbleTrace];
    let bubbleLayout = {
      title: "Bubble Chart"
    };
    // Create Bubble Chart
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    // Populate demographic information
    // Create a filter function with parseInt()
    function filterInteger(data) {
      return data.id === parseInt(sample);
    };
    // Apply filter to get sample data for demographic
    let demoData = data.metadata.filter(filterInteger)[0];
    // Select demographic section using d3
    let demoSection = d3.select("#sample-metadata");
    Object.entries(demoData).forEach(([key, value]) => demoSection.append("li").text(`${key}: ${value}`));
  };

  // Run init function
  init();
  
  // Populate dropdown menu
  // Assign dropdown element to variable
  let dropdown = d3.select("#selDataset");

  // Add each case's ID to the dropdown menu
  data.names.forEach(name => dropdown.append("option").text(name).property("value", name));
  
  // Add event listener for drop down menu change
  dropdown.on("change", function() {
    // Assign displayed dropdown value to variable
    let sample = dropdown.property("value");
    
    // Create a filter function
    function filterByID(data) {
      return data.id === sample;
    };
    
    // Reassign sampleData to chosen ID
    let sampleData = data.samples.filter(filterByID)[0];

    // Update the data variables
    let topTenIDs = sampleData.otu_ids.slice(0,10).reverse();
    let topTenLabels = sampleData.otu_labels.slice(0,10).reverse();
    let topTenValues = sampleData.sample_values.slice(0,10).reverse();

    // Restyle horizontal bar chart with new data
    Plotly.restyle("bar", "x", [topTenValues]);
    Plotly.restyle("bar", "y", [topTenIDs.map(function(id) {
          return "OTU " + id;
        }),]);
    Plotly.restyle("bar", "text", [topTenLabels]);

    // Update demographic information
  });

    // Populate demographic information
    // // Create a filter function with parseInt()
    // function filterInteger(data) {
    //   return data.id === parseInt(sample);
    // };
    // // Apply filter to get sample data for demographic
    // let demoData = data.metadata.filter(filterInteger)[0];
    // // Select demographic section using d3
    // let demoSection = d3.select("#sample-metadata");
    // Object.entries(demoData).forEach(([key, value]) => demoSection.append("li").text(`${key}: ${value}`));

// Close the .then function
});