/**
 * FormsStrategist.test.ts
 *
 * Unit-tests for:
 *  - Symmetry orders (29,33,36,40,46,50,53,80) → return "symmetry"
 *  - Nose orders (69-75) → return the correct form component name
 *  - Default order (0) → return MainStyleForm.name
 *  - Order ceiling (93) → return ScarProminenceForm.name
 *  - Out-of-range orders → return ""
 */

// ── Helper: create a mock ES module whose default export is a named function ──
function mockFormModule(name: string) {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const fn = { [name]: function () {} }[name];
  return { __esModule: true, default: fn };
}

// ── Mock every transitive dependency so ts-jest never compiles JSX ──
jest.mock("../../lib/data/opts", () => ({
  imgBasePath: "/imgs",
  FORMS_OPTS: {},
}));
jest.mock("../../components/forms/MainStyleForm", () =>
  mockFormModule("MainStyleForm"),
);
jest.mock("../../components/forms/GenderForm", () =>
  mockFormModule("GenderForm"),
);
jest.mock("../../components/forms/BodyTypeMuscleForm", () =>
  mockFormModule("BodyTypeMuscleForm"),
);
jest.mock("../../components/forms/HeightForm", () =>
  mockFormModule("HeightForm"),
);
jest.mock("../../components/forms/BodyFatForm", () =>
  mockFormModule("BodyFatForm"),
);
jest.mock("../../components/forms/hair/HairTextureForm", () =>
  mockFormModule("HairTextureForm"),
);
jest.mock("../../components/forms/hair/HairBangDensityForm", () =>
  mockFormModule("HairBangDensityForm"),
);
jest.mock("../../components/forms/hair/HairBangLengthForm", () =>
  mockFormModule("HairBangLengthForm"),
);
jest.mock("../../components/forms/hair/HairBangShapeForm", () =>
  mockFormModule("HairBangShapeForm"),
);
jest.mock("../../components/forms/hair/HairTidinessForm", () =>
  mockFormModule("HairTidinessForm"),
);
jest.mock("../../components/forms/hair/HairLengthForm", () =>
  mockFormModule("HairLengthForm"),
);
jest.mock(
  "../../components/forms/head/forehead/ForeheadHairLineHeightForm",
  () => mockFormModule("ForeheadHairlineHeightForm"),
);
jest.mock(
  "../../components/forms/head/forehead/ForeheadHairlineRecidingForm",
  () => mockFormModule("ForeheadHairlineRecidingForm"),
);
jest.mock("../../components/forms/head/forehead/ForeheadHeightForm", () =>
  mockFormModule("ForeheadHeightForm"),
);
jest.mock(
  "../../components/forms/head/forehead/ForeheadHairlineShapeForm",
  () => mockFormModule("ForeheadHairlineShapeForm"),
);
jest.mock("../../components/forms/head/eye/brow/EyebrowArchAngleForm", () =>
  mockFormModule("EyebrowArchAngleForm"),
);
jest.mock("../../components/forms/head/eye/brow/EyebrowDensityForm", () =>
  mockFormModule("EyebrowDensityForm"),
);
jest.mock(
  "../../components/forms/head/eye/brow/EyebrowGrowthDirectionForm",
  () => mockFormModule("EyebrowGrowthDirectionForm"),
);
jest.mock("../../components/forms/head/eye/brow/EyebrowGrowthPatternForm", () =>
  mockFormModule("EyebrowGrowthPatternForm"),
);
jest.mock("../../components/forms/head/eye/brow/EyebrowArchHeightForm", () =>
  mockFormModule("EyebrowArchHeightForm"),
);
jest.mock("../../components/forms/head/eye/brow/EyebrowArchDistanceForm", () =>
  mockFormModule("EyebrowArchDistanceForm"),
);
jest.mock("../../components/forms/head/eye/brow/EyebrowHeightForm", () =>
  mockFormModule("EyebrowHeightForm"),
);
jest.mock("../../components/forms/head/eye/brow/EyebrowLengthForm", () =>
  mockFormModule("EyebrowLengthForm"),
);
jest.mock("../../components/forms/head/eye/brow/EyebrowTextureForm", () =>
  mockFormModule("EyebrowTextureForm"),
);
jest.mock("../../components/forms/head/eye/brow/EyebrowThicknessForm", () =>
  mockFormModule("EyebrowThicknessForm"),
);
jest.mock("../../components/forms/head/eye/brow/EyebrowUnibrowForm", () =>
  mockFormModule("EyebrowUnibrowForm"),
);
jest.mock("../../components/forms/head/eye/brow/EyebrowTrimmingForm", () =>
  mockFormModule("EyebrowTrimmingForm"),
);
jest.mock("../../components/forms/head/eye/brow/EyebrowSlitAngleForm", () =>
  mockFormModule("EyebrowSlitAngleForm"),
);
jest.mock("../../components/forms/head/eye/brow/EyebrowSlitNumberForm", () =>
  mockFormModule("EyebrowSlitNumberForm"),
);
jest.mock("../../components/forms/head/eye/ball/EyeBallSizeForm", () =>
  mockFormModule("EyeBallSizeForm"),
);
jest.mock("../../components/forms/head/eye/ball/EyeColorForm", () =>
  mockFormModule("EyeColorForm"),
);
jest.mock("../../components/forms/head/eye/ball/IrisSizeForm", () =>
  mockFormModule("IrisSizeForm"),
);
jest.mock("../../components/forms/head/eye/ball/PupilSizeForm", () =>
  mockFormModule("PupilSizeForm"),
);
jest.mock("../../components/forms/head/eye/ball/PupilPatternForm", () =>
  mockFormModule("PupilPatternForm"),
);
jest.mock("../../components/forms/head/eye/shape/EyeFissureForm", () =>
  mockFormModule("EyeFissureForm"),
);
jest.mock("../../components/forms/head/eye/shape/EyeTiltForm", () =>
  mockFormModule("EyeTiltForm"),
);
jest.mock("../../components/forms/head/eye/shape/EyeDepthForm", () =>
  mockFormModule("EyeDepthForm"),
);
jest.mock("../../components/forms/head/eye/shape/EyeSpacingForm", () =>
  mockFormModule("EyeSpacingForm"),
);
jest.mock("../../components/forms/head/eye/shape/EyeLidCreaseNumberForm", () =>
  mockFormModule("EyeLidCreaseNumberForm"),
);
jest.mock("../../components/forms/head/eye/shape/EyeLidCreaseHeightForm", () =>
  mockFormModule("EyeLidCreaseHeightForm"),
);
jest.mock(
  "../../components/forms/head/eye/shape/EyeLidEpicanthicFoldExtensionForm",
  () => mockFormModule("EyeLidEpicanthicFoldExtensionForm"),
);
jest.mock(
  "../../components/forms/head/eye/shape/EyeLidEpicanthicFoldClassForm",
  () => mockFormModule("EyeLidEpicanthicFoldClassForm"),
);
jest.mock("../../components/forms/head/eye/shape/EyeHoodForm", () =>
  mockFormModule("EyeHoodForm"),
);
jest.mock("../../components/forms/head/eye/bag/EyeBagCountorForm", () =>
  mockFormModule("EyeBagCountorForm"),
);
jest.mock("../../components/forms/head/eye/bag/EyeBagColorForm", () =>
  mockFormModule("EyeBagColorForm"),
);
jest.mock("../../components/forms/head/eye/lash/EyeLashesDensityForm", () =>
  mockFormModule("EyeLashesDensityForm"),
);
jest.mock("../../components/forms/head/eye/lash/EyeLashesLengthForm", () =>
  mockFormModule("EyeLashesLengthForm"),
);
jest.mock("../../components/forms/head/eye/lash/EyeLashesCurlForm", () =>
  mockFormModule("EyeLashesCurlForm"),
);
jest.mock(
  "../../components/forms/head/mouth/lips/upper/UpperLipVolumeForm",
  () => mockFormModule("UpperLipVolumeForm"),
);
jest.mock(
  "../../components/forms/head/mouth/lips/upper/tubercule/LipTuberculeProminenceForm",
  () => mockFormModule("LipTuberculeProminenceForm"),
);
jest.mock(
  "../../components/forms/head/mouth/lips/upper/tubercule/LipTuberculeShapeForm",
  () => mockFormModule("LipTuberculeShapeForm"),
);
jest.mock(
  "../../components/forms/head/mouth/lips/upper/bow/CupidBowWidthForm",
  () => mockFormModule("CupidBowWidthForm"),
);
jest.mock(
  "../../components/forms/head/mouth/lips/upper/bow/CupidBowHeightForm",
  () => mockFormModule("CupidBowHeightForm"),
);
jest.mock(
  "../../components/forms/head/mouth/lips/lower/LowerLipVolumeForm",
  () => mockFormModule("LowerLipVolumeForm"),
);
jest.mock(
  "../../components/forms/head/mouth/lips/lower/LowerLipShapeForm",
  () => mockFormModule("LowerLipShapeForm"),
);
jest.mock("../../components/forms/head/mouth/lips/LipsVermillionForm", () =>
  mockFormModule("LipsVermillionForm"),
);
jest.mock("../../components/forms/head/mouth/MouthCommissureAngleForm", () =>
  mockFormModule("MouthCommissureAngleForm"),
);
jest.mock("../../components/forms/head/mouth/MouthCommissureShapeForm", () =>
  mockFormModule("MouthCommissureShapeForm"),
);
jest.mock("../../components/forms/head/mouth/MouthDimpleSizeForm", () =>
  mockFormModule("MouthDimpleSizeForm"),
);
jest.mock("../../components/forms/head/mouth/MouthDimpleShapeForm", () =>
  mockFormModule("MouthDimpleShapeForm"),
);
jest.mock("../../components/forms/skin/EthnicityForm", () =>
  mockFormModule("EthnicityForm"),
);
jest.mock("../../components/forms/skin/SkinToneForm", () =>
  mockFormModule("SkinToneForm"),
);
jest.mock("../../components/forms/skin/SkinUndertoneForm", () =>
  mockFormModule("SkinUndertoneForm"),
);
jest.mock("../../components/forms/head/nose/NoseShapeForm", () =>
  mockFormModule("NoseShapeForm"),
);
jest.mock("../../components/forms/head/nose/NoseBridgeWidthForm", () =>
  mockFormModule("NoseBridgeWidthForm"),
);
jest.mock("../../components/forms/head/nose/NoseBridgeHeightForm", () =>
  mockFormModule("NoseBridgeHeightForm"),
);
jest.mock("../../components/forms/head/nose/NoseNostrilSizeForm", () =>
  mockFormModule("NoseNostrilSizeForm"),
);
jest.mock("../../components/forms/head/nose/NoseNostrilFlareForm", () =>
  mockFormModule("NoseNostrilFlareForm"),
);
jest.mock("../../components/forms/head/nose/NoseLengthForm", () =>
  mockFormModule("NoseLengthForm"),
);
jest.mock("../../components/forms/head/nose/NoseTipAngleForm", () =>
  mockFormModule("NoseTipAngleForm"),
);
jest.mock("../../components/forms/head/ear/EarSizeForm", () =>
  mockFormModule("EarSizeForm"),
);
jest.mock("../../components/forms/head/ear/EarShapeForm", () =>
  mockFormModule("EarShapeForm"),
);
jest.mock("../../components/forms/head/ear/EarLobeForm", () =>
  mockFormModule("EarLobeForm"),
);
jest.mock("../../components/forms/head/ear/EarAngleForm", () =>
  mockFormModule("EarAngleForm"),
);
jest.mock("../../components/forms/head/ear/EarWidthForm", () =>
  mockFormModule("EarWidthForm"),
);
jest.mock("../../components/forms/head/chin/ChinProjectionForm", () =>
  mockFormModule("ChinProjectionForm"),
);
jest.mock("../../components/forms/head/chin/ChinPrognathismForm", () =>
  mockFormModule("ChinPrognathismForm"),
);
jest.mock("../../components/forms/head/chin/ChinWidthForm", () =>
  mockFormModule("ChinWidthForm"),
);
jest.mock("../../components/forms/head/chin/ChinHeightForm", () =>
  mockFormModule("ChinHeightForm"),
);
jest.mock("../../components/forms/head/chin/ChinCleftForm", () =>
  mockFormModule("ChinCleftForm"),
);
jest.mock("../../components/forms/body/modifications/TattooStyleForm", () =>
  mockFormModule("TattooStyleForm"),
);
jest.mock("../../components/forms/body/modifications/TattooPlacementForm", () =>
  mockFormModule("TattooPlacementForm"),
);
jest.mock("../../components/forms/body/modifications/TattooCoverageForm", () =>
  mockFormModule("TattooCoverageForm"),
);
jest.mock("../../components/forms/body/modifications/PiercingTypeForm", () =>
  mockFormModule("PiercingTypeForm"),
);
jest.mock("../../components/forms/body/modifications/ScarTypeForm", () =>
  mockFormModule("ScarTypeForm"),
);
jest.mock("../../components/forms/body/modifications/ScarPlacementForm", () =>
  mockFormModule("ScarPlacementForm"),
);
jest.mock("../../components/forms/body/modifications/ScarProminenceForm", () =>
  mockFormModule("ScarProminenceForm"),
);

