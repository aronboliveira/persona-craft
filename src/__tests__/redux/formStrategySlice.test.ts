/**
 * formStrategySlice.test.ts
 *
 * Unit-tests for:
 *  - nextForm ceiling at MAX_FORM_ORDER (93)
 *  - previousForm floor at 0
 *  - setOrder clamping to [0, MAX_FORM_ORDER]
 *  - resetForm → 0
 */
import reducer, {
  nextForm,
  previousForm,
  resetForm,
  setOrder,
  MAX_FORM_ORDER,
} from "../../redux/mainStore/slices/formStrategySlice";
import type { FormState } from "../../lib/declarations/types/redux";

describe("formStrategySlice", () => {
  const initial: FormState = { order: 0 };

  describe("MAX_FORM_ORDER", () => {
    it("should be 93", () => {
      expect(MAX_FORM_ORDER).toBe(93);
    });
  });

  describe("nextForm", () => {
    it("increments order by 1 when below max", () => {
      const state = reducer({ order: 0 }, nextForm());
      expect(state.order).toBe(1);
    });

    it("increments from 92 to 93", () => {
      const state = reducer({ order: 92 }, nextForm());
      expect(state.order).toBe(93);
    });

    it("does NOT increment beyond 93", () => {
      const state = reducer({ order: 93 }, nextForm());
      expect(state.order).toBe(93);
    });

    it("stays at 93 after multiple calls at max", () => {
      let state: FormState = { order: 93 };
      for (let i = 0; i < 5; i++) {
        state = reducer(state, nextForm());
      }
      expect(state.order).toBe(93);
    });
  });

  describe("previousForm", () => {
    it("decrements order by 1", () => {
      const state = reducer({ order: 5 }, previousForm());
      expect(state.order).toBe(4);
    });

    it("floors at 0", () => {
      const state = reducer({ order: 0 }, previousForm());
      expect(state.order).toBe(0);
    });
  });

  describe("resetForm", () => {
    it("resets to 0", () => {
      const state = reducer({ order: 50 }, resetForm());
      expect(state.order).toBe(0);
    });
  });

  describe("setOrder", () => {
    it("sets order within valid range", () => {
      const state = reducer(initial, setOrder(42));
      expect(state.order).toBe(42);
    });

    it("clamps to MAX_FORM_ORDER when exceeding", () => {
      const state = reducer(initial, setOrder(999));
      expect(state.order).toBe(MAX_FORM_ORDER);
    });

    it("clamps to MAX_FORM_ORDER for 94", () => {
      const state = reducer(initial, setOrder(94));
      expect(state.order).toBe(93);
    });

    it("clamps negative values to 0", () => {
      const state = reducer(initial, setOrder(-5));
      expect(state.order).toBe(0);
    });

    it("treats 0 correctly", () => {
      const state = reducer({ order: 50 }, setOrder(0));
      expect(state.order).toBe(0);
    });
  });
});
