# SAP Leonardo Machine Learning Foundation - Functional Services

[NPM module](https://www.npmjs.com/package/sap-leonardo) for SAP Leonardo Machine Learning Foundation - Functional Services

"SAP Leonardo Machine Learning foundation provides readily consumable pre-trained models, as well as customizable models." ---- https://api.sap.com/package/SAPLeonardoMLFunctionalServices

[![Build Status](https://api.travis-ci.org/choas/sap-leonardo.svg?branch=master)](https://travis-ci.org/choas/sap-leonardo)
[![Dependency status](https://david-dm.org/choas/sap-leonardo/status.svg)](https://david-dm.org/choas/sap-leonardo)
[![devDependencies Status](https://david-dm.org/choas/sap-leonardo/dev-status.svg)](https://david-dm.org/choas/sap-leonardo?type=dev)
[![Known Vulnerabilities](https://snyk.io/test/github/choas/sap-leonardo/badge.svg?targetFile=package.json)](https://snyk.io/test/github/choas/sap-leonardo?targetFile=package.json)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fchoas%2Fsap-leonardo.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fchoas%2Fsap-leonardo?ref=badge_shield)
[![Coverage Status](https://coveralls.io/repos/github/choas/sap-leonardo/badge.svg?branch=master)](https://coveralls.io/github/choas/sap-leonardo?branch=master)


## Usage

Install the npm package:
```sh
npm install sap-leonardo
```

Sign up a free account at [SAP API Business Hub](https://api.sap.com/) and get your API key.

Use e.g. the image classification service with your API key:
```javascript
const leonardo = require('sap-leonardo');

var imageclassification = new leonardo.Imageclassification("apiKey");
imageclassification.classification("./elephant-114543_640.jpg")
  .then((body) => {
    var firstResult = body.predictions[0].results[0];
    console.log("result:", firstResult.label, firstResult.score);
    // result: tusker 0.7052137851715088
  })
  .catch((err) => { console.error(err); });
```
More examples can be found in the examples and src/test folder.


## Implemented Services

Following services are implemented (unordered; the way I've added them):




- [Inference Service For Customizable Image Feature Extraction](https://api.sap.com/api/img_feature_extraction_api/resource)
- [Product Text Classification API](https://api.sap.com/api/product_text_classification_api/resource)
- [Inference Service for Scene Text Recognition](https://api.sap.com/api/scene_text_recognition_api/resource)
- [Inference Service for Document Feature Extraction](https://api.sap.com/api/document_feature_extraction_api/resource)
- [Inference Service for Multi-Instance Image Segmentation](https://api.sap.com/api/instance_segmentor_api/resource)

- ~~Inference Service for Face Feature Extraction~~

- [Inference Service for Machine Translation](https://api.sap.com/api/translation_api/resource)

- ~~Training Service for Customizable Object Detection~~

- [Inference Service for Similarity Scoring](https://api.sap.com/api/similarity_scoring_api/resource)
- [Inference Service for Customizable Image Classification](https://api.sap.com/api/image_classification_api/resource)

- ~~Time Series Changepoint Detection API~~
- ~~Product Image Classification API~~
- ~~Training Service for Customizable Similarity Search~~
- ~~Inference Service for Customizable Similarity Search~~
- ~~Inference Service for Topic Detection~~

- [Inference Service for Human Detection](https://api.sap.com/api/human_detection_api/resource)
- [Inference Service for Face Detection](https://api.sap.com/api/face_detection_api/resource)
- [Inference Service for Language Detection](https://api.sap.com/api/language_detection_api/resource)

- ~~Training Service for Customizable Text Classification~~
- ~~Inference Service for Customizable Object Detection~~

- [Inference Service for Optical Character Recognition (OCR)](https://api.sap.com/api/ocr_api/resource)

- ~~Inference Service for Customizable Text Classification~~
- ~~Training Service For Customizable Image Classification and Feature Extraction~~


## Build

```sh
npm run build
```


## Test

define your API Key:

```sh
export API_KEY="apiKey3x4mpleUs3y0ur0wnKey112233"
```

install all dependencies:
```sh
npm install
```

run the tests:
```sh
npm test
```

## Blog Posts
- [NPM Module for SAP Leonardo Machine Learning](https://blogs.sap.com/2018/10/04/npm-module-for-sap-leonardo-machine-learning/)


## Image Sources

- [testdata/elephant-114543_*.jpg](https://pixabay.com/en/elephant-african-bush-elephant-114543/)
- [testdata/ocr/english.png](https://help.sap.com/viewer/b04a8fe9c04745b98ad8652ccd5d636f/1.0/en-US/3fa18aca0e35421394b620327875f04a.html) (Screenshot)
- [testdata/ocr/deutsch.png](http://gutenberg.spiegel.de/buch/-6248/69) (Screenshot)
- [testdata/man-3365368_640.jpg](https://pixabay.com/en/man-woman-group-teamwork-3365368/)
- [testdata/juice-1271881_640.jpg](https://pixabay.com/en/juice-health-detox-organic-1271881/)
- [testdata/stop-634941_640.jpg](https://pixabay.com/en/stop-shield-traffic-sign-road-sign-634941/)
- [testdata/chucks-153310_640.png](https://pixabay.com/en/chucks-converse-shoes-footwear-153310/)
- [hiking-shoes-3074971_640.png](https://pixabay.com/en/hiking-shoes-boots-leather-3074971/)
- [converse-2069209_640.jpg](https://pixabay.com/en/converse-shoes-grass-outdoors-2069209/)


## License

Copyright 2018 Lars Gregori

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.