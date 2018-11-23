# Examples

To run the examples you have to define your API key:

```sh
export API_KEY="apiKey3x4mpleUs3y0ur0wnKey112233"
```

## Which Shoe Example

The which_shoe example is a bigger example with following steps:

1. create segmentation vectors for two shoes
2. image segmentation of a test image
3. crop this image and create the segmenation vector for it
4. find similarity scoring for all three vectors

As result the test image has a similitarity of 73% for shoe_1 and 70% for shoe_2.

To run this example you need the gm package:

```sh
npm install gm
```
