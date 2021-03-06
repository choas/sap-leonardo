"use strict";

import * as assert from "assert";
import { Promise } from "es6-promise";
import * as fs from "fs";
import * as request from "request";

export class Imageclassification {

  private apiKey: string;
  private baseUrl: string;

  constructor(
    apiKey: any,
    baseUrl: string = "https://sandbox.api.sap.com/ml/imageclassification/classification") {
    assert(apiKey, "apiKey is required");
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  public classification(files: string | Buffer): Promise<any> {
    return new Promise<any>((resolve, reject) => {

      if (Buffer.isBuffer(files)) {
        this.call(resolve, reject, "image.jpg", files);
      } else {
        fs.readFile(files, {}, (fileErr, fileData) => {
          if (fileErr) {
            return reject(fileErr);
          }
          this.call(resolve, reject, files, fileData);
        });
      }
    });
  }

  /*eslint no-unused-vars ["off", { "args": "all" }]*/
  public customizable(modelName: string, version: string, files: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      // const url = "/ml/imageclassification/models/" + modelName + "/versions/" + version;
      reject("not implemented");
    });
  }

  private call(resolve: any, reject: any, files: string, fileData: Buffer) {
    const formData = {
      files: { value: fileData, options: files },
    };

    const headers = {
      APIKey: this.apiKey,
      Accept: "application/json",
    };

    const url = this.baseUrl;

    request.post({ url, formData, headers }, (err, response, body) => {
      if (err) {
        return reject(err);
      }
      if (response.statusCode === 404) {
        return reject(body);
      }
      try {
        resolve(JSON.parse(body));
      } catch (exception) {
        return reject(exception);
      }
    });
  }
}
