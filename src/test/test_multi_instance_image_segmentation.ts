"use strict";

import { expect } from 'chai';
//import * as fs from 'fs';
import { MultiInstanceImageSegmentation } from "../index";

var fileName = "juice-1271881_640.jpg";

describe('mwulti-instance image segmentation', () => {

  var multiInstanceImageSegmentation = new MultiInstanceImageSegmentation(process.env.API_KEY);

  describe('four items', () => {
    it('should predict three bottles and a can', (done) => {
      multiInstanceImageSegmentation.instanceSegmentor("./testdata/" + fileName).then(body => {

        expect(body).to.have.property('id');
        expect(body).to.have.property('predictions').is.an('array').with.length(1);
        expect(body).to.have.property('processedTime');
        expect(body).to.have.property('status').to.be.equal('DONE');

        expect(body.predictions[0]).to.have.property('imageName').which.is.equal(fileName);
        expect(body.predictions[0]).to.have.property('results').is.an('array').with.length(4);

        // for (var i = 0; i < body.predictions[0].results.length; i++) {
        //   body.predictions[0].results[i].mask = "...";
        // }
        // console.log(JSON.stringify(body, null, ' '));

        var expected_results = [
          {
            "bbox": {
              "x1": 366,
              "x2": 577,
              "y1": 143,
              "y2": 575
            },
            "classId": 5,
            "className": "Glass Bottle",
            "mask": "...",
            "score": 1
          },
          {
            "bbox": {
              "x1": 49,
              "x2": 266,
              "y1": 321,
              "y2": 579
            },
            "classId": 1,
            "className": "Can",
            "mask": "...",
            "score": 1
          },
          {
            "bbox": {
              "x1": 244,
              "x2": 356,
              "y1": 92,
              "y2": 489
            },
            "classId": 4,
            "className": "Pet Bottle",
            "mask": "...",
            "score": 0.98
          },
          {
            "bbox": {
              "x1": 289,
              "x2": 421,
              "y1": 149,
              "y2": 536
            },
            "classId": 5,
            "className": "Glass Bottle",
            "mask": "...",
            "score": 0.94
          }
        ];

        for (var i = 0; i < expected_results.length; i++) {
          expect(body.predictions[0].results[i].bbox).to.be.eql(expected_results[i].bbox);
          expect(body.predictions[0].results[i].classId).to.be.equal(expected_results[i].classId);
          expect(body.predictions[0].results[i].className).to.be.equal(expected_results[i].className);
          expect(body.predictions[0].results[i].score).to.be.equal(expected_results[i].score);
        }
      }).then(done, done);
    });
  });

  describe('mwulti-instance image oegmentation image:jpg', () => {

    var multiInstanceImageSegmentation = new MultiInstanceImageSegmentation(process.env.API_KEY);

    describe('three items', () => {
      it('should predict three items', (done) => {
        multiInstanceImageSegmentation.instanceSegmentor("./testdata/" + fileName, "jpg").then(body => {

          expect(body).to.have.property('id');
          expect(body).to.have.property('predictions').is.an('array').with.length(1);
          expect(body).to.have.property('processedTime');
          expect(body).to.have.property('status').to.be.equal('DONE');

          expect(body.predictions[0]).to.have.property('imageName').is.equal(fileName);

          //fs.writeFileSync("MultiInstanceImageSegmentation.jpg", new Buffer(body.predictions[0].imageString, 'base64'));

        }).then(done, done);
      });
    });

  });

});
