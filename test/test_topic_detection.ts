"use strict";

import { expect } from "chai";
import { getLogger } from "log4js";
import { TopicDetection } from "../src/index";

const logger = getLogger("test-topic-detection");
logger.level = "off";

describe("topic detection", () => {

  const topicDetection = new TopicDetection(process.env.API_KEY);

  const options = JSON.stringify({ numTopics: 3, numTopicsPerDoc: 2, numKeywordsPerTopic: 15 });

  describe("files", () => {

    it("should detect topics", (done) => {

      topicDetection.topicDetection("./testdata/topic_detection.zip", options).then((body) => {
        logger.debug("topics", JSON.stringify(body, null, "  "));

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
        logger.debug("2 keywords / numTopics 2", JSON.stringify(body, null, "  "));

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
        logger.debug("1 keyword / numTopics 1", JSON.stringify(body, null, "  "));

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
        logger.debug("require 2 docs", JSON.stringify(body, null, "  "));

        expect(body).to.have.property("error");
        expect(body.error).to.have.property("code").to.be.equal("400");
        // tslint:disable:max-line-length
        expect(body.error).to.have.property("message").to.be.equal("Invalid request: This service requires at least 2 documents with content, only 1 is provided");
        expect(body.error).to.have.property("requestId");
      }).then(done, done);
    });

    it("should return an error message, that topics should not exceed the number of documents", (done) => {
      const wrongOptions = JSON.stringify({ numTopics: 4, numTopicsPerDoc: 2, numKeywordsPerTopic: 15 });
      const topicDetectionWithWrongOptions = new TopicDetection(process.env.API_KEY);
      topicDetectionWithWrongOptions.topicDetection("./testdata/topic_detection.zip", wrongOptions).then((body) => {
        logger.debug("num docs", JSON.stringify(body, null, "  "));

        expect(body).to.have.property("error");
        expect(body.error).to.have.property("code").to.be.equal("400");
        // tslint:disable:max-line-length
        expect(body.error).to.have.property("message").to.be.equal("Invalid request: Number of topics should not exceed the number of documents.#Topics: 4, #Documents: 3");
        expect(body.error).to.have.property("requestId");
      }).then(done, done);
    });

    it("should return an error message, if only one text file is send", (done) => {
      const wrongOptions = JSON.stringify({ numTopics: 4, numTopicsPerDoc: 2, numKeywordsPerTopic: 15 });
      const topicDetectionWithWrongOptions = new TopicDetection(process.env.API_KEY);
      topicDetectionWithWrongOptions.topicDetection("./node_modules/typescript/LICENSE.txt", wrongOptions).then((body) => {
        logger.debug("only one text file", JSON.stringify(body, null, "  "));

        expect(body).to.have.property("error");
        expect(body.error).to.have.property("code").to.be.equal("400");
        // tslint:disable:max-line-length
        expect(body.error).to.have.property("message").to.be.equal("Invalid request: This service requires at least 2 files or 1 archive");
        expect(body.error).to.have.property("requestId");
      }).then(done, done);
    });

    it("should return an error message, of an invalid file type", (done) => {
      const wrongOptions = JSON.stringify({ numTopics: 4, numTopicsPerDoc: 2, numKeywordsPerTopic: 15 });
      const topicDetectionWithWrongOptions = new TopicDetection(process.env.API_KEY);
      topicDetectionWithWrongOptions.topicDetection("./README.md", wrongOptions).then((body) => {
        logger.debug("invalid file type", JSON.stringify(body, null, "  "));

        expect(body).to.have.property("error");
        expect(body.error).to.have.property("code").to.be.equal("400");
        // tslint:disable:max-line-length
        expect(body.error).to.have.property("message").to.be.equal("Error when uploading files:: Invalid file type");
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
          "cream",
          "double",
          "pastry",
          "bake",
          "know",
          "generally",
          "get",
          "soggy.[2",
          "signature",
          "ice",
          "baker",
          "ingredient"
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
          "language",
          "consider",
          "challenge",
          "design",
          "approach",
          "use",
          "application"
        ]
      ],
      "scores": [
        1.0001081712355928,
        1.5256569816232505e-18
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
          "number",
          "mathematical",
          "analysis",
          "circuit",
          "classify",
          "computability",
          "principle"
        ],
        [
          "pie",
          "apple",
          "crust",
          "cream",
          "double",
          "pastry",
          "bake",
          "know",
          "generally",
          "get",
          "soggy.[2",
          "signature",
          "ice",
          "baker",
          "ingredient"
        ]
      ],
      "scores": [
        0.9014963178483772,
        1.0550173980612786e-10
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
          "language",
          "consider",
          "challenge",
          "design",
          "approach",
          "use",
          "application"
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
          "number",
          "mathematical",
          "analysis",
          "circuit",
          "classify",
          "computability",
          "principle"
        ]
      ],
      "scores": [
        1.0828392850608868,
        0.00012080046893635658
      ],
      "topics": [
        2,
        0
      ]
    }
  ];

});
