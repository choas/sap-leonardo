"use strict";

import { expect } from "chai";
import { getLogger } from "log4js";
import { SimilarityScoring } from "../src/index";

const logger = getLogger();
logger.level = "off";

describe("similarity scoring", () => {

  const similarityScoring = new SimilarityScoring(process.env.API_KEY);

  const options = JSON.stringify({ numSimilarVectors: 2 });

  describe("texts", () => {

    it("should detect similarity scores", (done) => {

      similarityScoring.similarityScoring(null, JSON.stringify(data), options).then((body) => {
        logger.debug("texts", JSON.stringify(body, null, "  "));

        expect(body).to.have.property("id");
        expect(body).to.have.property("predictions");
        expect(body).to.have.property("processedTime");
        expect(body).to.have.property("status").to.be.equal("DONE");

        expect(body.predictions).to.be.an("array").have.lengthOf(3).is.eql(predictions);

      }).then(done, done);
    });

  });

  describe("files", () => {

    it("should detect similarity scores", (done) => {

      similarityScoring.similarityScoring("./testdata/vector.zip", null, options).then((body) => {
        logger.debug("files", JSON.stringify(body, null, "  "));

        expect(body).to.have.property("id");
        expect(body).to.have.property("predictions");
        expect(body).to.have.property("processedTime");
        expect(body).to.have.property("status").to.be.equal("DONE");

        expect(body.predictions).to.be.an("array").have.lengthOf(3).is.eql(predictions);

      }).then(done, done);
    });

  });

  describe("similarity scoring with different options", () => {

    const similarityScoringWithOptions = new SimilarityScoring(process.env.API_KEY);

    describe("numSimilarVectors", () => {

      it("should detect similarity scores for 1 similar vector", (done) => {

        const optionsOne = JSON.stringify({ numSimilarVectors: 1 });

        similarityScoringWithOptions.similarityScoring(null, JSON.stringify(data), optionsOne).then((body) => {
          logger.debug("1 similar", JSON.stringify(body, null, "  "));

          expect(body).to.have.property("id");
          expect(body).to.have.property("predictions");
          expect(body).to.have.property("processedTime");
          expect(body).to.have.property("status").to.be.equal("DONE");

          expect(body.predictions).to.be.an("array").have.lengthOf(3);

          for (let i = 0; i < 3; i++) {
            expect(body.predictions[i].similarVectors[0].score).to.be.equal(predictions[i].similarVectors[0].score);
          }

        }).then(done, done);
      });

    });

    describe("algorithm", () => {

      it("should detect similarity scores for naive", (done) => {

        const optionsOne = JSON.stringify({ numSimilarVectors: 2, algorithm: "naive" });

        similarityScoringWithOptions.similarityScoring(null, JSON.stringify(data), optionsOne).then((body) => {
          logger.debug("naive", JSON.stringify(body, null, "  "));

          expect(body).to.have.property("id");
          expect(body).to.have.property("predictions");
          expect(body).to.have.property("processedTime");
          expect(body).to.have.property("status").to.be.equal("DONE");

          expect(body.predictions).to.be.an("array").have.lengthOf(3);

          // for (let i = 0; i < 3; i++) {
          //   expect(body.predictions[i].similarVectors[0].score).to.be.equal(predictions[i].similarVectors[0].score);
          // }
          expect(body.predictions).to.be.an("array").have.lengthOf(3).is.eql(predictions);

        }).then(done, done);
      });

      it("should detect similarity scores for matrix_mult", (done) => {

        const optionsOne = JSON.stringify({ numSimilarVectors: 2, algorithm: "matrix_mult" });

        similarityScoringWithOptions.similarityScoring(null, JSON.stringify(data), optionsOne).then((body) => {
          logger.debug("matrix_mult", JSON.stringify(body, null, "  "));

          expect(body).to.have.property("id");
          expect(body).to.have.property("predictions");
          expect(body).to.have.property("processedTime");
          expect(body).to.have.property("status").to.be.equal("DONE");

          expect(body.predictions).to.be.an("array").have.lengthOf(3);

          // for (let i = 0; i < 3; i++) {
          //   expect(body.predictions[i].similarVectors[0].score).to.be.equal(predictions[i].similarVectors[0].score);
          // }
          expect(body.predictions).to.be.an("array").have.lengthOf(3).is.eql(predictions);

        }).then(done, done);
      });

      it("should detect similarity scores for clustering", (done) => {

        const optionsOne = JSON.stringify({ numSimilarVectors: 2, algorithm: "clustering" });

        similarityScoringWithOptions.similarityScoring(null, JSON.stringify(data), optionsOne).then((body) => {
          logger.debug("clustering", JSON.stringify(body, null, "  "));

          expect(body).to.have.property("id");
          expect(body).to.have.property("predictions");
          expect(body).to.have.property("processedTime");
          expect(body).to.have.property("status").to.be.equal("DONE");

          expect(body.predictions).to.be.an("array").have.lengthOf(3);

          // for (let i = 0; i < 3; i++) {
          //   expect(body.predictions[i].similarVectors[0].score).to.be.equal(predictions[i].similarVectors[0].score);
          // }
          expect(body.predictions).to.be.an("array").have.lengthOf(3).is.eql(predictions);

        }).then(done, done);
      });

    });

    // algorithm - Optional. Algorithm to use for calculation, one of [“naive”, “matrix_mult”, “clustering”]

  });

  describe("error coverage", () => {

    it("should return a file not found error", (done) => {
      similarityScoringErr.similarityScoring("file_does_not_exist", null, "").then(
        () => { expect.fail(); },
        (err) => {
          expect(err).to.have.property("errno").to.be.equal(-2);
          expect(err).to.have.property("code").to.be.equal("ENOENT");
        }).then(done, done);
    });

    const similarityScoringErr = new SimilarityScoring(
      process.env.API_KEY,
      "http://wrong.url");

    it("should return url not found error", (done) => {
      similarityScoringErr.similarityScoring("./testdata/product_text.zip", null, "").then(
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
  const data = {
    "0": [
      {
        "id": "vector_0",
        "vector": [-0.10621540993452072, 0.07206636667251587, 0.0968325212597847, -0.10827995091676712, -0.07702412456274033, -0.039560046046972275, -0.040075693279504776, -0.107122041285038, 0.19833368062973022, -0.17019444704055786, 0.250935435295105, -0.07676912844181061, -0.2268873155117035, -0.03107164055109024, -0.06697331368923187, 0.16035355627536774, -0.20556031167507172, -0.1309875249862671, 0.015214803628623486, -0.023271359503269196, 0.10827542841434479, -0.04035993292927742, -0.02574278600513935, 0.1351604014635086, -0.12236853688955307, -0.41603004932403564, -0.08893930912017822, -0.0685303583741188, -0.007976576685905457, -0.044041913002729416, -0.007895808666944504, 0.06755071133375168, -0.2606855630874634, -0.0025568949058651924, -0.037712279707193375, 0.1107180044054985, -0.08908972144126892, -0.07318802177906036, 0.11219529807567596, 0.07277503609657288, -0.17555005848407745, -0.07343290001153946, -0.04064827412366867, 0.2683440148830414, 0.17438754439353943, 0.02454463578760624, 0.0268715750426054, -0.022217903286218643, 0.011709093116223812, -0.26728659868240356, -0.032939519733190536, 0.17870308458805084, 0.0855875238776207, 0.0343560129404068, 0.01181918103247881, -0.12936900556087494, 0.03201613575220108, 0.07528454810380936, -0.18980668485164642, 0.002998144133016467, 0.04415501654148102, -0.12027163803577423, -0.053201500326395035, -0.06630047410726547, 0.2778393030166626, 0.10278420150279999, -0.15070578455924988, -0.05815283954143524, 0.2149564027786255, -0.15380613505840302, -0.010481561534106731, 0.018481051549315453, -0.1044476330280304, -0.198028564453125, -0.22697198390960693, -0.0211342740803957, 0.4040183424949646, 0.15648487210273743, -0.18130570650100708, 0.011593054980039597, -0.18139111995697021, 0.02766834944486618, 0.021338598802685738, 0.05953468754887581, -0.03933148831129074, 0.07340152561664581, -0.10936808586120605, 0.03446458652615547, 0.14739350974559784, -0.00604732520878315, 0.012214506976306438, 0.26508113741874695, -0.021089542657136917, -0.03410942107439041, 0.04985862225294113, -0.044517822563648224, -0.09748299419879913, -0.04419974237680435, -0.14990971982479095, -0.08624304085969925, -0.04641774296760559, -0.0910859927535057, -0.06204972788691521, 0.09441374987363815, -0.26593372225761414, 0.18656018376350403, 0.02381153218448162, -0.060292959213256836, 0.006748354993760586, 0.004412797279655933, -0.15712721645832062, -0.0700077936053276, 0.15842406451702118, -0.25831589102745056, 0.10661741346120834, 0.21636924147605896, 0.10757569968700409, 0.1889997273683548, 0.05924331024289131, 0.03662633150815964, -0.062328580766916275, -0.11982245743274689, -0.16640207171440125, -0.06453965604305267, 0.03376687318086624, -0.05625895410776138, 0.04426893964409828, -0.03692478686571121]
      },
      {
        "id": "vector_1",
        "vector": [-0.1563834697008133, 0.0901147797703743, 0.0974714607000351, -0.15129517018795013, -0.22290082275867462, -0.0510198175907135, -0.043796323239803314, -0.05975426733493805, 0.1949709802865982, -0.15602749586105347, 0.16988196969032288, -0.0261479914188385, -0.24834895133972168, 0.05096080154180527, -0.01733499765396118, 0.18158391118049622, -0.157352015376091, -0.20477396249771118, -0.1799369603395462, -0.1306465119123459, 0.037683650851249695, 0.10614112764596939, -0.052687108516693115, 0.03466936573386192, -0.1516585350036621, -0.2964874505996704, -0.033077798783779144, -0.008917057886719704, 0.020200252532958984, -0.12940528988838196, 0.011496387422084808, 0.13688477873802185, -0.10653403401374817, 0.01299263909459114, 0.037156909704208374, 0.08040013909339905, -0.04263315722346306, -0.10397391766309738, 0.19695591926574707, -0.03167206794023514, -0.24920102953910828, -0.06545299291610718, 0.07160135358572006, 0.20813223719596863, 0.23911140859127045, 0.02486491948366165, 0.06159807741641998, -0.08230528235435486, 0.12278518825769424, -0.31622135639190674, 0.047528013586997986, 0.17659254372119904, 0.015500031411647797, 0.08423800021409988, 0.13082945346832275, -0.20479150116443634, -0.052299775183200836, 0.17549648880958557, -0.12772923707962036, 0.037337496876716614, 0.06868654489517212, -0.20109620690345764, -0.07122695446014404, -0.17324189841747284, 0.2573342025279999, 0.12161733210086823, -0.13997329771518707, -0.1738429218530655, 0.28154778480529785, -0.14253586530685425, -0.195256769657135, 0.03931787982583046, -0.10786943137645721, -0.08367454260587692, -0.31363165378570557, -0.048754412680864334, 0.31571269035339355, 0.1356622874736786, -0.15601229667663574, 0.06251978129148483, -0.06113941967487335, 0.011391819454729557, -0.053641919046640396, 0.09128722548484802, -0.09843279421329498, -0.03888332471251488, -0.07809731364250183, 0.015550196170806885, 0.2513585388660431, 0.008896851912140846, -0.010918821208178997, 0.23444309830665588, 0.04894467443227768, -0.012338181026279926, 0.007255282253026962, 0.07219140976667404, -0.11045947670936584, -0.07942806929349899, -0.08553911745548248, -0.01677076518535614, 0.08194112032651901, -0.06222398206591606, -0.012576239183545113, 0.19146728515625, -0.15749986469745636, 0.22669059038162231, -0.09506124258041382, 0.06232914328575134, -0.07863890379667282, -0.017732109874486923, -0.008399705402553082, 0.014852423220872879, 0.15571530163288116, -0.21949046850204468, 0.1709415763616562, 0.17277832329273224, 0.039532262831926346, 0.15449969470500946, 0.05722709372639656, 0.06685556471347809, 0.007031907327473164, -0.03366909921169281, -0.20947763323783875, -0.12529604136943817, 0.05099228397011757, -0.03980535641312599, 0.023436246439814568, 0.17932304739952087]
      },
      {
        "id": "vector_2",
        "vector": [-0.08650977164506912, 0.07085622102022171, 0.052683211863040924, -0.09286637604236603, -0.14559884369373322, 0.0713762566447258, -0.05282290279865265, -0.09891833364963531, 0.10440520942211151, -0.10099997371435165, 0.22916251420974731, -0.026565104722976685, -0.33513134717941284, -0.07436525821685791, 0.05662938207387924, 0.0761096179485321, -0.19828052818775177, -0.1443624645471573, -0.09512056410312653, -0.16088472306728363, 0.041678715497255325, 0.05252432823181152, -0.015873150900006294, -0.024433812126517296, -0.17646574974060059, -0.2749975919723511, -0.0747423991560936, -0.0381195992231369, 0.06483320891857147, -0.15098035335540771, 0.04035470634698868, 0.026379337534308434, -0.10763727873563766, 0.0064278095960617065, -0.014815719798207283, 0.09503472596406937, -0.0784306526184082, -0.10015394538640976, 0.1764764040708542, 0.014239942654967308, -0.13511715829372406, -0.016747653484344482, 0.020821355283260345, 0.24620869755744934, 0.2110178917646408, 0.0404348149895668, 0.012457707896828651, -0.030677594244480133, 0.13600370287895203, -0.2370249181985855, 0.03784577548503876, 0.2380952686071396, 0.18680502474308014, 0.046945054084062576, 0.1551578789949417, -0.11469252407550812, -0.010978395119309425, 0.20231893658638, -0.07545966655015945, 0.07778044044971466, 0.05773622542619705, -0.0960526168346405, 0.07814896106719971, -0.10629592090845108, 0.2044069766998291, -0.006793506909161806, -0.11812756210565567, -0.06366263329982758, 0.16966339945793152, -0.07041749358177185, -0.20287492871284485, 0.07278693467378616, -0.11814834177494049, -0.1506301611661911, -0.23748323321342468, -0.015310319140553474, 0.3050692677497864, 0.09177341312170029, -0.23576201498508453, -0.011502338573336601, -0.05231422185897827, -0.05153672397136688, 0.05162392556667328, 0.058391671627759933, -0.08869538456201553, -0.07844634354114532, -0.14260904490947723, -0.03308674693107605, 0.27254801988601685, -0.03288280591368675, 0.016215572133660316, 0.25934913754463196, 0.05160638689994812, 0.00868687592446804, 0.06525813043117523, 0.014081742614507675, -0.09117937088012695, -0.02711384743452072, -0.04871188849210739, -0.05726354569196701, 0.07286153733730316, -0.2010827660560608, -0.032602738589048386, 0.08733252435922623, -0.1912733018398285, 0.2236088663339615, 0.009243135340511799, 0.04816208779811859, -0.024201733991503716, -0.07472342997789383, -0.06593650579452515, 0.06356324255466461, 0.240446999669075, -0.3211471140384674, 0.15384507179260254, 0.223332017660141, 0.0034189620055258274, 0.11238893121480942, 0.05959437042474747, 0.07243552803993225, -0.0520513541996479, -0.05071715638041496, -0.15392981469631195, -0.15037810802459717, -0.010872210375964642, -0.06644746661186218, 0.0033938102424144745, 0.08403672277927399]
      }
    ]
  };

  const predictions = [
    {
      "id": "vector_0",
      "similarVectors": [
        {
          "id": "vector_2",
          "score": 0.8427464220492982
        },
        {
          "id": "vector_1",
          "score": 0.842657500527098
        }
      ]
    },
    {
      "id": "vector_1",
      "similarVectors": [
        {
          "id": "vector_2",
          "score": 0.8939551846030783
        },
        {
          "id": "vector_0",
          "score": 0.842657500527098
        }
      ]
    },
    {
      "id": "vector_2",
      "similarVectors": [
        {
          "id": "vector_1",
          "score": 0.8939551846030783
        },
        {
          "id": "vector_0",
          "score": 0.8427464220492982
        }
      ]
    }
  ];

});
