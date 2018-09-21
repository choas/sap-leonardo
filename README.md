# SAP Leonardo Machine Learning Foundation - Functional Services

npm module for SAP Leonardo Machine Learning Foundation - Functional Services

"SAP Leonardo Machine Learning foundation provides readily consumable pre-trained models, as well as customizable models." ---- https://api.sap.com/package/SAPLeonardoMLFunctionalServices

[![Build Status](https://api.travis-ci.org/choas/sap-leonardo.svg?branch=master)](https://travis-ci.org/choas/sap-leonardo)
[![Dependency status](https://david-dm.org/choas/sap-leonardo/status.svg)](https://david-dm.org/choas/sap-leonardo)
[![devDependencies Status](https://david-dm.org/choas/sap-leonardo/dev-status.svg)](https://david-dm.org/choas/sap-leonardo?type=dev)
[![Known Vulnerabilities](https://snyk.io/test/github/choas/sap-leonardo/badge.svg?targetFile=package.json)](https://snyk.io/test/github/choas/sap-leonardo?targetFile=package.json)


## Usage

Sign up (for free) at [SAP API Business Hub](https://api.sap.com/).

```sh
npm install sap-leonardo
```

```javascript
var leonardo = require('sap-leonardo');

var imageclassification = new leonardo.Imageclassification("apiKey3x4mpleUs3y0ur0wnKey112233");

imageclassification.classification("./elephant-114543_640.jpg")
.then(body => {
    console.log(JSON.stringify(body, null, "  "))
})
```

## Implemented Services

- [Inference Service for Customizable Image Classification](https://api.sap.com/api/image_classification_api/resource)
- [Inference Service for Optical Character Recognition (OCR)](https://api.sap.com/api/ocr_api/resource)
- [Inference Service for Machine Translation](https://api.sap.com/api/translation_api/resource)
- [Inference Service for Language Detection](https://api.sap.com/api/language_detection_api/resource)
- [Inference Service for Face Detection](https://api.sap.com/api/face_detection_api/resource)
- [Inference Service for Human Detection](https://api.sap.com/api/human_detection_api/resource)


## Build

```sh
npm run build
```


## Test

Define your API Key:

```sh
export API_KEY="apiKey3x4mpleUs3y0ur0wnKey112233"
```

Install all dependencies:
```sh
npm install
```

To run the tests:
```sh
npm test
```

## Image Sources

- [testdata/elephant-114543_*.jpg](https://pixabay.com/en/elephant-african-bush-elephant-114543/)
- [testdata/ocr/english.png](https://help.sap.com/viewer/b04a8fe9c04745b98ad8652ccd5d636f/1.0/en-US/3fa18aca0e35421394b620327875f04a.html) (Screenshot)
- [testdata/ocr/deutsch.png](http://gutenberg.spiegel.de/buch/-6248/69) (Screenshot)
- [testdata/man-3365368_640.jpg](https://pixabay.com/en/man-woman-group-teamwork-3365368/)

## Licenseq

Copyright 2018 Lars Gregori

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.