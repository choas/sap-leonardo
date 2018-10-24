"use strict";

import * as assert from "assert";
import { Promise } from "es6-promise";
import * as fs from "fs";
import * as request from "request";

export class TopicDetection {

  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: any, baseUrl: string = "https://sandbox.api.sap.com") {
    assert(apiKey, "apiKey is required");
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  public topicDetection(files: any, options: string): Promise<any> {

    return new Promise<any>((resolve, reject) => {
      const headers = {
        "APIKey": this.apiKey,
        "Accept": "application/json",
        "Content-Type": "application/json",
      };

      let formData;
      const data = fs.readFileSync(files, {});
      formData = {
        files: { value: data, options: files },
        options,
      };

      const url = this.baseUrl + "/ml/topicdetection/topic-detection";

      request.post({ url, formData, headers }, (err, response, body) => {
        if (err) {
          return reject(err);
        }
        resolve(JSON.parse(body));
      });

    });
  }

}
