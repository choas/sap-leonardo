# SAP Leonardo Machine Learning Foundation - Functional Services

"SAP Leonardo Machine Learning foundation provides readily consumable pre-trained models, as well as customizable models." ---- https://api.sap.com/package/SAPLeonardoMLFunctionalServices



## Usage

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


## Test
First define your API Key:
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
- [testdata/elephant-114543](https://pixabay.com/en/elephant-african-bush-elephant-114543/)
- [testdata/ocr/english.png](https://help.sap.com/viewer/b04a8fe9c04745b98ad8652ccd5d636f/1.0/en-US/3fa18aca0e35421394b620327875f04a.html) (Screenshot)
- [testdata/ocr/deutsch.png](http://gutenberg.spiegel.de/buch/-6248/69) (Screenshot)


## License

Copyright 2018 Lars Gregori

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.