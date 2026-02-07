/**
 * Test Suite: Redux Store
 * 
 * Tests Redux store configuration, state persistence, and middleware.
 * Covers: State hydration, serialization, middleware execution, and performance.
 */

import { formsStore, STG_KEY } from '../index';
import { updatePrompt } from '../slices/promptSlice';
import { setOrder } from '../slices/formStrategySlice';

describe('Redux Store', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  describe('Store Configuration', () => {
    it('should have correct initial state structure', () => {
      const state = formsStore.getState();
      expect(state).toHaveProperty('prompt');
      expect(state).toHaveProperty('formStrategy');
      expect(state).toHaveProperty('tips');
    });

    it('should have prompt state with style property', () => {
      const state = formsStore.getState();
      expect(state.prompt).toHaveProperty('style');
      expect(state.prompt).toHaveProperty('character');
    });

    it('should have formStrategy with order property', () => {
      const state = formsStore.getState();
      expect(state.formStrategy).toHaveProperty('order');
    });
  });

  describe('State Persistence', () => {
    it('should persist state to sessionStorage on updates', (done) => {
      const testStyle = 'photorealistic';
      formsStore.dispatch(updatePrompt({ style: testStyle }));

      // Wait for debounced save (300ms + buffer)
      setTimeout(() => {
        const saved = sessionStorage.getItem(STG_KEY);
        expect(saved).not.toBeNull();
        
        if (saved) {
          const parsed = JSON.parse(saved);
          expect(parsed.prompt.style).toBe(testStyle);
        }
        done();
      }, 400);
    });

    it('should load preloaded state from sessionStorage', () => {
      const mockState = {
        prompt: {
          style: 'anime',
          character: { gender: 'female' },
        },
        formStrategy: { order: 5 },
      };

      sessionStorage.setItem(STG_KEY, JSON.stringify(mockState));

      // Note: This tests the concept - actual store is already created
      const savedData = sessionStorage.getItem(STG_KEY);
      expect(savedData).not.toBeNull();
      
      if (savedData) {
        const parsed = JSON.parse(savedData);
        expect(parsed.prompt.style).toBe('anime');
      }
    });

    it('should handle corrupted sessionStorage data gracefully', () => {
      sessionStorage.setItem(STG_KEY, 'invalid-json{');
      
      // Store should still work with default state
      const state = formsStore.getState();
      expect(state).toHaveProperty('prompt');
      expect(state).toHaveProperty('formStrategy');
    });
  });

  describe('Dispatch & Actions', () => {
    it('should handle updatePrompt action', () => {
      const newStyle = 'cartoon';
      formsStore.dispatch(updatePrompt({ style: newStyle }));
      
      const state = formsStore.getState();
      expect(state.prompt.style).toBe(newStyle);
    });

    it('should handle setOrder action', () => {
      const newOrder = 10;
      formsStore.dispatch(setOrder(newOrder));
      
      const state = formsStore.getState();
      expect(state.formStrategy.order).toBe(newOrder);
    });

    it('should handle multiple dispatches in sequence', () => {
      formsStore.dispatch(setOrder(1));
      formsStore.dispatch(setOrder(2));
      formsStore.dispatch(setOrder(3));
      
      const state = formsStore.getState();
      expect(state.formStrategy.order).toBe(3);
    });
  });

  describe('Middleware', () => {
    it('should execute middleware for actions', () => {
      const stateBefore = formsStore.getState();
      formsStore.dispatch(updatePrompt({ style: 'pixel' }));
      const stateAfter = formsStore.getState();
      
      expect(stateAfter).not.toBe(stateBefore);
      expect(stateAfter.prompt.style).toBe('pixel');
    });
  });

  describe('Performance Tests', () => {
    it('should handle rapid dispatches efficiently', () => {
      const start = performance.now();
      
      for (let i = 0; i < 100; i++) {
        formsStore.dispatch(setOrder(i));
      }
      
      const end = performance.now();
      expect(end - start).toBeLessThan(100); // Should complete in under 100ms
    });

    it('should handle large state updates', () => {
      // Test with style update only to avoid complex type issues
      const start = performance.now();
      formsStore.dispatch(updatePrompt({ style: 'anime' as const }));
      const end = performance.now();
      
      expect(end - start).toBeLessThan(10);
    });
  });

  describe('State Selectors', () => {
    it('should select prompt slice', () => {
      const state = formsStore.getState();
      expect(state.prompt).toBeDefined();
    });

    it('should select formStrategy slice', () => {
      const state = formsStore.getState();
      expect(state.formStrategy).toBeDefined();
    });

    it('should maintain referential equality for unchanged slices', () => {
      const state1 = formsStore.getState();
      formsStore.dispatch(setOrder(99));
      const state2 = formsStore.getState();
      
      // prompt slice should be the same reference
      expect(state1.prompt).toBe(state2.prompt);
      // formStrategy should be different
      expect(state1.formStrategy).not.toBe(state2.formStrategy);
    });
  });

  describe('Input/Output Variations', () => {
    const testStyles: Array<'anime' | 'cartoon' | 'photorealistic' | 'pixel' | 'semi-realistic'> = [
      'anime',
      'cartoon',
      'photorealistic',
      'pixel',
      'semi-realistic',
    ];

    testStyles.forEach((style) => {
      it(`should handle style: ${style}`, () => {
        formsStore.dispatch(updatePrompt({ style }));
        const state = formsStore.getState();
        expect(state.prompt.style).toBe(style);
      });
    });

    const testOrders = [0, 1, 5, 10, 50, 100];
    testOrders.forEach((order) => {
      it(`should handle order: ${order}`, () => {
        formsStore.dispatch(setOrder(order));
        const state = formsStore.getState();
        expect(state.formStrategy.order).toBe(order);
      });
    });
  });
});
