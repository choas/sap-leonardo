"use strict";

import * as request from 'request';
import * as fs from 'fs';
import { Promise } from 'es6-promise'
import * as assert from 'assert';

export class OCR {

  private _apiKey: string;
  private _baseUrl: string;

  constructor(apiKey: any, baseUrl: string = "https://sandbox.api.sap.com") {
    assert(apiKey, "apiKey is required");
    this._apiKey = apiKey;
    this._baseUrl = baseUrl
  }

  ocr(files: string, options: any = null, asJobs: Boolean = false): Promise<any> {

    return new Promise<any>((resolve, reject) => {

      fs.readFile(files, {}, (err, data) => {
        if (err) {
          console.error('ERROR', err);
          reject(err);
        }
        var formData;
        if (options) {
          formData = {
            files: { value: data, options: files },
            options: JSON.stringify(options)
          }
        } else {
          formData = {
            files: { value: data, options: files }
          }
        }

        var headers = {
          Accept: 'application/json',
          APIKey: this._apiKey
        }

        var url = this._baseUrl + "/ml/ocr/ocr" + (asJobs ? "/jobs" : "");

        request.post({ url: url, formData: formData, headers: headers }, (err, response, body) => {
          if (err) {
            console.error('ERROR', err);
            reject(err);
          }
          resolve(JSON.parse(body));
        });

      });
    });
  }

  jobs(files: string, options: any = null): Promise<any> {
    return this.ocr(files, options, true);
  }

  jobsId(id: string): Promise<any> {

    return new Promise<any>((resolve, reject) => {

      var headers = {
        Accept: 'application/json',
        APIKey: this._apiKey
      }

      var url = this._baseUrl + "/ml/ocr/ocr/jobs/" + id;

      request.get({ url: url, headers: headers }, (err, response, body) => {
        if (err) {
          console.error('ERROR', err);
          reject(err);
        }
        resolve(JSON.parse(body));
      });

    });
  }


}
