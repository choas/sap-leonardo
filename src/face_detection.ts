"use strict";

import * as assert from "assert";
import { Promise } from "es6-promise";
import * as fs from "fs";
import * as request from "request";

export class FaceDetection {

  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: any, baseUrl: string = "https://sandbox.api.sap.com") {
    assert(apiKey, "apiKey is required");
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  public faceDetection(files: string): Promise<any> {

    return new Promise<any>((resolve, reject) => {

      fs.readFile(files, {}, (fileErr, fileData) => {
        if (fileErr) {
          return reject(fileErr);
        }
        const formData = {
          files: { value: fileData, options: files },
        };

        const headers = {
          APIKey: this.apiKey,
          Accept: "application/json",
        };

        const url = this.baseUrl + "/ml/facedetection/face-detection";

        request.post({ url, formData, headers }, (err, response, body) => {
          if (err) {
            return reject(err);
          }
          resolve(JSON.parse(body));
        });

      });
    });
  }
}
