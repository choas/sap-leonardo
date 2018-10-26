"use strict";

import { expect } from "chai";
import { TopicDetection } from "../index";

describe("topic detection", () => {

  const topicDetection = new TopicDetection(process.env.API_KEY);

  const options = JSON.stringify({ numTopics: 3, numTopicsPerDoc: 2, numKeywordsPerTopic: 15 });

  describe("files", () => {

    it("should detect topics", (done) => {

      topicDetection.topicDetection("./testdata/topic_detection.zip", options).then((body) => {
        expect(body).to.have.property("id");
        expect(body).to.have.property("predictions");
        expect(body).to.have.property("processedTime");
        expect(body).to.have.property("status").to.be.equal("DONE");

        expect(body.predictions).to.be.an("array").have.lengthOf(3).is.eql(predictions);
      }).then(done, done);
    });

  });

  describe("topic detection with different options", () => {

    const topicDetectionWithOptions = new TopicDetection(process.env.API_KEY);

    it("should detect 2 keywords for numTopics 2", (done) => {
      const otherOptions = JSON.stringify({ numTopics: 2, numTopicsPerDoc: 2, numKeywordsPerTopic: 15 });
      topicDetectionWithOptions.topicDetection("./testdata/topic_detection.zip", otherOptions).then((body) => {
        expect(body).to.have.property("id");
        expect(body).to.have.property("predictions");
        expect(body).to.have.property("processedTime");
        expect(body).to.have.property("status").to.be.equal("DONE");

        expect(body.predictions).to.be.an("array").have.lengthOf(3);

        expect(body.predictions[0]).to.have.property("keywords").to.be.an("array").to.have.lengthOf(2);
      }).then(done, done);
    });

    it("should detect 1 keyword for numTopics 1", (done) => {
      const otherOptions = JSON.stringify({ numTopics: 1, numTopicsPerDoc: 2, numKeywordsPerTopic: 15 });
      topicDetectionWithOptions.topicDetection("./testdata/topic_detection.zip", otherOptions).then((body) => {
        expect(body).to.have.property("id");
        expect(body).to.have.property("predictions");
        expect(body).to.have.property("processedTime");
        expect(body).to.have.property("status").to.be.equal("DONE");

        expect(body.predictions).to.be.an("array").have.lengthOf(3);

        expect(body.predictions[0]).to.have.property("keywords").to.be.an("array").to.have.lengthOf(1);
      }).then(done, done);
    });

  });

  describe("error messages", () => {
    it("should return an error message, that service requires at least 2 documents", (done) => {
      topicDetection.topicDetection("./testdata/product_text.zip", options).then((body) => {
        expect(body).to.have.property("error");
        expect(body.error).to.have.property("code").to.be.equal("400");
        // tslint:disable:max-line-length
        expect(body.error).to.have.property("message").to.be.equal("Invalid request: This service requires at least 2 documents with content, only 1 is provided");
        expect(body.error).to.have.property("requestId");
      }).then(done, done);
    });
  });

  describe("error coverage", () => {

    const topicDetectionErr = new TopicDetection(
      process.env.API_KEY,
      "http://localhost:11111");

    it("should return a file not found error", (done) => {
      topicDetectionErr.topicDetection("file_does_not_exist", "").then(
        () => { expect.fail(); },
        (err) => {
          expect(err).to.have.property("errno").to.be.equal(-2);
          expect(err).to.have.property("code").to.be.equal("ENOENT");
        }).then(done, done);
    });

    it("should return connection refused error", (done) => {
      topicDetectionErr.topicDetection("./testdata/product_text.zip", "").then(
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
  const predictions = [
    {
      "docName": "apple_pie.txt",
      "keywords": [
        [
          "pie",
          "apple",
          "crust",
          "bake",
          "double",
          "cream",
          "pastry",
          "ingredient",
          "comfort",
          "foods",
          "baker",
          "strip",
          "know",
          "la",
          "cheese"
        ],
        [
          "computer",
          "computation",
          "study",
          "field",
          "theory",
          "programming",
          "science",
          "computational",
          "consider",
          "use",
          "approach",
          "design",
          "language",
          "challenge",
          "practical"
        ]
      ],
      "scores": [
        1.0003991552443705,
        0
      ],
      "topics": [
        1,
        2
      ]
    },
    {
      "docName": "computational_complexity_theory.txt",
      "keywords": [
        [
          "problem",
          "complexity",
          "solve",
          "computational",
          "theory",
          "resource",
          "algorithm",
          "computer",
          "circuit",
          "classify",
          "principle",
          "ask",
          "analysis",
          "computability",
          "mathematical"
        ],
        [
          "pie",
          "apple",
          "crust",
          "bake",
          "double",
          "cream",
          "pastry",
          "ingredient",
          "comfort",
          "foods",
          "baker",
          "strip",
          "know",
          "la",
          "cheese"
        ]
      ],
      "scores": [
        0.9025471754157848,
        2.443577889647612e-10
      ],
      "topics": [
        0,
        1
      ]
    },
    {
      "docName": "computer-science.txt",
      "keywords": [
        [
          "computer",
          "computation",
          "study",
          "field",
          "theory",
          "programming",
          "science",
          "computational",
          "consider",
          "use",
          "approach",
          "design",
          "language",
          "challenge",
          "practical"
        ],
        [
          "problem",
          "complexity",
          "solve",
          "computational",
          "theory",
          "resource",
          "algorithm",
          "computer",
          "circuit",
          "classify",
          "principle",
          "ask",
          "analysis",
          "computability",
          "mathematical"
        ]
      ],
      "scores": [
        1.088289450895757,
        0.00014159262045315344
      ],
      "topics": [
        2,
        0
      ]
    }
  ];

});
