"use strict";

import { expect } from "chai";
import { getLogger } from "log4js";
import { SceneTextRecognition } from "../src/index";

const logger = getLogger();
logger.level = "off";

describe("SceneTextRecognition", () => {

  const sceneTextRecognition = new SceneTextRecognition(process.env.API_KEY);

  describe("scene text", () => {
    it("should return a text", (done) => {
      sceneTextRecognition.sceneTextRecognition("./testdata/stop-634941_640.jpg").then((body) => {
        logger.debug("body", JSON.stringify(body, null, "  "));

        expect(body).to.have.property("id");
        expect(body).to.have.property("predictions");
        expect(body).to.have.property("processedTime");
        expect(body).to.have.property("status").to.be.equal("DONE");

        expect(body.predictions).to.be.an("array").have.lengthOf(1);
        expect(body.predictions[0]).to.have.property("results").to.be.an("array").with.lengthOf(1);

        expect(body.predictions[0].results[0]).to.be.eql(expectedResults[0]);
      }).then(done, done);
    });
  });

  describe("error coverage", () => {

    it("should return a file not found error", (done) => {
      sceneTextRecognition.sceneTextRecognition("file_does_not_exist").then(
        () => { expect.fail(); },
        (err) => {
          logger.debug("err", JSON.stringify(err, null, "  "));

          expect(err).to.have.property("errno").to.be.equal(-2);
          expect(err).to.have.property("code").to.be.equal("ENOENT");
        }).then(done, done);
    });

    it("should return url not found error", (done) => {
      const sceneTextRecognitionErr = new SceneTextRecognition(
        process.env.API_KEY,
        "http://wrong.url");
      sceneTextRecognitionErr.sceneTextRecognition("./testdata/stop-634941_640.jpg").then(
        () => { expect.fail(); },
        (err) => {
          logger.debug("err", JSON.stringify(err, null, "  "));

          expect(err).to.have.property("errno");
          expect(err).to.have.property("code");
        }).then(done, done);
    });

  });

  // tslint:disable:object-literal-key-quotes
  // tslint:disable:max-line-length
  // tslint:disable:trailing-comma

  const expectedResults = [
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
  ];

});
