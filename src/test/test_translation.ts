"use strict";

import { expect } from 'chai';
import { Translation, TranslationRequest } from "../index";

describe('translation', () => {

  var translation = new Translation(process.env.API_KEY);

  describe('translate text', () => {

    const text_english = "This service translates text from a source language into several target languages."
    const text_deutsch = "Dieser Service übersetzt Text aus einer Quellsprache in mehrere Zielsprachen."
    const text_español = "Este servicio convierte texto de un idioma fuente en varios idiomas de destino."

    it('should translate English to German', (done) => {

      let request: TranslationRequest = {
        sourceLanguage: "en",
        targetLanguages: ["de"],
        units: [
          {
            value: text_english,
            key: "TEXT_ENGLISH"
          }
        ]
      }

      translation.translation(request).then(body => {

        expect(body).to.have.property('units').to.be.an('array').have.lengthOf(1);

        expect(body.units[0]).to.have.property('value').to.be.equal(text_english);

        expect(body.units[0]).to.have.property('translations').to.be.an('array').have.lengthOf(1);
        expect(body.units[0].translations[0]).to.have.property('language').to.be.equal('de');
        expect(body.units[0].translations[0]).to.have.property('value').to.be.equal(text_deutsch);
      }).then(done, done);
    });


    it('should translate German to English', (done) => {

      let body: TranslationRequest = {
        sourceLanguage: "de",
        targetLanguages: ["en"],
        units: [
          {
            value: text_deutsch,
            key: "TEXT_DEUTSCH"
          }
        ]
      }

      translation.translation(body).then(body => {

        expect(body).to.have.property('units').to.be.an('array').have.lengthOf(1);

        expect(body.units[0]).to.have.property('value').to.be.equal(text_deutsch);

        expect(body.units[0]).to.have.property('translations').to.be.an('array').have.lengthOf(1);
        expect(body.units[0].translations[0]).to.have.property('language').to.be.equal('en');
        expect(body.units[0].translations[0]).to.have.property('value').to.be.equal(text_english);
      }).then(done, done);
    });


    it('should translate English to German and Spanish', (done) => {

      let body: TranslationRequest = {
        sourceLanguage: "en",
        targetLanguages: ["de", "es"],
        units: [
          {
            value: text_english,
            key: "TEXT_ENGLISH"
          }
        ]
      }

      translation.translation(body).then(body => {

        expect(body).to.have.property('units').to.be.an('array').have.lengthOf(1);

        expect(body.units[0]).to.have.property('value').to.be.equal(text_english);

        expect(body.units[0]).to.have.property('translations').to.be.an('array').have.lengthOf(2);
        expect(body.units[0].translations[0]).to.have.property('language').to.be.equal('de');
        expect(body.units[0].translations[0]).to.have.property('value').to.be.equal(text_deutsch);
        expect(body.units[0].translations[1]).to.have.property('language').to.be.equal('es');
        expect(body.units[0].translations[1]).to.have.property('value').to.be.equal(text_español);
      }).then(done, done);
    });

    it('should translate Spanish to English, but Spanish to German is not available', (done) => {

      let body: TranslationRequest = {
        sourceLanguage: "es",
        targetLanguages: ["en", "de"],
        units: [
          {
            value: text_español,
            key: "TEXT_ESPAÑOL"
          }
        ]
      }

      translation.translation(body).then(body => {

        expect(body).to.have.property('units').to.be.an('array').have.lengthOf(1);

        expect(body.units[0]).to.have.property('value').to.be.equal(text_español);

        expect(body.units[0]).to.have.property('translations').to.be.an('array').have.lengthOf(2);
        expect(body.units[0].translations[0]).to.have.property('language').to.be.equal('en');
        expect(body.units[0].translations[0]).to.have.property('value').to.be.not.null;
        expect(body.units[0].translations[1]).to.have.property('language').to.be.equal('de');
        expect(body.units[0].translations[1]).to.have.property('value').to.be.null;
      }).then(done, done);
    });
  });

});
