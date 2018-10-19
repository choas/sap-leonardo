"use strict";

import { expect } from "chai";
import { ProductImageClassification } from "../index";

describe("product image classification", () => {

  const productimageclassification = new ProductImageClassification(process.env.API_KEY);

  describe("keyboard", () => {
    it("should predict a keyboard (as second)", (done) => {
      productimageclassification.inferenceSync("./testdata/keyboard-70506_640.jpg").then((body) => {

        expect(body).to.have.property("id");
        expect(body).to.have.property("predictions");
        expect(body).to.have.property("processedTime");
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
        expect(body).to.have.property("error");
        expect(body.error).to.have.property("message");
        expect(body.error.message).to.be.equal("Error when uploading files:: Invalid file type");
      }).then(done, done);
    });

    it("should throw an error for zip with hierarchy", (done) => {
      productimageclassification.inferenceSync("./testdata/Archive.zip").then((body) => {
        expect(body).to.have.property("error");
        expect(body.error).to.have.property("message");
        // tslint:disable-next-line:max-line-length
        expect(body.error.message).to.be.equal("Invalid request: Absolute path, or hierarchy in archive file is not allowed");
      }).then(done, done);
    });

    it("should throw an error for wrong API Key", (done) => {
      const productimageclassificationWithWrongApiKey = new ProductImageClassification("WRONG");
      productimageclassificationWithWrongApiKey.inferenceSync("./testdata/elephant-114543_640.jpg").then((body) => {
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
      "label": "computer keyboard, keypad",
      "score": 0.4066023826599121
    },
    {
      "label": "notebook, notebook computer",
      "score": 0.10607732087373734
    },
    {
      "label": "space bar",
      "score": 0.02238370105624199
    },
    {
      "label": "mouse, computer mouse",
      "score": 0.021463630720973015
    },
    {
      "label": "laptop, laptop computer",
      "score": 0.014565951190888882
    }
  ];

});
