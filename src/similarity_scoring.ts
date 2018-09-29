"use strict";

import * as request from 'request';
import * as fs from 'fs';
import { Promise } from 'es6-promise'
import * as assert from 'assert';

export class SimilarityScoring {

  private _apiKey: string;
  private _baseUrl: string;

  constructor(apiKey: any, baseUrl: string = "https://sandbox.api.sap.com") {
    assert(apiKey, "apiKey is required");
    this._apiKey = apiKey;
    this._baseUrl = baseUrl
  }

  similarityScoring(files: any, texts: any, options: string): Promise<any> {

    return new Promise<any>((resolve, reject) => {
      var headers = {
        "Content-Type": 'application/json',
        Accept: 'application/json',
        APIKey: this._apiKey
      }

      var formData;
      if (files) {
        var data = fs.readFileSync(files, {});
        formData = {
          files: { value: data, options: files },
          options: options
        }
      } else {
        formData = {
          texts: texts,
          options: options
        }
      }

      var url = this._baseUrl + "/ml/similarityscoring/similarity-scoring";

      request.post({ url: url, formData: formData, headers: headers }, (err, response, body) => {
        if (err) {
          return reject(err);
        }
        resolve(JSON.parse(body));
      });

    });
  }

}
