"use strict";

import { expect } from "chai";
import { getLogger } from "log4js";
import { Align, ITranslationRequest, Translation } from "../src/index";

const logger = getLogger();
logger.level = "off";

describe("translation", () => {

  const translation = new Translation(process.env.API_KEY);

  const textEnglish = "This service translates text from a source language into several target languages.";
  const textDeutsch = "Dieser Service übersetzt Text aus einer Quellsprache in mehrere Zielsprachen.";
  const textEspañol = "Este servicio traduce el texto de un idioma fuente a varios idiomas de destino.";

  describe("translate text", () => {

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
    it("should translate Spanish to German, but no language property and value is null", (done) => {

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

        expect(body).to.have.property("units").to.be.an("array").have.lengthOf(1);
        expect(body.units[0]).to.have.property("value").to.be.equal(textEspañol);
        expect(body.units[0]).to.have.property("translations").to.be.an("array").have.lengthOf(1);

        expect(body.units[0].translations[0]).not.to.have.property("language").to.be.equal("en"); // !!
        // tslint:disable-next-line:no-unused-expression
        expect(body.units[0].translations[0]).to.have.property("value").to.be.null; // !!
      }).then(done, done);
    });
  });

  xdescribe("translate inline text", () => {
    const elementBegin = "<body style=\"surprise me\">";
    const elementEnd = "</body>";
    const inlineElement = "<picture href=\"wonderful image.jpg\" />";
    const textEnglishInline = elementBegin + textEnglish + inlineElement + elementEnd;
    const textDeutschInline = elementBegin + textDeutsch + inlineElement + elementEnd;
    // const textEspañol = "Este servicio traduce el texto de un idioma fuente a varios idiomas de destino.";

    it("should translate English to German", (done) => {

      // tslint:disable:object-literal-sort-keys
      const request: ITranslationRequest = {
        sourceLanguage: "en",
        targetLanguages: ["de"],
        units: [
          {
            key: "TEXT_ENGLISH",
            value: textEnglishInline,
            inlineElements: {
              ranges: [
                {
                  id: 1,
                  begin: textEnglishInline.indexOf(">") + 1,
                  end: textEnglishInline.indexOf("<", 10) - 1,
                },
              ],
              markers: [
                {
                  id: 1,
                  position: textEnglishInline.indexOf("<img") + 1,
                  align: Align.Right,
                },
              ],
            },
          },
        ],
      };

      translation.translation(request).then((body) => {

        logger.debug("en->de", JSON.stringify(request, null, "  "));
        logger.debug("en->de", JSON.stringify(body, null, "  "));
        expect(body).to.have.property("units").to.be.an("array").have.lengthOf(1);

        expect(body.units[0]).to.have.property("value").to.be.equal(textEnglishInline);

        expect(body.units[0]).to.have.property("translations").to.be.an("array").have.lengthOf(1);
        expect(body.units[0].translations[0]).to.have.property("language").to.be.equal("de");
        expect(body.units[0].translations[0]).to.have.property("value").to.be.equal(textDeutschInline);
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
