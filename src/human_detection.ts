"use strict";

import * as request from 'request';
import * as fs from 'fs';
import { Promise } from 'es6-promise'
import * as assert from 'assert';

export class HumanDetection {

  private _apiKey: string;
  private _baseUrl: string;

  constructor(apiKey: any, baseUrl: string = "https://sandbox.api.sap.com") {
    assert(apiKey, "apiKey is required");
    this._apiKey = apiKey;
    this._baseUrl = baseUrl
  }

  humanDetection(files: string): Promise<any> {

    return new Promise<any>((resolve, reject) => {

      fs.readFile(files, {}, (err, data) => {
        if (err) {
          return reject(err);
        }
        var formData = {
          file: { value: data, options: files }
        }

        var headers = {
          Accept: 'application/json',
          APIKey: this._apiKey
        }

        var url = this._baseUrl + "/ml/humandetection/human-detection/";

        request.post({ url: url, formData: formData, headers: headers }, (err, response, body) => {
          if (err) {
            return reject(err);
          }
          resolve(JSON.parse(body));
        });

      });
    });
  }

  humanDetectionImage(files: string): Promise<any> {

    return new Promise<any>((resolve, reject) => {

      fs.readFile(files, {}, (err, data) => {
        if (err) {
          return reject(err);
        }
        var formData = {
          file: { value: data, options: files }
        }

        var headers = {
          APIKey: this._apiKey
        }

        var url = this._baseUrl + "/ml/humandetection/human-detection/format:image";

        var imageData:any = [];

        request
          .post({ url: url, formData: formData, headers: headers })
          .on('data', (data) => {
            imageData.push(data);
          })
          .on('end', () => {
            resolve(Buffer.concat(imageData));
          })

      });
    });
  }
}
