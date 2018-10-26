"use strict";

import { expect } from "chai";
import { ProductTextClassification } from "../src/index";

describe("product text classification", () => {

  const productTextClassification = new ProductTextClassification(process.env.API_KEY);

  describe("texts", () => {

    // tslint:disable-next-line:max-line-length
    const productText = "Get the clarity of 4K UHD in an old-fashioned smart TV design that's mind controllable. Ultra HD makes everything smooth and sharp. Magic power gives you instant access to your favourite content and the movie night is just a smile away."; // note: this is an adjusted description for a Smart TV

    it("should detect a LCD TV", (done) => {

      productTextClassification.inferenceSync(null, productText).then((body) => {
        expect(body).to.have.property("_id");
        expect(body).to.have.property("predictions").to.be.an("array").with.length(1);
        expect(body).to.have.property("processed_time");
        expect(body).to.have.property("request");
        expect(body).to.have.property("status").to.be.equal("DONE");
        expect(body).to.have.property("tenantName");

        expect(body.predictions[0]).to.have.property("description").to.be.equal(productText);
        expect(body.predictions[0]).to.have.property("results").to.be.an("array").with.length(5);

        for (let i = 0; i < expectedResults.length; i++) {
          expect(body.predictions[0].results[i].category).to.be.equal(expectedResults[i].category);
          expect(body.predictions[0].results[i].confidence).to.be.equal(expectedResults[i].confidence);
        }

      }).then(done, done);
    });

  });

  describe("files", () => {

    it("should detect a LCD TV", (done) => {

      productTextClassification.inferenceSync("./testdata/product_text.zip", null).then((body) => {
        expect(body).to.have.property("_id");
        expect(body).to.have.property("predictions").to.be.an("array").with.length(1);
        expect(body).to.have.property("processed_time");
        expect(body).to.have.property("request");
        expect(body).to.have.property("status").to.be.equal("DONE");
        expect(body).to.have.property("tenantName");

        expect(body.predictions[0]).to.have.property("file").to.be.equal("product_text.txt");

        expect(body.predictions[0]).to.have.property("results").to.be.an("array").with.length(5);

        for (let i = 0; i < expectedResults.length; i++) {
          expect(body.predictions[0].results[i].category).to.be.equal(expectedResults[i].category);
          expect(body.predictions[0].results[i].confidence).to.be.equal(expectedResults[i].confidence);
        }

      }).then(done, done);
    });

  });

  describe("error coverage", () => {

    it("should return a file not found error", (done) => {
      productTextClassification.inferenceSync("file_does_not_exist", null).then(
        () => { expect.fail(); },
        (err) => {
          expect(err).to.have.property("errno").to.be.equal(-2);
          expect(err).to.have.property("code").to.be.equal("ENOENT");
        }).then(done, done);
    });

    it("should return connection refused error", (done) => {
      const productTextClassificationErr = new ProductTextClassification(
        process.env.API_KEY,
        "http://localhost:11111");

      productTextClassificationErr.inferenceSync("./testdata/product_text.zip", null).then(
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
      "category": "LED TVs",
      "confidence": 0.913253
    },
    {
      "category": "digital cameras",
      "confidence": 0.040222
    },
    {
      "category": "other",
      "confidence": 0.03803
    },
    {
      "category": "smartphones",
      "confidence": 0.004975
    },
    {
      "category": "computer monitors",
      "confidence": 0.001214
    }
  ];
});
