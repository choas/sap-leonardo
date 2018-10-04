"use strict";

import * as assert from "assert";
import { Promise } from "es6-promise";
import * as fs from "fs";
import * as request from "request";

export class MultiInstanceImageSegmentation {

  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: any, baseUrl: string = "https://sandbox.api.sap.com") {
    assert(apiKey, "apiKey is required");
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  public instanceSegmentor(files: string, format: any = null): Promise<any> {

    return new Promise<any>((resolve, reject) => {

      fs.readFile(files, {}, (fileErr, fileData) => {
        if (fileErr) {
          return reject(fileErr);
        }
        const formData = {
          files: { value: fileData, options: files },
        };

        const headers = {
          APIKey: this.apiKey,
          Accept: "application/json",
        };

        let url = this.baseUrl + "/ml/instancesegmentor/instance-segmentor";

        if (format) {
          url += "/format:jpg";
        }

        request.post({ url, formData, headers }, (err, response, body) => {
          if (err) {
            return reject(err);
          }
          resolve(JSON.parse(body));
        });

      });
    });
  }
}
