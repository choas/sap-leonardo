"use strict";

import * as assert from "assert";
import { Promise } from "es6-promise";
import * as fs from "fs";
import * as request from "request";

export class SimilarityScoring {

  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: any, baseUrl: string = "https://sandbox.api.sap.com") {
    assert(apiKey, "apiKey is required");
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  public similarityScoring(files: any, texts: any, options: string): Promise<any> {

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
          options,
        };
      } else {
        formData = {
          options,
          texts,
        };
      }

      const url = this.baseUrl + "/ml/similarityscoring/similarity-scoring";

      request.post({ url, formData, headers }, (err, response, body) => {
        if (err) {
          return reject(err);
        }
        resolve(JSON.parse(body));
      });

    });
  }

}
