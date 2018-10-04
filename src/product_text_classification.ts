"use strict";

import * as assert from "assert";
import { Promise } from "es6-promise";
import * as fs from "fs";
import * as request from "request";

export class ProductTextClassification {

  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: any, baseUrl: string = "https://sandbox.api.sap.com") {
    assert(apiKey, "apiKey is required");
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  public inferenceSync(files: any, texts: any): Promise<any> {

    return new Promise<any>((resolve, reject) => {
      const headers = {
        "APIKey": this.apiKey,
        "Accept": "application/json",
        "Content-Type": "application/json",
      };

      let formData;
      if (files) {
        const data = fs.readFileSync(files, {});
        formData = {
          files: { value: data, options: files },
        };
      } else {
        formData = {
          texts,
        };
      }

      const url = this.baseUrl + "/ml/producttextclassifier/inference_sync";

      request.post({ url, formData, headers }, (err, response, body) => {
        if (err) {
          return reject(err);
        }
        resolve(JSON.parse(body));
      });

    });
  }

}
