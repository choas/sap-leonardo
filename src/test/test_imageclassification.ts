"use strict";

import { expect } from "chai";
import { Imageclassification } from "../index";

describe("imageclassification", () => {

  const imageclassification = new Imageclassification(process.env.API_KEY);

  describe("elephant", () => {
    it("should predict a tusker and an elephant", (done) => {
      imageclassification.classification("./testdata/elephant-114543_640.jpg").then((body) => {

        expect(body).to.have.property("id");
        expect(body).to.have.property("predictions");
        expect(body).to.have.property("processedTime");
        expect(body).to.have.property("status").to.be.equal("DONE");

        expect(body.predictions).to.be.an("array").have.lengthOf(1);
        expect(body.predictions[0]).to.have.property("results");
        expect(body.predictions[0].results).to.be.an("array").have.lengthOf(5);

        const expectedResults = [
          { label: "tusker", score: 0.7052137851715088 },
          { label: "African elephant, Loxodonta africana", score: 0.14608600735664368 },
          { label: "Indian elephant, Elephas maximus", score: 0.08779436349868774 },
          { label: "toaster", score: 0.0002799317880999297 },
          { label: "combination lock", score: 0.0002534814993850887 },
        ];

        for (let i = 0; i < 5; i++) {
          expect(body.predictions[0].results[i].label).to.be.equal(expectedResults[i].label);
          expect(body.predictions[0].results[i].score).to.be.equal(expectedResults[i].score);
        }
      }).then(done, done);
    });
  });

  describe("some image classification errors", () => {
    it("should throw an error for wrong file type (text)", (done) => {
      imageclassification.classification("./LICENSE").then((body) => {
        expect(body).to.have.property("error");
        expect(body.error).to.have.property("message");
        expect(body.error.message).to.be.equal("Error when uploading files:: Invalid file type");
      }).then(done, done);
    });

    it("should throw an error for zip with hierarchy", (done) => {
      imageclassification.classification("./testdata/Archive.zip").then((body) => {
        expect(body).to.have.property("error");
        expect(body.error).to.have.property("message");
        // tslint:disable-next-line:max-line-length
        expect(body.error.message).to.be.equal("Invalid request: Absolute path, or hierarchy in archive file is not allowed");
      }).then(done, done);
    });

    it("should throw an error for wrong API Key", (done) => {
      const imageclassificationWithWrongApiKey = new Imageclassification("WRONG");
      imageclassificationWithWrongApiKey.classification("./testdata/elephant-114543_640.jpg").then((body) => {
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

    it("should return connection refused error", (done) => {
      const imageclassificationErr = new Imageclassification(
        process.env.API_KEY,
        "http://localhost:11111");
      imageclassificationErr.classification("./testdata/elephant-114543_640.jpg").then(
        () => { expect.fail(); },
        (err) => {
          expect(err).to.have.property("errno").to.be.equal("ECONNREFUSED");
          expect(err).to.have.property("code").to.be.equal("ECONNREFUSED");
        }).then(done, done);
    });

    it("should return method not implemented error", (done) => {
      imageclassification.customizable("", "", "").then(
        () => { expect.fail(); },
        (err) => {
          expect(err).is.equal("not implemented");
        }).then(done, done);
    });

  });

});
