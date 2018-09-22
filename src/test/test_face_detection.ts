"use strict";

import { expect } from 'chai';
import { FaceDetection } from "../index";

describe('face detection', () => {

  var faceDetection = new FaceDetection(process.env.API_KEY);

  describe('four people', () => {
    it('should predict four faces', (done) => {
      faceDetection.faceDetection("./testdata/man-3365368_640.jpg").then(body => {

        expect(body).to.have.property('id');
        expect(body).to.have.property('predictions');
        expect(body).to.have.property('processedTime');
        expect(body).to.have.property('status').to.be.equal('DONE');

        expect(body.predictions).to.be.an('array').have.lengthOf(1);
        expect(body.predictions[0]).to.have.property('faces').to.be.an('array').have.lengthOf(4);
        expect(body.predictions[0]).to.have.property('numberOfFaces').to.be.equal(4);

        let expected_results = [
          {
            "bottom": 260,
            "left": 73,
            "right": 135,
            "top": 198
          },
          {
            "bottom": 301,
            "left": 377,
            "right": 439,
            "top": 239
          },
          {
            "bottom": 287,
            "left": 245,
            "right": 320,
            "top": 213
          },
          {
            "bottom": 322,
            "left": 522,
            "right": 584,
            "top": 260
          }
        ];

        for (var i = 0; i < expected_results.length; i++) {
          expect(body.predictions[0].faces[i].bottom).to.be.equal(expected_results[i].bottom);
          expect(body.predictions[0].faces[i].left).to.be.equal(expected_results[i].left);
          expect(body.predictions[0].faces[i].right).to.be.equal(expected_results[i].right);
          expect(body.predictions[0].faces[i].top).to.be.equal(expected_results[i].top);
        }
      }).then(done, done);
    });
  });

  describe('error coverage', () => {

    it('should return a file not found error', (done) => {
      faceDetection.faceDetection("file_does_not_exist").then(
        body => { },
        err => {
          expect(err).to.have.property('errno').to.be.equal(-2);
          expect(err).to.have.property('code').to.be.equal('ENOENT');
        }).then(done, done);
    })

    it('should return connection refused error', (done) => {
      var faceDetection = new FaceDetection(
        process.env.API_KEY,
        'http://localhost:11111');
      faceDetection.faceDetection("./testdata/man-3365368_640.jpg").then(
        body => { },
        err => {
          expect(err).to.have.property('errno').to.be.equal('ECONNREFUSED');
          expect(err).to.have.property('code').to.be.equal('ECONNREFUSED');
        }).then(done, done);
    });

  });


});
