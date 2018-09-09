"use strict";

import { expect } from 'chai';
import { Imageclassification } from "../index";

describe('imageclassification', () => {

  var imageclassification = new Imageclassification(process.env.API_KEY);

  describe('elephant', () => {
    it('should predict a tusker and an elephant', (done) => {
      imageclassification.classification("./testdata/elephant-114543_640.jpg").then(body => {

        expect(body).to.have.property('id');
        expect(body).to.have.property('predictions');
        expect(body).to.have.property('processedTime');
        expect(body).to.have.property('status').to.be.equal('DONE');
        
        expect(body.predictions).to.be.an('array').have.lengthOf(1);
        expect(body.predictions[0]).to.have.property('results');
        expect(body.predictions[0].results).to.be.an('array').have.lengthOf(5);

        let expected_results = [ 
          { label: 'tusker', score: 0.7052137851715088 },
          { label: 'African elephant, Loxodonta africana', score: 0.14608600735664368 },
          { label: 'Indian elephant, Elephas maximus', score: 0.08779436349868774 },
          { label: 'toaster', score: 0.0002799317880999297 },
          { label: 'combination lock', score: 0.0002534814993850887 }
        ];

        for(var i=0; i < 5; i++) {
          expect(body.predictions[0].results[i].label).to.be.equal(expected_results[i].label);
          expect(body.predictions[0].results[i].score).to.be.equal(expected_results[i].score);
        }
      }).then(done, done);
    });
  });

  describe('some errors', () => {
    it('should throw an error for wrong file type (text)', (done) => {
      imageclassification.classification("./LICENSE").then(body => {
        expect(body).to.have.property('error');
        expect(body.error).to.have.property('message');
        expect(body.error.message).to.be.equal("Error when uploading files:: Invalid file type");
      }).then(done,done);
    });

    it('should throw an error for zip with hierarchy', (done) => {
      imageclassification.classification("./testdata/Archive.zip").then(body => {
        expect(body).to.have.property('error');
        expect(body.error).to.have.property('message');
        expect(body.error.message).to.be.equal("Invalid request: Absolute path, or hierarchy in archive file is not allowed");
      }).then(done,done);
    });

    it('should throw an error for wrong API Key', (done) => {
      var imageclassificationWithWrongApiKey = new Imageclassification("WRONG");
      imageclassificationWithWrongApiKey.classification("./testdata/elephant-114543_640.jpg").then(body => {
        expect(body).to.have.property('fault');
        expect(body.fault).to.have.property('faultstring');
        expect(body.fault.faultstring).to.be.equal("Invalid ApiKey");
      }).then(done,done);
    });

    it('should throw an error for more than 1 megapixel', (done) => {
      imageclassification.classification("./testdata/elephant-114543_1920.jpg").then(body => {
        expect(body).to.have.property('error');
        expect(body.error).to.have.property('message');
        expect(body.error.message).to.be.equal("Invalid request: image resolution too high for elephant-114543_1920.jpg; max allowed resolution: 1.0 MegaPixels");
      }).then(done,done);
    });

  });

});
