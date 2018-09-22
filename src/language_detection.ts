"use strict";

import * as request from 'request';
import { Promise } from 'es6-promise'
import * as assert from 'assert';

export class LanguageDetection {

  private _apiKey: string;
  private _baseUrl: string;

  constructor(apiKey: any, baseUrl: string = "https://sandbox.api.sap.com") {
    assert(apiKey, "apiKey is required");
    this._apiKey = apiKey;
    this._baseUrl = baseUrl
  }

  language(message: string): Promise<any> {

    return new Promise<any>((resolve, reject) => {
      var headers = {
        "Content-Type": 'application/json',
        Accept: 'application/json',
        APIKey: this._apiKey
      }

      var url = this._baseUrl + "/ml/languagedetection/language";
      var data = JSON.stringify({ message: message });

      request.post({ url: url, body: data, headers: headers }, (err, response, body) => {
        if (err) {
          return reject(err);
        }
        resolve(JSON.parse(body));
      });

    });
  }

  version(): Promise<any> {

    return new Promise<any>((resolve, reject) => {
      var headers = {
        "Content-Type": 'application/json',
        Accept: 'application/json',
        APIKey: this._apiKey
      }

      var url = this._baseUrl + "/ml/languagedetection/version";

      request.get({ url: url, headers: headers }, (err, response, body) => {
        if (err) {
          return reject(err);
        }
        resolve(JSON.parse(body));
      });

    });
  }

}
