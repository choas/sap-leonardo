"use strict";

import * as assert from "assert";
import { Promise } from "es6-promise";
import * as fs from "fs";
import * as request from "request";

export class OCR {

  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: any, baseUrl: string = "https://sandbox.api.sap.com") {
    assert(apiKey, "apiKey is required");
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  public ocr(files: string, options: any = null, asJobs: boolean = false): Promise<any> {

    return new Promise<any>((resolve, reject) => {

      fs.readFile(files, {}, (fileErr, fileData) => {
        if (fileErr) {
          return reject(fileErr);
        }
        let formData;
        if (options) {
          formData = {
            files: { value: fileData, options: files },
            options: JSON.stringify(options),
          };
        } else {
          formData = {
            files: { value: fileData, options: files },
          };
        }

        const headers = {
          APIKey: this.apiKey,
          Accept: "application/json",
        };

        const url = this.baseUrl + "/ml/ocr/ocr" + (asJobs ? "/jobs" : "");

        request.post({ url, formData, headers }, (err, response, body) => {
          if (err) {
            return reject(err);
          }
          resolve(JSON.parse(body));
        });

      });
    });
  }

  public jobs(files: string, options: any = null): Promise<any> {
    return this.ocr(files, options, true);
  }

  public jobsId(id: string): Promise<any> {

    return new Promise<any>((resolve, reject) => {

      const headers = {
        APIKey: this.apiKey,
        Accept: "application/json",
      };

      const url = this.baseUrl + "/ml/ocr/ocr/jobs/" + id;

      request.get({ url, headers }, (err, response, body) => {
        if (err) {
          return reject(err);
        }
        resolve(JSON.parse(body));
      });

    });
  }

}
