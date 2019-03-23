"use strict";

import * as assert from "assert";
import { Promise } from "es6-promise";
import * as fs from "fs";
import * as request from "request";

export class ImageFeatureExtraction {

  private apiKey: string;
  private token: string;
  private baseUrl: string;

  constructor(
    apiKey: any,
    token: any,
    baseUrl: string = "https://sandbox.api.sap.com/ml/imagefeatureextraction/feature-extraction") {
    assert(apiKey || token, "apiKey or token is required");
    this.apiKey = apiKey;
    this.token = token;
    this.baseUrl = baseUrl;
  }

  public featureExtraction(files: string, modelName: any = null, version: any = null): Promise<any> {
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
          Authorization: this.token,
        };

        let url = this.baseUrl;
        if (modelName && version) {
          url += "/models/" + modelName + "/versions/" + version;
        }

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
