"use strict";

import * as assert from "assert";
import { Promise } from "es6-promise";
import * as request from "request";

export interface ITranslationRequest {
  sourceLanguage: string;
  targetLanguages: string[];
  units: ITextTranslationRequest[];
}

export interface ITextTranslationRequest {
  value: string;
  key: string;
  inlineElements?: ITextTranslationRequestMarkup;
}

export interface ITextTranslationRequestMarkup {
  ranges?: ITextTranslationRequestMarkupRange[];
  markers?: ITextTranslationRequestMarkupMarker[];
}

export interface ITextTranslationRequestMarkupRange {
  id: number;
  begin: number;
  end: number;
}

export interface ITextTranslationRequestMarkupMarker {
  id: number;
  position: number;
  align: Align;
}

export enum Align {
  Left = "left",
  Right = "right",
}

export class Translation {

  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: any, baseUrl: string = "https://sandbox.api.sap.com") {
    assert(apiKey, "apiKey is required");
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  public translation(translationRequest: ITranslationRequest): Promise<any> {

    return new Promise<any>((resolve, reject) => {
      const headers = {
        "APIKey": this.apiKey,
        "Accept": "application/json",
        "Content-Type": "application/json",
      };

      const url = this.baseUrl + "/ml/translation/translation";
      const data = JSON.stringify(translationRequest);

      request.post({ url, body: data, headers }, (err, response, body) => {
        if (err) {
          return reject(err);
        }
        resolve(JSON.parse(body));
      });

    });
  }

}
