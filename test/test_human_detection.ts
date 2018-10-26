"use strict";

import { expect } from "chai";
// import * as fs from "fs";
import { HumanDetection } from "../index";

describe("human detection", () => {

  const humanDetection = new HumanDetection(process.env.API_KEY);

  describe("four people", () => {
    it("should predict four people", (done) => {
      humanDetection.humanDetection("./testdata/man-3365368_640.jpg").then((body) => {

        expect(body).to.have.property("detection_boxes").to.be.an("array").have.lengthOf(4);
        expect(body).to.have.property("detection_classes").to.be.an("array").have.lengthOf(4);
        expect(body).to.have.property("detection_scores").to.be.an("array").have.lengthOf(4);
        expect(body).to.have.property("num_detections").to.be.equal(4);

        const expectedResults = {
          detection_boxes:
            [[0.13377800583839417,
              0.485458105802536,
              0.9857560396194458,
              0.7680479288101196],
            [0.0999714657664299,
              0.20566348731517792,
              0.9941292405128479,
              0.4770410656929016],
            [0.009488373063504696,
              0.009807304479181767,
              0.9621061682701111,
              0.2491825520992279],
            [0.16002099215984344,
              0.7634855508804321,
              0.9644148945808411,
              0.9987258911132812]],
          detection_classes: ["human", "human", "human", "human"],
          detection_scores:
            [0.9962896108627319,
              0.9920268654823303,
              0.9907668828964233,
              0.9902926683425903],
          num_detections: 4,
        };

        for (let i = 0; i < expectedResults.detection_boxes[0].length; i++) {
          expect(body.detection_boxes[0][i]).to.be.equal(expectedResults.detection_boxes[0][i]);
        }
        for (let i = 0; i < expectedResults.detection_classes.length; i++) {
          expect(body.detection_classes[i]).to.be.equal(expectedResults.detection_classes[i]);
        }
        for (let i = 0; i < expectedResults.detection_scores.length; i++) {
          expect(body.detection_scores[i]).to.be.equal(expectedResults.detection_scores[i]);
        }

      }).then(done, done);
    });
  });

  describe("human detection image", () => {

    const humanDetectionImage = new HumanDetection(process.env.API_KEY);

    describe("four people", () => {
      it("should predict four people", (done) => {
        humanDetectionImage.humanDetectionImage("./testdata/man-3365368_640.jpg").then((body) => {

          expect(body.length).to.be.equal(393486);

          // fs.writeFileSync("human-detection-image.png", body);

        }).then(done, done);
      });
    });

  });

  describe("error coverage", () => {

    it("should return a file not found error", (done) => {
      humanDetection.humanDetection("file_does_not_exist").then(
        () => { expect.fail(); },
        (err) => {
          expect(err).to.have.property("errno").to.be.equal(-2);
          expect(err).to.have.property("code").to.be.equal("ENOENT");
        }).then(done, done);
    });

    it("should return a file not found (image) error", (done) => {
      humanDetection.humanDetectionImage("file_does_not_exist").then(
        () => { expect.fail(); },
        (err) => {
          expect(err).to.have.property("errno").to.be.equal(-2);
          expect(err).to.have.property("code").to.be.equal("ENOENT");
        }).then(done, done);
    });

    it("should return connection refused error", (done) => {
      const humanDetectionErr = new HumanDetection(
        process.env.API_KEY,
        "http://localhost:11111");
      humanDetectionErr.humanDetection("./testdata/man-3365368_640.jpg").then(
        () => { expect.fail(); },
        (err) => {
          expect(err).to.have.property("errno").to.be.equal("ECONNREFUSED");
          expect(err).to.have.property("code").to.be.equal("ECONNREFUSED");
        }).then(done, done);
    });

  });

});
