"use strict";

import { expect } from "chai";
import * as fs from "fs";
import { getLogger } from "log4js";
import { Imageclassification } from "../src/index";

const logger = getLogger();
logger.level = "debug";

describe("imageclassification", () => {

  const imageclassification = new Imageclassification(process.env.API_KEY);

  const expectedResults = [
    { label: "tusker", score: 0.7052140235900879 },
    { label: "African elephant, Loxodonta africana", score: 0.14608584344387054 },
    { label: "Indian elephant, Elephas maximus", score: 0.08779430389404297 },
    { label: "toaster", score:0.00027993161347694695 },
    { label: "combination lock", score: 0.0002534812083467841 },
  ];

  describe("elephant", () => {
    it("should predict a tusker and an elephant", (done) => {
      imageclassification.classification("./testdata/elephant-114543_640.jpg").then(
        (body) => {
          logger.debug("elephant", JSON.stringify(body, null, "  "));

          expect(body).to.have.property("id");
          expect(body).to.have.property("predictions");
          expect(body).to.have.property("processedTime");
          expect(body).to.have.property("status").to.be.equal("DONE");

          expect(body.predictions).to.be.an("array").have.lengthOf(1);
          expect(body.predictions[0]).to.have.property("results");
          expect(body.predictions[0].results).to.be.an("array").have.lengthOf(5);

          for (let i = 0; i < expectedResults.length; i++) {
            expect(body.predictions[0].results[i].label).to.be.equal(expectedResults[i].label);
            expect(body.predictions[0].results[i].score).to.be.equal(expectedResults[i].score);
          }
        },
        (err) => { expect.fail(err); }).then(done, done);
    });

    it("should predict a tusker and an elephant (Buffer)", (done) => {

      fs.readFile("./testdata/elephant-114543_640.jpg", {}, (fileErr, fileData) => {
        if (fileErr) {
          expect.fail();
        }

        imageclassification.classification(fileData).then(
          (body) => {
            logger.debug("elephant (Buffer)", JSON.stringify(body, null, "  "));

            expect(body).to.have.property("id");
            expect(body).to.have.property("predictions");
            expect(body).to.have.property("processedTime");
            expect(body).to.have.property("status").to.be.equal("DONE");

            expect(body.predictions).to.be.an("array").have.lengthOf(1);
            expect(body.predictions[0]).to.have.property("results");
            expect(body.predictions[0].results).to.be.an("array").have.lengthOf(5);

            for (let i = 0; i < expectedResults.length; i++) {
              expect(body.predictions[0].results[i].label).to.be.equal(expectedResults[i].label);
              expect(body.predictions[0].results[i].score).to.be.equal(expectedResults[i].score);
            }
          },
          (err) => { expect.fail(err); }).then(done, done);
      });
    });
  });

  describe("some image classification errors", () => {
    it("should throw an error for wrong file type (text)", (done) => {
      imageclassification.classification("./LICENSE").then((body) => {
        logger.debug("wrong file type", JSON.stringify(body, null, "  "));
        expect(body).to.have.property("error");
        expect(body.error).to.have.property("message").to.be.equal("Error when uploading files:: Invalid file type");
        expect(body.error).to.have.property("code").to.be.equal("400");
      }).then(done, done);
    });

    it("should throw an error for zip with hierarchy", (done) => {
      imageclassification.classification("./testdata/Archive.zip").then((body) => {
        expect(body).to.have.property("error");
        // tslint:disable-next-line:max-line-length
        expect(body.error).to.have.property("message").to.be.equal("Invalid request: Absolute path, or hierarchy in archive file is not allowed");
        expect(body.error).to.have.property("code").to.be.equal("400");
      }).then(done, done);
    });

    it("should throw an error for wrong API Key", (done) => {
      const imageclassificationWithWrongApiKey = new Imageclassification("WRONG");
      imageclassificationWithWrongApiKey.classification("./testdata/elephant-114543_640.jpg").then((body) => {
        logger.debug("wrong API key", JSON.stringify(body, null, "  "));
        expect(body).to.have.property("fault");
        expect(body.fault).to.have.property("faultstring");
        expect(body.fault.faultstring).to.be.equal("Invalid ApiKey");
      }).then(done, done);
    });

  });

  describe("error coverage", () => {

    it("should return a file not found error", (done) => {
      imageclassification.classification("file_does_not_exist").then(
        () => { expect.fail(); },
        (err) => {
          expect(err).to.have.property("errno").to.be.equal(-2);
          expect(err).to.have.property("code").to.be.equal("ENOENT");
        }).then(done, done);
    });

    it("should return url not found error", (done) => {
      const imageclassificationErr = new Imageclassification(
        process.env.API_KEY,
        "http://wrong.url");
      imageclassificationErr.classification("./testdata/elephant-114543_640.jpg").then(
        () => { expect.fail(); },
        (err) => {
          expect(err).to.have.property("errno");
          expect(err).to.have.property("code");
        }).then(done, done);
    });

    it("should return method not implemented error", (done) => {
      imageclassification.customizable("", "", "").then(
        () => { expect.fail(); },
        (err) => {
          expect(err).is.equal("not implemented");
        }).then(done, done);
    });

    it("should throw an error for wrong base URL", (done) => {
      const imageclassificationWithWrongBaseUrl =
        new Imageclassification(process.env.API_KEY,
          "https://sandbox.api.sap.com/ml/imageclassification/classification_WRONG");
      imageclassificationWithWrongBaseUrl.classification("./testdata/elephant-114543_640.jpg").then(
        (body) => {
          expect.fail(body);
      },
      (err) => {
        err = JSON.parse(err);

        expect(err).to.have.property("error");
        expect(err.error).to.have.property("code").to.be.equal("404");
        expect(err.error).to.have.property("message").to.have.string("URL does not exist");
      }).then(done, done);
    });

  });

});
