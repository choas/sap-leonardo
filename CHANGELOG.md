# CHANGELOG

All notable changes to this project will be documented in this file.

## 0.5.9

- adjust image feature extraction for trial account
- adjust URLs to new SAP Leonardo release

## 0.5.8

- image classification service handles filenames and buffers

## 0.5.7

- rename image_classification
- more examples
- using a better product for product image classification test and example
- add log4js
- update translate service to [1810B](https://help.sap.com/viewer/2e6173bf645243bb9a88f0269250f3a2/1.0/en-US)
- adjust detection_boxes for four people at human detection test
- add topic detection test: topics should not exceed the number of documents
- more topic detection tests
- upgrade dev dependencies
- error code: (product) image classification
- adjust timeouts human detection (15sec) and result vulues
- turn off timeout at multi-instance image segmentation (normal 10sec)
- adjust language detection service

## 0.5.6

- wrong API: Product Image Classification API
- separate src and test

## 0.5.5

- Inference Service for Customizable Object Detection
- adjust timeout for ocr test

## 0.5.4

- typo in Inference Service for Topic Detection
- examples:
  - topic detection

## 0.5.3

- Inference Service for Topic Detection
- examples:
  - OCR
  - OCR (async)
  - which shoe (async)
- test timeout reduce to 10 secs (only multi-instance image segmentation needs more)

## 0.5.2

- Inference Service For Customizable Image Feature Extraction
- ImageFeatureExtraction:customizable
- test similarity scoring with algorithm test cases
- examples:
  - face feature extraction with similarity
  - face detection
  - human detection

## 0.5.1

- Inference Service for Face Feature Extraction service
- tslint and eslint
- examples:
  - mulit_instance_image_segmentation
  - similarity_scoring
  - which_shoe

## 0.5.0

- Inference Service For Customizable Image Feature Extraction

## < 0.5.0

- Inference Service for Customizable Image Classification
- Inference Service for Optical Character Recognition (OCR)
- Inference Service for Machine Translation
- Inference Service for Language Detection
- Inference Service for Face Detection
- Inference Service for Human Detection
- Product Text Classification API
- Inference Service for Multi-Instance Image Segmentation
- Inference Service for Scene Text Recognition
- Inference Service for Document Feature Extraction
- Inference Service for Similarity Scoring

[v0.5.2]: https://github.com/choas/sap-leonardo/compare/v0.5.1...v0.5.2
[v0.5.1]: https://github.com/choas/sap-leonardo/compare/v0.5.0...v0.5.1
[v0.5.0]: https://github.com/choas/sap-leonardo/compare/v0.1.9...v0.5.0
[v0.1.9]: https://github.com/choas/sap-leonardo/compare/v0.1.2...v0.1.9
