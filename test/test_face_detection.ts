"use strict";

import { expect } from "chai";
import { getLogger } from "log4js";
import { FaceDetection } from "../src/index";

const logger = getLogger();
logger.level = "off";

describe("face detection", () => {

  const faceDetection = new FaceDetection(process.env.API_KEY);

  describe("four faces", () => {
    it("should predict four faces", (done) => {
      faceDetection.faceDetection("./testdata/man-3365368_640.jpg").then((body) => {
        logger.debug("four faces", JSON.stringify(body, null, "  "));

        expect(body).to.have.property("id");
        expect(body).to.have.property("predictions");
        expect(body).to.have.property("processedTime");
        expect(body).to.have.property("status").to.be.equal("DONE");

        expect(body.predictions).to.be.an("array").have.lengthOf(1);
        expect(body.predictions[0]).to.have.property("faces").to.be.an("array").have.lengthOf(4);
        expect(body.predictions[0]).to.have.property("numberOfFaces").to.be.equal(4);

        for (let i = 0; i < expectedResults.length; i++) {
          expect(body.predictions[0].faces[i].bottom).to.be.equal(expectedResults[i].bottom);
          expect(body.predictions[0].faces[i].left).to.be.equal(expectedResults[i].left);
          expect(body.predictions[0].faces[i].right).to.be.equal(expectedResults[i].right);
          expect(body.predictions[0].faces[i].top).to.be.equal(expectedResults[i].top);
        }
      }).then(done, done);
    });
  });

  describe("error coverage", () => {

    it("should return a file not found error", (done) => {
      faceDetection.faceDetection("file_does_not_exist").then(
        () => { expect.fail(); },
        (err) => {
          expect(err).to.have.property("errno").to.be.equal(-2);
          expect(err).to.have.property("code").to.be.equal("ENOENT");
        }).then(done, done);
    });

    it("should return url not found error", (done) => {
      const faceDetectionErr = new FaceDetection(
        process.env.API_KEY,
        "http://wrong.url");
      faceDetectionErr.faceDetection("./testdata/man-3365368_640.jpg").then(
        () => { expect.fail(); },
        (err) => {
          expect(err).to.have.property("errno").to.be.equal("ENOTFOUND");
          expect(err).to.have.property("code").to.be.equal("ENOTFOUND");
        }).then(done, done);
    });

  });

  // tslint:disable:object-literal-key-quotes
  // tslint:disable:max-line-length
  // tslint:disable:trailing-comma
  const expectedResults = [
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
});
