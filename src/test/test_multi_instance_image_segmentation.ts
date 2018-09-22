"use strict";

import { expect } from 'chai';
//import * as fs from 'fs';
import { MultiInstanceImageSegmentation } from "../index";

var fileName = "juice-1271881_640.jpg";

describe('multi-instance image segmentation', () => {

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

          // encoded mask data should have the size of bbox width * height
          var encodedMaskData = Buffer.from(body.predictions[0].results[i].mask, 'base64');
          var bbox = body.predictions[0].results[i].bbox;
          var bboxWidth = Math.abs(bbox.x2 - bbox.x1);
          var bboxHeight = Math.abs(bbox.y2 - bbox.y1);
          expect(encodedMaskData.length).to.be.equal(bboxWidth * bboxHeight);
        }
      }).then(done, done);
    });
  });

  describe('multi-instance image segmentation image:jpg', () => {

    var multiInstanceImageSegmentation = new MultiInstanceImageSegmentation(process.env.API_KEY);

    describe('return image', () => {
      it('should return a png image', (done) => {
        multiInstanceImageSegmentation.instanceSegmentor("./testdata/" + fileName, true).then(body => {

          expect(body).to.have.property('id');
          expect(body).to.have.property('predictions').is.an('array').with.length(1);
          expect(body).to.have.property('processedTime');
          expect(body).to.have.property('status').to.be.equal('DONE');

          expect(body.predictions[0]).to.have.property('imageName').is.equal(fileName);

          //fs.writeFileSync("MultiInstanceImageSegmentation.png", Buffer.from(body.predictions[0].imageString, 'base64'));

          var encodedImageData = Buffer.from(body.predictions[0].imageString, 'base64');

          var isJPG =
            encodedImageData[0] === 0xFF &&
            encodedImageData[1] === 0xD8 &&
            encodedImageData[2] === 0xFF;

          var isPNG =
            encodedImageData[0] === 0x89 &&
            encodedImageData[1] === 0x50 &&
            encodedImageData[2] === 0x4E &&
            encodedImageData[3] === 0x47 &&
            encodedImageData[4] === 0x0D &&
            encodedImageData[5] === 0x0A &&
            encodedImageData[6] === 0x1A &&
            encodedImageData[7] === 0x0A;

          expect(isJPG).is.false;
          expect(isPNG).is.true;

        }).then(done, done);
      });
    });

  });

});
