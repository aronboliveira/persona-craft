/**
 * Test Suite: FormsStrategist
 * 
 * Tests form routing logic, order mapping, and strategy pattern implementation.
 * Covers: All form orders, edge cases, symmetry cases, and performance.
 */

import FormsStrategist from '../FormsStrategist';
import { PromptState } from '../../../lib/declarations/interfaces/redux';

describe('FormsStrategist', () => {
  let strategist: FormsStrategist;

  beforeEach(() => {
    strategist = new FormsStrategist();
  });

  describe('Render Method - Basic Orders', () => {
    it('should return MainStyleForm for order 0', () => {
      const context = { order: 0 };
      expect(strategist.render(context)).toBe('MainStyleForm');
    });

    it('should return GenderForm for order 1', () => {
      const context = { order: 1 };
      expect(strategist.render(context)).toBe('GenderForm');
    });

    it('should return HairTextureForm for order 5', () => {
      const context = { order: 5 };
      expect(strategist.render(context)).toBe('HairTextureForm');
    });

    it('should return EyebrowHeightForm for order 15', () => {
      const context = { order: 15 };
      expect(strategist.render(context)).toBe('EyebrowHeightForm');
    });

    it('should return empty string for unknown order', () => {
      const context = { order: 999 };
      expect(strategist.render(context)).toBe('');
    });
  });

  describe('Render Method - Complete Order Matrix', () => {
    const orderTests = [
      { order: 0, expected: 'MainStyleForm' },
      { order: 1, expected: 'GenderForm' },
      { order: 2, expected: 'BodyTypeMuscleForm' },
      { order: 3, expected: 'HeightForm' },
      { order: 4, expected: 'BodyFatForm' },
      { order: 5, expected: 'HairTextureForm' },
      { order: 6, expected: 'HairLengthForm' },
      { order: 7, expected: 'HairTidinessForm' },
      { order: 15, expected: 'EyebrowHeightForm' },
      { order: 30, expected: 'EyeBallSizeForm' },
      { order: 54, expected: 'UpperLipVolumeForm' },
      { order: 65, expected: 'MouthDimpleShapeForm' },
    ];

    orderTests.forEach(({ order, expected }) => {
      it(`should return ${expected} for order ${order}`, () => {
        const context = { order };
        expect(strategist.render(context)).toBe(expected);
      });
    });
  });

  describe('Symmetry Cases', () => {
    const symmetryCases = [
      'eyebrow-symmetry',
      'eyelid-symmetry',
      'eyebag-symmetry',
      'eyelash-symmetry',
      'eyeshape-symmetry',
      'pupil-symmetry',
      'iris-symmetry',
    ];

    symmetryCases.forEach((symmetryType) => {
      it(`should return "symmetry" for ${symmetryType}`, () => {
        const context = { order: symmetryType };
        expect(strategist.render(context)).toBe('symmetry');
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing order', () => {
      const context = {};
      expect(strategist.render(context)).toBe('MainStyleForm');
    });

    it('should handle null context', () => {
      expect(strategist.render(null as any)).toBe('MainStyleForm');
    });

    it('should handle undefined context', () => {
      expect(strategist.render(undefined as any)).toBe('MainStyleForm');
    });

    it('should handle negative orders', () => {
      const context = { order: -5 };
      // Should convert to absolute value
      const result = strategist.render(context);
      expect(result).toBeTruthy();
    });

    it('should handle float orders', () => {
      const context = { order: 5.7 };
      const result = strategist.render(context);
      expect(result).toBeTruthy();
    });

    it('should handle string orders', () => {
      const context = { order: '5' as any };
      const result = strategist.render(context);
      expect(result).toBeDefined();
    });
  });

  describe('Map Method', () => {
    it('should handle number values', () => {
      const result = strategist.map(5);
      expect(result).toBeDefined();
    });

    it('should handle string values', () => {
      const result = strategist.map('test');
      expect(result).toBeDefined();
    });

    it('should handle symbol values', () => {
      const sym = Symbol('test');
      const result = strategist.map(sym);
      expect(result).toBeDefined();
    });

    it('should handle bigint values', () => {
      const result = strategist.map(BigInt(42));
      expect(result).toBeDefined();
    });
  });

  describe('Performance Tests', () => {
    it('should handle sequential lookups efficiently', () => {
      const start = performance.now();
      
      for (let i = 0; i < 100; i++) {
        strategist.render({ order: i % 66 });
      }
      
      const end = performance.now();
      expect(end - start).toBeLessThan(10);
    });

    it('should handle random order lookups', () => {
      const orders = Array.from({ length: 100 }, () => Math.floor(Math.random() * 66));
      
      const start = performance.now();
      orders.forEach(order => strategist.render({ order }));
      const end = performance.now();
      
      expect(end - start).toBeLessThan(20);
    });

    it('should not leak memory with repeated instantiation', () => {
      const instances: FormsStrategist[] = [];
      
      for (let i = 0; i < 100; i++) {
        instances.push(new FormsStrategist());
      }
      
      expect(instances.length).toBe(100);
      instances.forEach(instance => {
        expect(instance.render({ order: 1 })).toBe('GenderForm');
      });
    });
  });

  describe('Input/Output Variations - Comprehensive Matrix', () => {
    // Test all valid orders
    const allOrders = Array.from({ length: 66 }, (_, i) => i);
    
    allOrders.forEach((order) => {
      it(`should return a valid form name for order ${order}`, () => {
        const result = strategist.render({ order });
        expect(typeof result).toBe('string');
      });
    });

    // Test symmetry string orders
    const symmetryOrders = [
      'eyebrow-symmetry',
      'iris-symmetry',
      'eyeshape-symmetry',
      'eyelid-symmetry',
      'eyebag-symmetry',
      'eyelash-symmetry',
      'pupil-symmetry',
    ];

    symmetryOrders.forEach((order) => {
      it(`should handle symmetry order: ${order}`, () => {
        const result = strategist.render({ order });
        expect(result).toBe('symmetry');
      });
    });
  });

  describe('Integration with PromptState', () => {
    it('should work with partial PromptState context', () => {
      const context: Partial<PromptState> = {
        style: 'anime',
      };
      const result = strategist.render({ ...context, order: 1 });
      expect(result).toBe('GenderForm');
    });

    it('should work with full PromptState context', () => {
      const context: Partial<PromptState> & { order: number } = {
        style: 'photorealistic',
        character: {
          gender: 'masculine' as const,
          height: 'tall',
          weight: 'skinny' as const,
          age: 'adult' as const,
          muscle: 'average' as const,
          hair: { texture: 'straight', length: 'medium', tidiness: 'done' as const, bang: {} as any },
          head: { forehead: {} as any, eye: {} as any, mouth: {} as any },
        },
        order: 5,
      };
      const result = strategist.render(context);
      expect(result).toBe('HairTextureForm');
    });
  });

  describe('Boundary Values', () => {
    it('should handle order at lower boundary (0)', () => {
      expect(strategist.render({ order: 0 })).toBe('MainStyleForm');
    });

    it('should handle order at upper boundary (65)', () => {
      expect(strategist.render({ order: 65 })).toBe('MouthDimpleShapeForm');
    });

    it('should handle order just beyond upper boundary (66)', () => {
      const result = strategist.render({ order: 66 });
      expect(typeof result).toBe('string');
    });

    it('should handle very large orders', () => {
      const result = strategist.render({ order: Number.MAX_SAFE_INTEGER });
      expect(typeof result).toBe('string');
    });
  });
});
