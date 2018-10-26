"use strict";

import { expect } from "chai";
import { LanguageDetection } from "../src/index";

describe("language detection", () => {

  const languageDetection = new LanguageDetection(process.env.API_KEY);

  describe("detect the language", () => {

    const textEnglish = "This service translates text from a source language into several target languages.";
    const textDeutsch = "Dieser Service übersetzt Text aus einer Quellsprache in mehrere Zielsprachen.";
    const textEspañol = "Este servicio convierte texto de un idioma fuente en constios idiomas de destino.";

    it("should detect English", (done) => {

      languageDetection.language(textEnglish).then((body) => {
        expect(body).to.have.property("langCode").to.be.equal("en");
        expect(body).to.have.property("confidence").to.be.equal(1);
        expect(body).to.have.property("langStr").to.be.equal("English");
      }).then(done, done);
    });

    it("should detect German", (done) => {

      languageDetection.language(textDeutsch).then((body) => {
        expect(body).to.have.property("langCode").to.be.equal("de");
        expect(body).to.have.property("confidence").to.be.equal(1);
        expect(body).to.have.property("langStr").to.be.equal("German");
      }).then(done, done);
    });

    it("should detect Spanish", (done) => {

      languageDetection.language(textEspañol).then((body) => {
        expect(body).to.have.property("langCode").to.be.equal("es");
        expect(body).to.have.property("confidence").to.be.equal(1);
        expect(body).to.have.property("langStr").to.be.equal("Spanish");
      }).then(done, done);
    });

  });

  describe("provide version", () => {

    it("should provide version", (done) => {
      languageDetection.version().then((body) => {
        expect(body).to.have.property("version").to.be.equal("1.0-SNAPSHOT");
      }).then(done, done);
    });
  });

  describe("error coverage", () => {

    const languageDetectionErr = new LanguageDetection(
      process.env.API_KEY,
      "http://localhost:11111");

    it("should return connection refused error", (done) => {
      languageDetectionErr.language("").then(
        (body) => { newFunction(); },
        (err) => {
          expect(err).to.have.property("errno").to.be.equal("ECONNREFUSED");
          expect(err).to.have.property("code").to.be.equal("ECONNREFUSED");
        }).then(done, done);
    });

    it("should return connection refused (version) error", (done) => {
      languageDetectionErr.version().then(
        (body) => { newFunction_1(); },
        (err) => {
          expect(err).to.have.property("errno").to.be.equal("ECONNREFUSED");
          expect(err).to.have.property("code").to.be.equal("ECONNREFUSED");
        }).then(done, done);
    });

  });

});

function newFunction_1() {
  expect.fail();
}

function newFunction() {
  expect.fail();
}