import FormsStrategist from "../../classes/strategists/FormsStrategist";

describe("FormsStrategist", () => {
  let strategist: FormsStrategist;

  beforeEach(() => {
    strategist = new FormsStrategist();
  });

  describe("render() — symmetry orders", () => {
    const symmetryOrders = [29, 33, 36, 40, 46, 50, 53, 80];

    it.each(symmetryOrders)("order %i should return 'symmetry'", order => {
      expect(strategist.render({ order })).toBe("symmetry");
    });

    it("map() should produce correct string keys for each symmetry order", () => {
      const expected: Record<number, string> = {
        29: "eyebrow-symmetry",
        33: "iris-symmetry",
        36: "pupil-symmetry",
        40: "eyeshape-symmetry",
        46: "eyelid-symmetry",
        50: "eyebag-symmetry",
        53: "eyelash-symmetry",
        80: "ear-symmetry",
      };
      for (const [order, key] of Object.entries(expected)) {
        expect(strategist.map(Number(order))).toBe(key);
      }
    });
  });

  describe("render() — nose orders 69-75", () => {
    const noseOrders: [number, string][] = [
      [69, "NoseShapeForm"],
      [70, "NoseBridgeWidthForm"],
      [71, "NoseBridgeHeightForm"],
      [72, "NoseNostrilSizeForm"],
      [73, "NoseNostrilFlareForm"],
      [74, "NoseLengthForm"],
      [75, "NoseTipAngleForm"],
    ];

    it.each(noseOrders)("order %i should return %s", (order, expectedName) => {
      const result = strategist.render({ order });
      expect(result).toBe(expectedName);
    });
  });

  describe("render() — boundary conditions", () => {
    it("order 0 should return MainStyleForm (falsy → default)", () => {
      const result = strategist.render({ order: 0 });
      // 0 is falsy, so it hits the first guard
      expect(result).toBe("MainStyleForm");
    });

    it("order 93 should return ScarProminenceForm (max order)", () => {
      expect(strategist.render({ order: 93 })).toBe("ScarProminenceForm");
    });

    it("order 94 should return '' (beyond max)", () => {
      expect(strategist.render({ order: 94 })).toBe("");
    });

    it("order -1 should be treated as order 1 (abs)", () => {
      const resultNeg = strategist.render({ order: -1 });
      const resultPos = strategist.render({ order: 1 });
      expect(resultNeg).toBe(resultPos);
    });
  });

  describe("SYMMETRY_ORDERS static set", () => {
    it("should contain exactly 8 entries", () => {
      expect(FormsStrategist.SYMMETRY_ORDERS.size).toBe(8);
    });

    it("should match the map() domain", () => {
      for (const order of FormsStrategist.SYMMETRY_ORDERS) {
        const mapped = strategist.map(order);
        expect(typeof mapped).toBe("string");
        expect(mapped).toMatch(/-symmetry$/);
      }
    });
  });

  describe("MAX_ORDER constant", () => {
    it("should be 93", () => {
      expect(FormsStrategist.MAX_ORDER).toBe(93);
    });
  });
});
