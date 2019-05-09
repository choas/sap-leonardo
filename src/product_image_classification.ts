"use strict";

import * as assert from "assert";
import { Promise } from "es6-promise";
import * as fs from "fs";
import * as request from "request";

export class ProductImageClassification {

  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: any, baseUrl: string = "https://sandbox.api.sap.com") {
    assert(apiKey, "apiKey is required");
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  public inferenceSync(files: string): Promise<any> {

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

        const url = this.baseUrl + "/ml/prodimgclassifier/inference_sync";

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

      });
    });
  }
}
