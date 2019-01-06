"use strict";

import { expect } from "chai";
// import * as fs from "fs";
import { MultiInstanceImageSegmentation } from "../src/index";

const fileName = "juice-1271881_640.jpg";
const timeout = 10000;

describe("multi-instance image segmentation", () => {

  const multiInstanceImageSegmentation = new MultiInstanceImageSegmentation(process.env.API_KEY);

  describe("four items", () => {
    it("should predict three bottles and a can", (done) => {
      multiInstanceImageSegmentation.instanceSegmentor("./testdata/" + fileName).then((body) => {

        expect(body).to.have.property("id");
        expect(body).to.have.property("predictions").which.is.an("array").with.length(1);
        expect(body).to.have.property("processedTime");
        expect(body).to.have.property("status").to.be.equal("DONE");

        expect(body.predictions[0]).to.have.property("imageName").which.is.equal(fileName);
        expect(body.predictions[0]).to.have.property("results").is.an("array").with.length(4);

        for (let i = 0; i < expectedResults.length; i++) {
          expect(body.predictions[0].results[i].bbox).to.be.eql(expectedResults[i].bbox);
          expect(body.predictions[0].results[i].classId).to.be.equal(expectedResults[i].classId);
          expect(body.predictions[0].results[i].className).to.be.equal(expectedResults[i].className);
          expect(body.predictions[0].results[i].score).to.be.equal(expectedResults[i].score);

          // encoded mask data should have the size of bbox width * height
          const encodedMaskData = Buffer.from(body.predictions[0].results[i].mask, "base64");
          const bbox = body.predictions[0].results[i].bbox;
          const bboxWidth = Math.abs(bbox.x2 - bbox.x1);
          const bboxHeight = Math.abs(bbox.y2 - bbox.y1);
          expect(encodedMaskData.length).to.be.equal(bboxWidth * bboxHeight);
        }
      }).then(done, done);
    }).timeout(timeout);
  });

  describe("multi-instance image segmentation image:jpg", () => {

    const multiInstanceImageSegmentationImage = new MultiInstanceImageSegmentation(process.env.API_KEY);

    describe("return image", () => {
      it("should return a png image", (done) => {
        multiInstanceImageSegmentationImage.instanceSegmentor("./testdata/" + fileName, true).then((body) => {

          expect(body).to.have.property("id");
          expect(body).to.have.property("predictions").is.an("array").with.length(1);
          expect(body).to.have.property("processedTime");
          expect(body).to.have.property("status").to.be.equal("DONE");

          expect(body.predictions[0]).to.have.property("imageName").is.equal(fileName);

          // fs.writeFileSync(
          //   "MultiInstanceImageSegmentation.png",
          //   Buffer.from(body.predictions[0].imageString, "base64"));

          const encodedImageData = Buffer.from(body.predictions[0].imageString, "base64");

          const isJPG =
            encodedImageData[0] === 0xFF &&
            encodedImageData[1] === 0xD8 &&
            encodedImageData[2] === 0xFF;

          const isPNG =
            encodedImageData[0] === 0x89 &&
            encodedImageData[1] === 0x50 &&
            encodedImageData[2] === 0x4E &&
            encodedImageData[3] === 0x47 &&
            encodedImageData[4] === 0x0D &&
            encodedImageData[5] === 0x0A &&
            encodedImageData[6] === 0x1A &&
            encodedImageData[7] === 0x0A;

          // tslint:disable-next-line:no-unused-expression
          expect(isJPG).is.false;
          // tslint:disable-next-line:no-unused-expression
          expect(isPNG).is.true;

        }).then(done, done);
      }).timeout(timeout);
    });

  });

  describe("error coverage", () => {

    it("should return a file not found error", (done) => {
      multiInstanceImageSegmentation.instanceSegmentor("file_does_not_exist").then(
        () => { expect.fail(); },
        (err) => {
          expect(err).to.have.property("errno").to.be.equal(-2);
          expect(err).to.have.property("code").to.be.equal("ENOENT");
        }).then(done, done);
    });

    it("should return connection refused error", (done) => {
      const multiInstanceImageSegmentationErr = new MultiInstanceImageSegmentation(
        process.env.API_KEY,
        "http://localhost:11111");
      multiInstanceImageSegmentationErr.instanceSegmentor("./testdata/" + fileName).then(
        () => { expect.fail(); },
        (err) => {
          expect(err).to.have.property("errno").to.be.equal("ECONNREFUSED");
          expect(err).to.have.property("code").to.be.equal("ECONNREFUSED");
        }).then(done, done);
    });

  });

  // tslint:disable:object-literal-key-quotes
  // tslint:disable:max-line-length
  // tslint:disable:trailing-comma
  const expectedResults = [
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
});
