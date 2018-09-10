"use strict";

import * as request from 'request';
import * as fs from 'fs';
import { Promise } from 'es6-promise'
import * as assert from 'assert';


export class LanguageDetection {

    private _apiKey: string;
    private _baseUrl: string;

    constructor(apiKey: string, baseUrl: string = "https://sandbox.api.sap.com") {
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
                    console.error('ERROR', err);
                    reject(err);
                }
                resolve(JSON.parse(body));
            });

        });
    }

}
