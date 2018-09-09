"use strict";

import { expect, use } from 'chai';
import { OCR } from "./index";

describe('ocr', () => {

    var ocr = new OCR(process.env.API_KEY);

    describe('image to text', () => {
        it('should return an English text', (done) => {
            ocr.ocr("./testdata/ocr/english_1000.png").then(body => {
                expect(body).to.have.property('id');
                expect(body).to.have.property('predictions');
                expect(body).to.have.property('processedTime');
                expect(body).to.have.property('status').to.be.equal('DONE');

                expect(body.predictions).to.be.an('array').have.lengthOf(1);

                const english_text = "Training Service for Optical Character\nRecognition\n\nThe Optical Character Recognition (OCR) service recognizes typewritten text from scanned or digital documents. The service accepts pdf.\njpg and png files types as input and returns detected texts within the file in either text or hOCR format. The service supports two modes of\noperation: synchronous (blocking) and asynchronous (non—blocking)\n\nUse Cases\n\n* Supported languages are English, German, French, Spanish, Russian, Arabic. Chinese Simplified and Chinese Traditional\n\n* The OCR service works best with wel: scanned documents, .e. the FS OCR is not intended for use with arbitrary textual\nrepresentations. For other text recognition use—cases, such as recognizing text in natural images, please refer to the ML foundation\nScene Text Recognition service\n\nThe OCR service only returns text, no assumptions are done as to its organization table layouts) or semantics (e.g. table header\nor totals ine)\n\nImage preprocessing to ensure a good contrast and straight frontal scan can improve the recognition results\n\nA right choice of processing options (model type, languages) can improve the recognition results\n\nThe API Business Hub sandbox service instance only allows documents of up to 2MB, whereas productive instances up to 10MB\n\nFor heavy load. the asynchronous part should be used as the synchronous part times out with too many queries\n\f"
                expect(body.predictions[0]).to.be.equal(english_text);

            }).then(done, done);
        });
    });

    describe('image to text with options', () => {
        it('should return XML', (done) => {
            let options = { "lang": "en", "outputType": "xml", "pageSegMode": "1", "modelType": "lstmStandard" };
            ocr.ocr("./testdata/ocr/english_1000.png", options).then(body => {
                expect(body).to.have.property('id');
                expect(body).to.have.property('predictions');
                expect(body).to.have.property('processedTime');
                expect(body).to.have.property('status').to.be.equal('DONE');

                expect(body.predictions).to.be.an('array').have.lengthOf(1);

                expect(body.predictions[0]).to.match(/^<html:html/)

            }).then(done, done);
        });

        it('should return a German text', (done) => {
            let options = { "lang": "de", "outputType": "txt", "pageSegMode": "1", "modelType": "lstmStandard" };
            ocr.ocr("./testdata/ocr/deutsch.png", options).then(body => {
                expect(body).to.have.property('id');
                expect(body).to.have.property('predictions');
                expect(body).to.have.property('processedTime');
                expect(body).to.have.property('status').to.be.equal('DONE');

                expect(body.predictions).to.be.an('array').have.lengthOf(1);

                expect(body.predictions[0]).to.match(/Stückchen/);

            }).then(done, done);
        });

    });

});
