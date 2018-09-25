"use strict";

import { expect } from 'chai';
import { SceneTextRecognition } from "../index";

xdescribe('SceneTextRecognition', () => {

  var sceneTextRecognition = new SceneTextRecognition(process.env.API_KEY);

  describe('scene text', () => {
    it('should return a text', (done) => {
      sceneTextRecognition.sceneTextRecognition("./testdata/ocr/english_1000.png").then(body => {

        console.log(body);

      }).then(done, done);
    });
  });

});
