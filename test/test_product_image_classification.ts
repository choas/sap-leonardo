"use strict";

import { expect } from "chai";
import { getLogger } from "log4js";
import { ProductImageClassification } from "../src/index";

const logger = getLogger();
logger.level = "off";

describe("product image classification", () => {

  const productimageclassification = new ProductImageClassification(process.env.API_KEY);

  describe("keyboard", () => {
    it("should predict a USB flash drive", (done) => {
      productimageclassification.inferenceSync("./testdata/data-transfer-3199547_640.jpg")
        .then((body) => {
          logger.debug("usb", JSON.stringify(body, null, "  "));
          expect(body).to.have.property("_id");
          expect(body).to.have.property("predictions");
          expect(body).to.have.property("processed_time");
          expect(body).to.have.property("status").to.be.equal("DONE");

          expect(body.predictions).to.be.an("array").have.lengthOf(1);
          expect(body.predictions[0]).to.have.property("results");
          expect(body.predictions[0].results).to.be.an("array").have.lengthOf(5).to.be.eql(expectedResults);
        },
        (err) => { expect.fail(err); }).then(done, done);
    });
  });

  describe("some product image classification errors", () => {
    it("should throw an error for wrong file type (text)", (done) => {
      productimageclassification.inferenceSync("./LICENSE").then((body) => {
        logger.debug("wrong file type", JSON.stringify(body, null, "  "));
        expect(body).to.have.property("error").to.be.equal("Error when uploading files:");
        expect(body).to.have.property("status_code").to.be.equal(400);
        expect(body).to.have.property("error_description").to.be.equal("Invalid file type");
      },
      (err) => { expect.fail(err); }).then(done, done);
    });

    it("should throw an error for zip with hierarchy", (done) => {
      productimageclassification.inferenceSync("./testdata/Archive.zip").then((body) => {
        logger.debug("zip with hierarchy", JSON.stringify(body, null, "  "));
        expect(body).to.have.property("error").to.be.equal("Invalid Archive Input");
        expect(body).to.have.property("status_code").to.be.equal(400);
        // tslint:disable-next-line:max-line-length
        expect(body).to.have.property("error_description").to.be.equal("Only archive without hierarchy is accepted. __MACOSX/ is a folder. ");
      },
      (err) => { expect.fail(err); }).then(done, done);
    });

    it("should throw an error for wrong API key", (done) => {
      const productimageclassificationWithWrongApiKey = new ProductImageClassification("WRONG");
      productimageclassificationWithWrongApiKey.inferenceSync("./testdata/data-transfer-3199547_640.jpg")
        .then((body) => {
          logger.debug("wrong API key", JSON.stringify(body, null, "  "));
          expect(body).to.have.property("fault");
          expect(body.fault).to.have.property("faultstring");
          expect(body.fault.faultstring).to.be.equal("Invalid ApiKey");
        }).then(done, done);
    });

  });

  describe("error coverage", () => {

    it("should return a file not found error", (done) => {
      productimageclassification.inferenceSync("file_does_not_exist").then(
        () => { expect.fail(); },
        (err) => {
          expect(err).to.have.property("errno").to.be.equal(-2);
          expect(err).to.have.property("code").to.be.equal("ENOENT");
        }).then(done, done);
    });

    it("should return url not found error", (done) => {
      const productimageclassificationErr = new ProductImageClassification(
        process.env.API_KEY,
        "http://wrong.url");
      productimageclassificationErr.inferenceSync("./testdata/data-transfer-3199547_640.jpg")
        .then(
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
      "label": "USB flash drives & accessories",
      "score": 0.919727
    },
    {
      "label": "networking cards",
      "score": 0.0296
    },
    {
      "label": "smartphones",
      "score": 0.016453
    },
    {
      "label": "digital cameras",
      "score": 0.009214
    },
    {
      "label": "power adapters",
      "score": 0.00612
    }
  ];

});
