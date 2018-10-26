"use strict";

import { expect } from "chai";
import { ProductImageClassification } from "../src/index";

describe("product image classification", () => {

  const productimageclassification = new ProductImageClassification(process.env.API_KEY);

  describe("keyboard", () => {
    it("should predict a keyboard (as second)", (done) => {
      productimageclassification.inferenceSync("./testdata/keyboard-70506_640.jpg").then((body) => {
        expect(body).to.have.property("_id");
        expect(body).to.have.property("predictions");
        expect(body).to.have.property("processed_time");
        expect(body).to.have.property("status").to.be.equal("DONE");

        expect(body.predictions).to.be.an("array").have.lengthOf(1);
        expect(body.predictions[0]).to.have.property("results");
        expect(body.predictions[0].results).to.be.an("array").have.lengthOf(5).to.be.eql(expectedResults);
      }).then(done, done);
    });
  });

  describe("some image classification errors", () => {
    it("should throw an error for wrong file type (text)", (done) => {
      productimageclassification.inferenceSync("./LICENSE").then((body) => {
        expect(body).to.have.property("error").to.be.equal("Error when uploading files:");
        expect(body).to.have.property("error_description").to.be.equal("Invalid file type");
      }).then(done, done);
    });

    it("should throw an error for zip with hierarchy", (done) => {
      productimageclassification.inferenceSync("./testdata/Archive.zip").then((body) => {
        expect(body).to.have.property("error").to.be.equal("Invalid Archive Input");
        // tslint:disable-next-line:max-line-length
        expect(body).to.have.property("error_description").to.be.equal("Only archive without hierarchy is accepted. __MACOSX/ is a folder. ");
      }).then(done, done);
    });

    it("should throw an error for wrong API Key", (done) => {
      const productimageclassificationWithWrongApiKey = new ProductImageClassification("WRONG");
      productimageclassificationWithWrongApiKey.inferenceSync("./testdata/keyboard-70506_640.jpg").then((body) => {
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

    it("should return connection refused error", (done) => {
      const productimageclassificationErr = new ProductImageClassification(
        process.env.API_KEY,
        "http://localhost:11111");
      productimageclassificationErr.inferenceSync("./testdata/keyboard-70506_640.jpg").then(
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
      "label": "notebooks & accessories",
      "score": 0.551319
    },
    {
      "label": "keyboards",
      "score": 0.400047
    },
    {
      "label": "tablets",
      "score": 0.026898
    },
    {
      "label": "external hard drives",
      "score": 0.015235
    },
    {
      "label": "other",
      "score": 0.004329
    }
  ];

});
