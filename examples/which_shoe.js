const leonardo = require('sap-leonardo');
const gm = require('gm').subClass({ imageMagick: true }); // npm install gm

const IMG_PATH = './testdata/';
const IMG_SHOE1 = 'chucks-153310_640.png';
const IMG_SHOE2 = 'hiking-shoes-3074971_640.png';
const IMG_SHOE_TEST = 'converse-2069209_640.jpg';

// set the API_KEY in the console, e.g. export API_KEY=abc123
var imageFeatureExtraction = new leonardo.ImageFeatureExtraction(process.env.API_KEY);

imageFeatureExtraction.featureExtraction(IMG_PATH + IMG_SHOE1)
  .then(body => {
    var vector1 = body.predictions[0].featureVectors;

    var imageFeatureExtraction = new leonardo.ImageFeatureExtraction(process.env.API_KEY);
    imageFeatureExtraction.featureExtraction(IMG_PATH + IMG_SHOE2)
      .then(body => {
        var vector2 = body.predictions[0].featureVectors;

        var multiInstanceImageSegmentation = new leonardo.MultiInstanceImageSegmentation(process.env.API_KEY);
        multiInstanceImageSegmentation.instanceSegmentor(IMG_PATH + IMG_SHOE_TEST)
          .then(body => {

            var bbox = body.predictions[0].results[0].bbox;
            var width = bbox.x2 - bbox.x1, height = bbox.y2 - bbox.y1;

            gm(IMG_PATH + IMG_SHOE_TEST)
              .crop(width, height, bbox.x1, bbox.y1)
              .write('croped.jpg', function (err) {
                if (err) {
                  throw "something went wrong", err
                }

                var imageFeatureExtraction = new leonardo.ImageFeatureExtraction(process.env.API_KEY);
                imageFeatureExtraction.featureExtraction("croped.jpg")
                  .then(body => {

                    var vv = body.predictions[0].featureVectors;

                    var data =
                    {
                      "0": [
                        {
                          "id": "which_shoe",
                          "vector": vv
                        },
                        {
                          "id": "shoe_1",
                          "vector": vector1
                        },
                        {
                          "id": "shoe_2",
                          "vector": vector2
                        }
                      ]
                    }
                    const options = JSON.stringify({ "numSimilarVectors": 2 });

                    var similarityScoring = new leonardo.SimilarityScoring(process.env.API_KEY);
                    similarityScoring.similarityScoring(null, JSON.stringify(data), options)
                      .then(body => {

                        var firstPrediction = body.predictions[0];
                        var firstSimilarVector = firstPrediction.similarVectors[0];
                        var secondSimilarVector = firstPrediction.similarVectors[1];
                        
                        console.log("RESULT:", firstPrediction.id + ':',
                          firstSimilarVector.id + '=' + firstSimilarVector.score,
                          secondSimilarVector.id + '=' + secondSimilarVector.score);
                        // RESULT: which_shoe: shoe_1=0.7352935851635458 shoe_2=0.7072068060448491
                      })
                  })
              })
          })
      })
  })
  .catch(err => { console.error(err) });
