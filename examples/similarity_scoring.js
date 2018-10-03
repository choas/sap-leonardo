const leonardo = require('sap-leonardo');

// set the API_KEY in the console, e.g. export API_KEY=abc123

var similarityScoring = new leonardo.SimilarityScoring(process.env.API_KEY);

const data =
{
  "0": [
    {
      "id": "vector_0",
      "vector": [0.28340766699907016, 0.9207926435655764, 0.26789935106091334, 0.318534020870441, 0.8788578877488213, 0.4509478663720774, 0.3771976033350821, 0.8324932893262449, 0.3125285189224729, 0.0012454795540639552]
    },
    {
      "id": "vector_1",
      "vector": [0.45833237104751445, 0.32694129428557406, 0.8764997717518421, 0.15381826488593253, 0.995488727839039, 0.5471706751917085, 0.702883336443525, 0.623838711091733, 0.12306071043362388, 0.004332364690005086]
    },
    {
      "id": "vector_2",
      "vector": [0.3556300142239819, 0.5045324288959441, 0.7577918039699381, 0.8632635582322563, 0.633311116403191, 0.2435334301982892, 0.6287482927751646, 0.7181573415502425, 0.5023501732127003, 0.18362374274429505]
    }
  ]
}

const options = JSON.stringify({ "numSimilarVectors": 2 });

similarityScoring.similarityScoring(null, JSON.stringify(data), options)
.then(body => {
  console.log(JSON.stringify(body, null, "  "));

  var firstPrediction = body.predictions[0];
  var firstSimilarVector = firstPrediction.similarVectors[0];
  console.log("RESULT:", firstPrediction.id, firstSimilarVector.id, firstSimilarVector.score);
  // RESULT: RESULT: vector_0 vector_2 0.849864721937753
})
.catch(err => { console.error(err) });
