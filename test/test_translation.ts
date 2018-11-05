"use strict";

import { expect } from "chai";
import { getLogger } from "log4js";
import { ITranslationRequest, Translation } from "../src/index";

const logger = getLogger();
logger.level = "off";

describe("translation", () => {

  const translation = new Translation(process.env.API_KEY);

  describe("translate text", () => {

    const textEnglish = "This service translates text from a source language into several target languages.";
    const textDeutsch = "Dieser Service übersetzt Text aus einer Quellsprache in mehrere Zielsprachen.";
    const textEspañol = "Este servicio traduce el texto de un idioma fuente a varios idiomas de destino.";

    it("should translate English to German", (done) => {

      const request: ITranslationRequest = {
        sourceLanguage: "en",
        targetLanguages: ["de"],
        units: [
          {
            key: "TEXT_ENGLISH",
            value: textEnglish,
          },
        ],
      };

      translation.translation(request).then((body) => {
        logger.debug("en->de", JSON.stringify(body, null, "  "));
        expect(body).to.have.property("units").to.be.an("array").have.lengthOf(1);

        expect(body.units[0]).to.have.property("value").to.be.equal(textEnglish);

        expect(body.units[0]).to.have.property("translations").to.be.an("array").have.lengthOf(1);
        expect(body.units[0].translations[0]).to.have.property("language").to.be.equal("de");
        expect(body.units[0].translations[0]).to.have.property("value").to.be.equal(textDeutsch);
      }).then(done, done);
    });

    it("should translate German to English", (done) => {

      const translationRequest: ITranslationRequest = {
        sourceLanguage: "de",
        targetLanguages: ["en"],
        units: [
          {
            key: "TEXT_DEUTSCH",
            value: textDeutsch,
          },
        ],
      };

      translation.translation(translationRequest).then((body) => {
        logger.debug("de->en", JSON.stringify(body, null, "  "));

        expect(body).to.have.property("units").to.be.an("array").have.lengthOf(1);

        expect(body.units[0]).to.have.property("value").to.be.equal(textDeutsch);

        expect(body.units[0]).to.have.property("translations").to.be.an("array").have.lengthOf(1);
        expect(body.units[0].translations[0]).to.have.property("language").to.be.equal("en");
        expect(body.units[0].translations[0]).to.have.property("value").to.be.equal(textEnglish);
      }).then(done, done);
    });

    it("should translate English to German and Spanish", (done) => {

      const translationRequest: ITranslationRequest = {
        sourceLanguage: "en",
        targetLanguages: ["de", "es"],
        units: [
          {
            key: "TEXT_ENGLISH",
            value: textEnglish,
          },
        ],
      };

      translation.translation(translationRequest).then((body) => {
        logger.debug("en->de,es", JSON.stringify(body, null, "  "));

        expect(body).to.have.property("units").to.be.an("array").have.lengthOf(1);

        expect(body.units[0]).to.have.property("value").to.be.equal(textEnglish);

        expect(body.units[0]).to.have.property("translations").to.be.an("array").have.lengthOf(2);
        expect(body.units[0].translations[0]).to.have.property("language").to.be.equal("de");
        expect(body.units[0].translations[0]).to.have.property("value").to.be.equal(textDeutsch);
        expect(body.units[0].translations[1]).to.have.property("language").to.be.equal("es");
        expect(body.units[0].translations[1]).to.have.property("value").to.be.equal(textEspañol);
      }).then(done, done);
    });

    it("should translate Spanish to English", (done) => {

      const translationRequest: ITranslationRequest = {
        sourceLanguage: "es",
        targetLanguages: ["en"], // "de" causes a 500 (see next test)
        units: [
          {
            key: "TEXT_ESPAÑOL",
            value: textEspañol,
          },
        ],
      };

      translation.translation(translationRequest).then((body) => {
        logger.debug("es->en", JSON.stringify(body, null, "  "));

        expect(body).to.have.property("units").to.be.an("array").have.lengthOf(1);

        expect(body.units[0]).to.have.property("value").to.be.equal(textEspañol);

        expect(body.units[0]).to.have.property("translations").to.be.an("array").have.lengthOf(1);
        expect(body.units[0].translations[0]).to.have.property("language").to.be.equal("en");
        // tslint:disable-next-line:no-unused-expression
        expect(body.units[0].translations[0]).to.have.property("value").to.be.not.null;
      }).then(done, done);
    });
    it("should translate Spanish to German, but this causes a server error", (done) => {

      const translationRequest: ITranslationRequest = {
        sourceLanguage: "es",
        targetLanguages: ["de"],
        units: [
          {
            key: "TEXT_ESPAÑOL",
            value: textEspañol,
          },
        ],
      };

      translation.translation(translationRequest).then((body) => {
        logger.debug("es->de", JSON.stringify(body, null, "  "));

        expect(body).to.have.property("error");
        expect(body.error).to.have.property("code").to.be.equal("InternalError");
        expect(body.error).to.have.property("status").to.be.equal(500);
      }).then(done, done);
    });
  });

  describe("error coverage", () => {

    const translationErr = new Translation(
      process.env.API_KEY,
      "http://localhost:11111");

    it("should return connection refused error", (done) => {

      const body: ITranslationRequest = {
        sourceLanguage: "es",
        targetLanguages: ["en", "de"],
        units: [
          {
            key: "TEXT_ESPAÑOL",
            value: "",
          },
        ],
      };
      translationErr.translation(body).then(
        () => { expect.fail(); },
        (err) => {
          expect(err).to.have.property("errno").to.be.equal("ECONNREFUSED");
          expect(err).to.have.property("code").to.be.equal("ECONNREFUSED");
        }).then(done, done);
    });

  });

});
