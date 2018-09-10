"use strict";

import { expect } from 'chai';
import { LanguageDetection } from "../index";

describe('language detection', () => {

    var languageDetection = new LanguageDetection(process.env.API_KEY);

    describe('detect the language', () => {

        const text_english = "This service translates text from a source language into several target languages."
        const text_deutsch = "Dieser Service übersetzt Text aus einer Quellsprache in mehrere Zielsprachen."
        const text_español = "Este servicio convierte texto de un idioma fuente en varios idiomas de destino."

        it('should detect English', (done) => {

            languageDetection.language(text_english).then(body => {
                expect(body).to.have.property('langCode').to.be.equal('en');
                expect(body).to.have.property('confidence').to.be.equal(1);
                expect(body).to.have.property('langStr').to.be.equal('English');
            }).then(done, done);
        });

        it('should detect German', (done) => {

            languageDetection.language(text_deutsch).then(body => {
                expect(body).to.have.property('langCode').to.be.equal('de');
                expect(body).to.have.property('confidence').to.be.equal(1);
                expect(body).to.have.property('langStr').to.be.equal('German');
            }).then(done, done);
        });

        it('should detect Spanish', (done) => {

            languageDetection.language(text_español).then(body => {
                expect(body).to.have.property('langCode').to.be.equal('es');
                expect(body).to.have.property('confidence').to.be.equal(1);
                expect(body).to.have.property('langStr').to.be.equal('Spanish');
            }).then(done, done);
        });

    });

});
