"use strict";

const leonardo = require("sap-leonardo");

// set the API_KEY in the console, e.g. export API_KEY=abc123
const faceFeatureExtraction = new leonardo.FaceFeatureExtraction(process.env.API_KEY);
const similarityScoring = new leonardo.SimilarityScoring(process.env.API_KEY);
faceFeatureExtraction.faceFeatureExtraction("./testdata/man-3365368_640.jpg")
  .then((body) => body.predictions[0].faces)
  .then((faces) => {
    const options = JSON.stringify({ numSimilarVectors: 2 });
    const data =
    {
      "0": []
    };
    var index = 1;
    faces.forEach((face) => {
      data["0"].push({ id: "face_" + index, vector: face.face_feature });
      index += 1;
    });
    similarityScoring.similarityScoring(null, JSON.stringify(data), options)
      .then((body) => {
        let res = "/ ";
        body.predictions.forEach((prediction) => {
          const firstFaceId = prediction.id;
          const secondFaceId = prediction.similarVectors[0].id;
          const score = Math.floor(prediction.similarVectors[0].score * 100);
          res += firstFaceId + " ~ " + secondFaceId + " (" + score + "%) / ";
        });
        console.log("result:", res);
        // result: / face_1 ~ face_4 (91%) / face_2 ~ face_3 (89%) / face_3 ~ face_2 (89%) / face_4 ~ face_1 (91%) /
      });
  })
  .catch((err) => { console.error(err); });
