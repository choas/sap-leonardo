"use strict";

import * as assert from "assert";
import { Promise } from "es6-promise";
import * as request from "request";

export class LanguageDetection {

  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: any, baseUrl: string = "https://sandbox.api.sap.com") {
    assert(apiKey, "apiKey is required");
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  public language(message: string): Promise<any> {

    return new Promise<any>((resolve, reject) => {
      const headers = {
        "APIKey": this.apiKey,
        "Accept": "application/json",
        "Content-Type": "application/json",
      };

      const url = this.baseUrl + "/ml/languagedetection/language";
      const data = JSON.stringify({ message });

      request.post({ url, body: data, headers }, (err, response, body) => {
        if (err) {
          return reject(err);
        }
        resolve(JSON.parse(body));
      });

    });
  }

  public version(): Promise<any> {

    return new Promise<any>((resolve, reject) => {
      const headers = {
        "APIKey": this.apiKey,
        "Accept": "application/json",
        "Content-Type": "application/json",
      };

      const url = this.baseUrl + "/ml/languagedetection/version";

      request.get({ url, headers }, (err, response, body) => {
        if (err) {
          return reject(err);
        }
        resolve(JSON.parse(body));
      });

    });
  }

}
