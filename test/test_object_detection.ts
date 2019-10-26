"use strict";

import { expect } from "chai";
// import * as fs from "fs";
import { getLogger } from "log4js";
import { ObjectDetection } from "../src/index";

const logger = getLogger("object detection");
logger.level = "off";

const fileName = "juice-1271881_640.jpg";

describe("object detection", () => {

  const objectDetection = new ObjectDetection(process.env.API_KEY);

  describe("juice", () => {
    it("should predict something, but causes an internal error", (done) => {
      objectDetection.objectDetection("./testdata/" + fileName).then((body) => {
        logger.debug("something:", JSON.stringify(body, null, "  "));
        expect(body).to.have.property("fault");
        expect(body.fault).to.have.property("detail");
        expect(body.fault.detail).to.have.property("errorcode");
        expect(body.fault.detail.errorcode).to.be.equal("messaging.runtime.RouteFailed");
      }).then(done, done);
    }).timeout(60000);

    it("should return an image, but causes an internal error", (done) => {
      objectDetection.objectDetection("./testdata/" + fileName, true).then((body) => {
        logger.debug("image:", JSON.stringify(body, null, "  "));
        expect(body).to.have.property("fault");
        expect(body.fault).to.have.property("detail");
        expect(body.fault.detail).to.have.property("errorcode");
        expect(body.fault.detail.errorcode).to.be.equal("messaging.runtime.RouteFailed");
      }).then(done, done);
    }).timeout(60000);
  });

  describe("error coverage", () => {

    it("should return a file not found error", (done) => {
      objectDetection.objectDetection("file_does_not_exist").then(
        () => { expect.fail(); },
        (err) => {
          expect(err).to.have.property("errno").to.be.equal(-2);
          expect(err).to.have.property("code").to.be.equal("ENOENT");
        }).then(done, done);
    });

    it("should return url not found error", (done) => {
      const objectDetectionErr = new ObjectDetection(
        process.env.API_KEY,
        "http://wrong.url");
      objectDetectionErr.objectDetection("./testdata/" + fileName).then(
        () => { expect.fail(); },
        (err) => {
          expect(err).to.have.property("errno");
          expect(err).to.have.property("code");
        }).then(done, done);
    });

  });
});
