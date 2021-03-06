"use strict";

import { expect } from "chai";
import { getLogger } from "log4js";
import { DocumentFeatureExtraction } from "../src/index";

const logger = getLogger();
logger.level = "off";

describe("document feature extraction", () => {

  const documentFeatureExtraction = new DocumentFeatureExtraction(process.env.API_KEY);

  describe("texts", () => {

    // tslint:disable-next-line:max-line-length
    const productText = "Get the clarity of 4K UHD in an old-fashioned smart TV design that's mind controllable. Ultra HD makes everything smooth and sharp. Magic power gives you instant access to your favourite content and the movie night is just a smile away."; // note: is this an adjusted description for a Smart TV

    it("should detect features", (done) => {

      documentFeatureExtraction.inferenceSync(null, productText).then((body) => {
        logger.debug("texts", JSON.stringify(body, null, "  "));

        expect(body).to.have.property("_id");
        expect(body).to.have.property("doc_vectors").to.be.an("array").with.length(1);
        expect(body).to.have.property("processed_time");
        expect(body).to.have.property("request");
        expect(body).to.have.property("status").to.be.equal("DONE");
        expect(body).to.have.property("tenantName");

        expect(body.doc_vectors[0]).to.have.property("embedding").to.be.an("array").with.length(200).is.eql(embedding);
        expect(body.doc_vectors[0]).to.have.property("id").to.be.equal("0");

      }).then(done, done);
    });

  });

  describe("files", () => {

    it("should detect features", (done) => {

      documentFeatureExtraction.inferenceSync("./testdata/product_text.zip", null).then((body) => {
        logger.debug("files", JSON.stringify(body, null, "  "));

        expect(body).to.have.property("_id");
        expect(body).to.have.property("doc_vectors").to.be.an("array").with.length(1);
        expect(body).to.have.property("processed_time");
        expect(body).to.have.property("request");
        expect(body).to.have.property("status").to.be.equal("DONE");
        expect(body).to.have.property("tenantName");

        expect(body.doc_vectors[0]).to.have.property("embedding").to.be.an("array").with.length(200).is.eql(embedding);
        expect(body.doc_vectors[0]).to.have.property("id").to.be.equal("product_text.txt");

      }).then(done, done);
    });

  });

  describe("error coverage", () => {

    it("should return a file not found error", (done) => {
      documentFeatureExtraction.inferenceSync("file_does_not_exist", null).then(
        () => { expect.fail(); },
        (err) => {
          expect(err).to.have.property("errno").to.be.equal(-2);
          expect(err).to.have.property("code").to.be.equal("ENOENT");
        }).then(done, done);
    });

    const documentFeatureExtractionErr = new DocumentFeatureExtraction(
      process.env.API_KEY,
      "http://wrong.url");

    it("should return url not found error", (done) => {
      documentFeatureExtractionErr.inferenceSync("./testdata/product_text.zip", null).then(
        () => { expect.fail(); },
        (err) => {
          expect(err).to.have.property("errno");
          expect(err).to.have.property("code");
        }).then(done, done);
    });

  });

  // tslint:disable:object-literal-key-quotes
  // tslint:disable:max-line-length
  // tslint:disable:trailing-comma

  const embedding = [
    0.1563027948141098,
    0.004084547515958548,
    -0.005777653772383928,
    0.009149164892733097,
    0.03570328280329704,
    -0.09921177476644516,
    -0.06896749883890152,
    -0.03455333784222603,
    -0.02858857624232769,
    0.015098370611667633,
    0.024087632074952126,
    0.001816858653910458,
    0.01574016734957695,
    0.04805927351117134,
    -0.027064397931098938,
    -0.02502383291721344,
    0.012812999077141285,
    0.0032450205180794,
    -0.012425006367266178,
    -0.010645980946719646,
    0.02709188126027584,
    0.015912363305687904,
    0.012724836356937885,
    0.006189191713929176,
    -0.01519782841205597,
    0.014633030630648136,
    0.004283261951059103,
    0.034765664488077164,
    -0.015757812187075615,
    -0.018327591940760612,
    -0.0021065576002001762,
    -0.009063280187547207,
    -0.006436025258153677,
    -0.13376687467098236,
    -0.0185695830732584,
    0.0033094286918640137,
    0.015293200500309467,
    0.0008454415947198868,
    0.03828882426023483,
    0.00798563938587904,
    -0.004098410252481699,
    0.021449411287903786,
    0.0012361177941784263,
    -0.11137530207633972,
    -0.010874807834625244,
    0.010943149216473103,
    0.008151081390678883,
    0.005024888087064028,
    0.019870111718773842,
    0.015708616003394127,
    0.07452458888292313,
    0.00585906719788909,
    0.0005723838112317026,
    -0.00004249640551279299,
    0.026674197986721992,
    -0.06107286736369133,
    -0.01710650511085987,
    -0.012266683392226696,
    0.013437353074550629,
    0.001944535062648356,
    0.006228406447917223,
    0.018469344824552536,
    -0.025528205558657646,
    0.006558106746524572,
    0.004482510965317488,
    -0.003041947027668357,
    -0.020759571343660355,
    0.020301837474107742,
    -0.006875662598758936,
    0.02605374902486801,
    -0.020015357062220573,
    -0.017711618915200233,
    -0.03438418731093407,
    0.012597004882991314,
    -0.024800213053822517,
    -0.0032539640087634325,
    0.00133751321118325,
    -0.009130541235208511,
    0.015609660185873508,
    0.03048607148230076,
    -0.01084921509027481,
    0.0008370990981347859,
    -0.0007931040599942207,
    0.0032144312281161547,
    -0.009631823748350143,
    0.07678777724504471,
    0.0009033828973770142,
    -0.0321805477142334,
    0.000402071833377704,
    -0.024330632761120796,
    -0.003773770295083523,
    0.008560541085898876,
    -0.009376601316034794,
    0.011618970893323421,
    0.01791496016085148,
    -0.0022469384130090475,
    -0.014322197996079922,
    -0.02553687058389187,
    -0.0028883854392915964,
    0.017995191738009453,
    0.009065290912985802,
    -0.017181500792503357,
    -0.0222613662481308,
    -0.0035840540658682585,
    -0.026963835582137108,
    -0.006519498769193888,
    0.01788865588605404,
    -0.0015066489577293396,
    0.0005681547336280346,
    0.027362138032913208,
    -0.0171990804374218,
    -0.047815438359975815,
    -0.02555651031434536,
    -0.021097542718052864,
    -0.02159871719777584,
    -0.12988008558750153,
    -0.0017426187405362725,
    -0.011661644093692303,
    0.003714105114340782,
    -0.0027602603659033775,
    0.011594589799642563,
    0.0032542196568101645,
    -0.04870453476905823,
    0.007324253674596548,
    -0.00924401544034481,
    0.021753257140517235,
    -0.03019641898572445,
    0.02306082285940647,
    -0.02230432815849781,
    -0.018802504986524582,
    -0.0900970920920372,
    0.0056821140460669994,
    -0.01710645668208599,
    -0.0031763326842337847,
    0.01211500447243452,
    0.004107102286070585,
    0.011205379851162434,
    0.0234754029661417,
    0.017920320853590965,
    0.020561549812555313,
    -0.002701162127777934,
    -0.021135373041033745,
    0.013536489568650723,
    0.009589903987944126,
    -0.02924206107854843,
    0.013548474758863449,
    0.0004529207944869995,
    0.02178136073052883,
    -0.01168330293148756,
    -0.003070464124903083,
    0.006484435871243477,
    0.039974842220544815,
    0.021267838776111603,
    -0.013340834528207779,
    0.014877263456583023,
    -0.023340003564953804,
    -0.13499444723129272,
    0.023981070145964622,
    0.022604187950491905,
    0.006308371666818857,
    0.02431616187095642,
    -0.005545180756598711,
    -0.006641936954110861,
    -0.00037025209167040884,
    -0.004036781843751669,
    0.0026578211691230536,
    0.013576396740972996,
    0.005645608063787222,
    0.019361553713679314,
    -0.003220219165086746,
    -0.09123831242322922,
    -0.016775090247392654,
    -0.1448206752538681,
    0.00303764664568007,
    0.0024089098442345858,
    0.016899313777685165,
    0.005837520118802786,
    0.017469393089413643,
    -0.024495692923665047,
    0.005023133009672165,
    -0.025369593873620033,
    -0.0068284389562904835,
    -0.02249719761312008,
    -0.009385954588651657,
    -0.01834133453667164,
    0.003741370514035225,
    -0.02198861353099346,
    0.009442640468478203,
    0.02006695233285427,
    0.07722540199756622,
    0.0030175254214555025,
    0.038659512996673584,
    -0.03054989129304886,
    0.0011433534091338515,
    -0.01726165972650051,
    0.0017410516738891602,
    0.0011860392987728119,
    -0.012900575995445251,
    0.027287742123007774,
    -0.004041033796966076
  ];

});
