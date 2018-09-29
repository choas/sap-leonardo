"use strict";

import { expect } from 'chai';
import { SceneTextRecognition } from "../index";

describe('SceneTextRecognition', () => {

  var sceneTextRecognition = new SceneTextRecognition(process.env.API_KEY);

  describe('scene text', () => {
    it('should return a text', (done) => {
      sceneTextRecognition.sceneTextRecognition("./testdata/stop-634941_640.jpg").then(body => {

        console.log(JSON.stringify(body, null, " "));

        expect(body).to.have.property('id');
        expect(body).to.have.property('predictions');
        expect(body).to.have.property('processedTime');
        expect(body).to.have.property('status').to.be.equal('DONE');

        expect(body.predictions).to.be.an('array').have.lengthOf(1);
        expect(body.predictions[0]).to.have.property('results').to.be.an('array').with.lengthOf(1);

        var results = [
          {
            "bboxAccuracy": 0.955111026763916,
            "boundingBox": {
              "x1": 395,
              "x2": 525,
              "x3": 525,
              "x4": 395,
              "y1": 139,
              "y2": 139,
              "y3": 197,
              "y4": 197
            },
            "text": "stoP"
          }
        ]

        expect(body.predictions[0].results[0]).to.be.eql(results[0]);
      }).then(done, done);
    });
  });

  describe('error coverage', () => {

    it('should return a file not found error', (done) => {
      sceneTextRecognition.sceneTextRecognition("file_does_not_exist").then(
        body => { },
        err => {
          expect(err).to.have.property('errno').to.be.equal(-2);
          expect(err).to.have.property('code').to.be.equal('ENOENT');
        }).then(done, done);
    })

    it('should return connection refused error', (done) => {
      var sceneTextRecognition = new SceneTextRecognition(
        process.env.API_KEY,
        'http://localhost:11111');
        sceneTextRecognition.sceneTextRecognition("./testdata/stop-634941_640.jpg").then(
        body => { },
        err => {
          expect(err).to.have.property('errno').to.be.equal('ECONNREFUSED');
          expect(err).to.have.property('code').to.be.equal('ECONNREFUSED');
        }).then(done, done);
    });


  });

});
