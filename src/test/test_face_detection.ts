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
        expect(body.predictions[0]).to.have.property('faces');
        expect(body.predictions[0].faces).to.be.an('array').have.lengthOf(4);

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

        for(var i=0; i < expected_results.length; i++) {
            expect(body.predictions[0].faces[i].bottom).to.be.equal(expected_results[i].bottom);
            expect(body.predictions[0].faces[i].left).to.be.equal(expected_results[i].left);
            expect(body.predictions[0].faces[i].right).to.be.equal(expected_results[i].right);
            expect(body.predictions[0].faces[i].top).to.be.equal(expected_results[i].top);
        }
      }).then(done, done);
    });
  });

});
