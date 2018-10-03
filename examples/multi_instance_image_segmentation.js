const leonardo = require('sap-leonardo');

// set the API_KEY in the console, e.g. export API_KEY=abc123
var multiInstanceImageSegmentation = new leonardo.MultiInstanceImageSegmentation(process.env.API_KEY);

multiInstanceImageSegmentation.instanceSegmentor("testdata/juice-1271881_640.jpg")
  .then(body => {
    //console.log(JSON.stringify(body, null, "  "));
    console.log("RESULT:", body.predictions[0].results.length, 'segmentations');
    // RESULT: 4 segmentations
  })
  .catch(err => { console.error(err) });
