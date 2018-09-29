"use strict";

import { expect } from 'chai';
import { SimilarityScoring } from '../index';

describe('similarity scoring', () => {

  var similarityScoring = new SimilarityScoring(process.env.API_KEY);

  const options = JSON.stringify({ "numSimilarVectors": 2 });

  describe('texts', () => {

    it('should detect similarity scores', (done) => {

      similarityScoring.similarityScoring(null, JSON.stringify(data), options).then(body => {

        expect(body).to.have.property('id');
        expect(body).to.have.property('predictions');
        expect(body).to.have.property('processedTime');
        expect(body).to.have.property('status').to.be.equal('DONE');

        expect(body.predictions).to.be.an('array').have.lengthOf(3).is.eql(predictions);

      }).then(done, done);
    });

  });


  describe('files', () => {

    it('should detect similarity scores', (done) => {

      similarityScoring.similarityScoring("./testdata/vector.zip", null, options).then(body => {

        expect(body).to.have.property('id');
        expect(body).to.have.property('predictions');
        expect(body).to.have.property('processedTime');
        expect(body).to.have.property('status').to.be.equal('DONE');

        expect(body.predictions).to.be.an('array').have.lengthOf(3).is.eql(predictions);

      }).then(done, done);
    });

  });



  describe('similarity scoring with different options', () => {

    var similarityScoring = new SimilarityScoring(process.env.API_KEY);


    describe('texts', () => {

      it('should detect similarity scores for 1 similar vector', (done) => {

        const options = JSON.stringify({ "numSimilarVectors": 1 });

        similarityScoring.similarityScoring(null, JSON.stringify(data), options).then(body => {

          expect(body).to.have.property('id');
          expect(body).to.have.property('predictions');
          expect(body).to.have.property('processedTime');
          expect(body).to.have.property('status').to.be.equal('DONE');

          expect(body.predictions).to.be.an('array').have.lengthOf(3);

          for (var i = 0; i < 3; i++) {
            expect(body.predictions[i].similarVectors[0].score).to.be.equal(predictions[i].similarVectors[0].score);
          }

        }).then(done, done);
      });

    });

  });


  describe('error coverage', () => {

    it('should return a file not found error', (done) => {
      similarityScoring.similarityScoring("file_does_not_exist", null, "").then(
        body => { },
        err => {
          expect(err).to.have.property('errno').to.be.equal(-2);
          expect(err).to.have.property('code').to.be.equal('ENOENT');
        }).then(done, done);
    })

    var similarityScoring = new SimilarityScoring(
      process.env.API_KEY,
      'http://localhost:11111');

    it('should return connection refused error', (done) => {
      similarityScoring.similarityScoring("./testdata/product_text.zip", null, "").then(
        body => { },
        err => {
          expect(err).to.have.property('errno').to.be.equal('ECONNREFUSED');
          expect(err).to.have.property('code').to.be.equal('ECONNREFUSED');
        }).then(done, done);
    });

  });


  var data =
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


  var predictions = [
    {
      "id": "vector_0",
      "similarVectors": [
        {
          "id": "vector_2",
          "score": 0.849864721937753
        },
        {
          "id": "vector_1",
          "score": 0.8440617019517521
        }
      ]
    },
    {
      "id": "vector_1",
      "similarVectors": [
        {
          "id": "vector_2",
          "score": 0.853805753175138
        },
        {
          "id": "vector_0",
          "score": 0.8440617019517521
        }
      ]
    },
    {
      "id": "vector_2",
      "similarVectors": [
        {
          "id": "vector_1",
          "score": 0.853805753175138
        },
        {
          "id": "vector_0",
          "score": 0.849864721937753
        }
      ]
    }
  ];

});
