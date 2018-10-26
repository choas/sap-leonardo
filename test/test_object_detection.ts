"use strict";

import { expect } from "chai";
// import * as fs from "fs";
import { ObjectDetection } from "../src/index";

const fileName = "juice-1271881_640.jpg";

describe("object detection", () => {

  const objectDetection = new ObjectDetection(process.env.API_KEY);

  describe("juice", () => {
    it("should predict something, but causes an internal error", (done) => {
      objectDetection.objectDetection("./testdata/" + fileName).then((body) => {
        expect(body).to.have.property("fault");
        expect(body.fault).to.have.property("detail");
        expect(body.fault.detail).to.have.property("errorcode");
        expect(body.fault.detail.errorcode).to.be.equal("messaging.adaptors.http.flow.ApplicationNotFound");
      }).then(done, done);
    }).timeout(60000);

    it("should return an image, but causes an internal error", (done) => {
      objectDetection.objectDetection("./testdata/" + fileName, true).then((body) => {
        expect(body).to.have.property("fault");
        expect(body.fault).to.have.property("detail");
        expect(body.fault.detail).to.have.property("errorcode");
        expect(body.fault.detail.errorcode).to.be.equal("messaging.adaptors.http.flow.ApplicationNotFound");
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

    it("should return connection refused error", (done) => {
      const objectDetectionErr = new ObjectDetection(
        process.env.API_KEY,
        "http://localhost:11111");
      objectDetectionErr.objectDetection("./testdata/" + fileName).then(
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
  // const expectedResults = [
  //   {
  //     "bbox": {
  //       "x1": 366,
  //       "x2": 577,
  //       "y1": 143,
  //       "y2": 575
  //     },
  //     "classId": 5,
  //     "className": "Glass Bottle",
  //     "mask": "...",
  //     "score": 1
  //   },
  //   {
  //     "bbox": {
  //       "x1": 49,
  //       "x2": 266,
  //       "y1": 321,
  //       "y2": 579
  //     },
  //     "classId": 1,
  //     "className": "Can",
  //     "mask": "...",
  //     "score": 1
  //   },
  //   {
  //     "bbox": {
  //       "x1": 244,
  //       "x2": 356,
  //       "y1": 92,
  //       "y2": 489
  //     },
  //     "classId": 4,
  //     "className": "Pet Bottle",
  //     "mask": "...",
  //     "score": 0.98
  //   },
  //   {
  //     "bbox": {
  //       "x1": 289,
  //       "x2": 421,
  //       "y1": 149,
  //       "y2": 536
  //     },
  //     "classId": 5,
  //     "className": "Glass Bottle",
  //     "mask": "...",
  //     "score": 0.94
  //   }
  // ];
});
