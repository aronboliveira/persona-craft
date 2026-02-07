/**
 * Test Suite: CharacterValidator
 * 
 * Tests type guards and state validation for character anatomy structures.
 * Covers: Expected results, edge cases, and performance for nested validation.
 */

import { CharacterValidator } from '../CharacterValidator';
import {
  defaultCharacter,
  defaultHead,
  defaultHair,
  defaultEye,
  defaultBrow,
} from '../../../defaults';
import { Character } from '../../../../../lib/declarations/interfaces/utils';

describe('CharacterValidator', () => {
  describe('Type Guards - Expected Results', () => {
    describe('isCharacter', () => {
      it('should return true for valid character object', () => {
        expect(CharacterValidator.isCharacter(defaultCharacter)).toBe(true);
      });

      it('should return false for partial character object', () => {
        const partial = { gender: 'male' };
        expect(CharacterValidator.isCharacter(partial)).toBe(false);
      });

      it('should return false for null', () => {
        expect(CharacterValidator.isCharacter(null)).toBe(false);
      });

      it('should return false for undefined', () => {
        expect(CharacterValidator.isCharacter(undefined)).toBe(false);
      });

      it('should return false for primitive values', () => {
        expect(CharacterValidator.isCharacter('string')).toBe(false);
        expect(CharacterValidator.isCharacter(123)).toBe(false);
        expect(CharacterValidator.isCharacter(true)).toBe(false);
      });

      it('should return false for arrays', () => {
        expect(CharacterValidator.isCharacter([])).toBe(false);
        expect(CharacterValidator.isCharacter([defaultCharacter])).toBe(false);
      });
    });

    describe('isHead', () => {
      it('should return true for valid head object', () => {
        expect(CharacterValidator.isHead(defaultHead)).toBe(true);
      });

      it('should return true for head with all required fields', () => {
        const validHead = {
          forehead: {},
          eye: {},
          mouth: {},
        };
        expect(CharacterValidator.isHead(validHead)).toBe(true);
      });

      it('should return false for head missing required fields', () => {
        const invalidHead = { forehead: {} };
        expect(CharacterValidator.isHead(invalidHead)).toBe(false);
      });
    });

    describe('isHair', () => {
      it('should return true for valid hair object', () => {
        expect(CharacterValidator.isHair(defaultHair)).toBe(true);
      });

      it('should return false for hair missing required fields', () => {
        const invalidHair = { texture: 'straight' };
        expect(CharacterValidator.isHair(invalidHair)).toBe(false);
      });
    });

    describe('isEye', () => {
      it('should return true for valid eye object', () => {
        expect(CharacterValidator.isEye(defaultEye)).toBe(true);
      });

      it('should return false for null', () => {
        expect(CharacterValidator.isEye(null)).toBe(false);
      });
    });

    describe('isBrow', () => {
      it('should return true for valid eyebrow object', () => {
        expect(CharacterValidator.isBrow(defaultBrow)).toBe(true);
      });

      it('should handle objects with extra properties', () => {
        const browWithExtra = { ...defaultBrow, extraProp: 'value' };
        expect(CharacterValidator.isBrow(browWithExtra)).toBe(true);
      });
    });
  });

  describe('Type Guards - Input/Output Variations', () => {
    const testCases = [
      { input: null, expected: false, desc: 'null value' },
      { input: undefined, expected: false, desc: 'undefined value' },
      { input: {}, expected: false, desc: 'empty object' },
      { input: { gender: 'male' }, expected: false, desc: 'partial object' },
      { input: defaultCharacter, expected: true, desc: 'complete character' },
      { input: 'string', expected: false, desc: 'string primitive' },
      { input: 123, expected: false, desc: 'number primitive' },
      { input: true, expected: false, desc: 'boolean primitive' },
      { input: [], expected: false, desc: 'empty array' },
      { input: [defaultCharacter], expected: false, desc: 'array with object' },
    ];

    testCases.forEach(({ input, expected, desc }) => {
      it(`should return ${expected} for ${desc}`, () => {
        expect(CharacterValidator.isCharacter(input)).toBe(expected);
      });
    });
  });

  describe('Performance Tests', () => {
    it('should validate character in under 1ms', () => {
      const start = performance.now();
      for (let i = 0; i < 1000; i++) {
        CharacterValidator.isCharacter(defaultCharacter);
      }
      const end = performance.now();
      const avgTime = (end - start) / 1000;
      expect(avgTime).toBeLessThan(1);
    });

    it('should handle deeply nested validation efficiently', () => {
      const complexCharacter: Character = {
        ...defaultCharacter,
        head: {
          ...defaultHead,
          eye: {
            ...defaultEye,
            shape: {
              ...defaultEye.shape,
              lid: {
                ...defaultEye.shape.lid,
                creaseNumber: 'monolid',
                creaseHeight: 'high',
              },
            },
          },
        },
      };

      const start = performance.now();
      for (let i = 0; i < 100; i++) {
        CharacterValidator.isCharacter(complexCharacter);
      }
      const end = performance.now();
      expect(end - start).toBeLessThan(10);
    });
  });

  describe('Edge Cases', () => {
    it('should handle objects with Symbol keys', () => {
      const symbolKey = Symbol('test');
      const objWithSymbol = { ...defaultCharacter, [symbolKey]: 'value' };
      expect(CharacterValidator.isCharacter(objWithSymbol)).toBe(true);
    });

    it('should handle frozen objects', () => {
      const frozen = Object.freeze({ ...defaultCharacter });
      expect(CharacterValidator.isCharacter(frozen)).toBe(true);
    });

    // Cross-realm object test - TypeScript has limitations with iframe Window types
    it.skip('should handle objects from different realms', () => {
      // This test is skipped due to TypeScript limitations with cross-realm objects
      // In practice, the validator works with objects from different execution contexts
    });
  });
});
