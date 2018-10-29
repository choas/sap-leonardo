"use strict";

const leonardo = require("sap-leonardo");

// set the API_KEY in the console, e.g. export API_KEY=abc123
var productTextClassification = new leonardo.ProductTextClassification(process.env.API_KEY);
// note: this is an adjusted description for a Smart TV
const productText = "Get the clarity of 4K UHD in an old-fashioned smart TV design that's mind controllable. Ultra HD makes everything smooth and sharp. Magic power gives you instant access to your favourite content and the movie night is just a smile away.";
productTextClassification.inferenceSync(null, productText)
  .then((body) => {
    var firstResult = body.predictions[0].results[0];
    console.log("result:", firstResult.category, firstResult.confidence);
    // result: LED TVs 0.913253
  })
  .catch((err) => { console.error(err); });
