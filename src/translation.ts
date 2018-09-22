"use strict";

import * as request from 'request';
import { Promise } from 'es6-promise'
import * as assert from 'assert';

export interface TranslationRequest {
  sourceLanguage: string;
  targetLanguages: string[];
  units: TextTranslationRequest[];
}

export interface TextTranslationRequest {
  value: string;
  key: string;
}

export class Translation {

  private _apiKey: string;
  private _baseUrl: string;

  constructor(apiKey: any, baseUrl: string = "https://sandbox.api.sap.com") {
    assert(apiKey, "apiKey is required");
    this._apiKey = apiKey;
    this._baseUrl = baseUrl
  }

  translation(body: TranslationRequest): Promise<any> {

    return new Promise<any>((resolve, reject) => {
      var headers = {
        "Content-Type": 'application/json',
        Accept: 'application/json',
        APIKey: this._apiKey
      }

      var url = this._baseUrl + "/ml/translation/translation";
      var data = JSON.stringify(body)

      request.post({ url: url, body: data, headers: headers }, (err, response, body) => {
        if (err) {
          return reject(err);
        }
        resolve(JSON.parse(body));
      });

    });
  }

}
