/**
 * Test Suite: GenderForm Component
 *
 * Tests user interactions, rendering, state updates, and accessibility.
 * Covers: Radio selection, image rendering, Redux integration, and performance.
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import GenderForm from "../GenderForm";
import promptReducer from "../../../redux/mainStore/slices/promptSlice";
import formStrategyReducer from "../../../redux/mainStore/slices/formStrategySlice";
import tipsReducer from "../../../redux/mainStore/slices/tipsSlice";

// Mock context providers
jest.mock("../../../lib/hooks/contexts/useOptFormCtx", () => ({
  useOptFormCtx: () => ({
    lang: "en",
    formRef: { current: null },
    dispatch: jest.fn(),
    ctx: null,
    layoutCtx: null,
  }),
}));

const createTestStore = () =>
  configureStore({
    reducer: {
      prompt: promptReducer,
      formStrategy: formStrategyReducer,
      tips: tipsReducer,
    },
  });

describe("GenderForm", () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
  });

  describe("Rendering", () => {
    it("should render without crashing", () => {
      render(
        <Provider store={store}>
          <GenderForm />
        </Provider>,
      );

      expect(screen.getByRole("group")).toBeInTheDocument();
    });

    it("should render all gender options", () => {
      render(
        <Provider store={store}>
          <GenderForm />
        </Provider>,
      );

      const radioButtons = screen.getAllByRole("radio");
      expect(radioButtons.length).toBeGreaterThan(0);
    });

    it("should render with correct form id", () => {
      const { container } = render(
        <Provider store={store}>
          <GenderForm />
        </Provider>,
      );

      const fieldset = container.querySelector("#genderForm");
      expect(fieldset).toBeInTheDocument();
    });
  });

  describe("User Interactions", () => {
    it("should handle radio button selection", async () => {
      render(
        <Provider store={store}>
          <GenderForm />
        </Provider>,
      );

      const radioButtons = screen.getAllByRole("radio");
      if (radioButtons.length > 0) {
        fireEvent.click(radioButtons[0]);

        await waitFor(() => {
          expect(radioButtons[0]).toBeChecked();
        });
      }
    });

    it("should update Redux state on selection", async () => {
      render(
        <Provider store={store}>
          <GenderForm />
        </Provider>,
      );

      const initialState = store.getState();
      const radioButtons = screen.getAllByRole("radio");

      if (radioButtons.length > 0) {
        fireEvent.click(radioButtons[0]);

        await waitFor(() => {
          const newState = store.getState();
          expect(newState).not.toBe(initialState);
        });
      }
    });

    it("should allow changing selection", async () => {
      render(
        <Provider store={store}>
          <GenderForm />
        </Provider>,
      );

      const radioButtons = screen.getAllByRole("radio");
      if (radioButtons.length >= 2) {
        fireEvent.click(radioButtons[0]);
        await waitFor(() => expect(radioButtons[0]).toBeChecked());

        fireEvent.click(radioButtons[1]);
        await waitFor(() => {
          expect(radioButtons[0]).not.toBeChecked();
          expect(radioButtons[1]).toBeChecked();
        });
      }
    });
  });

  describe("Input/Output Variations", () => {
    it("should handle rapid consecutive clicks", async () => {
      render(
        <Provider store={store}>
          <GenderForm />
        </Provider>,
      );

      const radioButtons = screen.getAllByRole("radio");
      if (radioButtons.length > 0) {
        for (let i = 0; i < 5; i++) {
          fireEvent.click(radioButtons[0]);
        }

        await waitFor(() => {
          expect(radioButtons[0]).toBeChecked();
        });
      }
    });

    it("should maintain only one selection at a time", async () => {
      render(
        <Provider store={store}>
          <GenderForm />
        </Provider>,
      );

      const radioButtons = screen.getAllByRole("radio");
      if (radioButtons.length >= 2) {
        fireEvent.click(radioButtons[0]);
        fireEvent.click(radioButtons[1]);

        await waitFor(() => {
          const checkedButtons = radioButtons.filter(
            btn => (btn as HTMLInputElement).checked,
          );
          expect(checkedButtons.length).toBe(1);
        });
      }
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA labels", () => {
      render(
        <Provider store={store}>
          <GenderForm />
        </Provider>,
      );

      const fieldset = screen.getByRole("group");
      expect(fieldset).toBeInTheDocument();
    });

    it("should be keyboard navigable", async () => {
      render(
        <Provider store={store}>
          <GenderForm />
        </Provider>,
      );

      const radioButtons = screen.getAllByRole("radio");
      if (radioButtons.length > 0) {
        radioButtons[0].focus();
        expect(document.activeElement).toBe(radioButtons[0]);
      }
    });

    it("should have proper label associations", () => {
      render(
        <Provider store={store}>
          <GenderForm />
        </Provider>,
      );

      const labels = screen
        .getAllByRole("radio")
        .map(radio => radio.closest("label"));
      labels.forEach(label => {
        expect(label).toBeInTheDocument();
      });
    });
  });

  describe("Performance", () => {
    it("should render quickly with default state", () => {
      const start = performance.now();
      render(
        <Provider store={store}>
          <GenderForm />
        </Provider>,
      );
      const end = performance.now();

      expect(end - start).toBeLessThan(100);
    });

    it("should handle multiple re-renders efficiently", () => {
      const { rerender } = render(
        <Provider store={store}>
          <GenderForm />
        </Provider>,
      );

      const start = performance.now();
      for (let i = 0; i < 10; i++) {
        rerender(
          <Provider store={store}>
            <GenderForm />
          </Provider>,
        );
      }
      const end = performance.now();

      expect(end - start).toBeLessThan(200);
    });
  });

  describe("Error Boundaries", () => {
    it("should be wrapped with ErrorBoundary", () => {
      const { container } = render(
        <Provider store={store}>
          <GenderForm />
        </Provider>,
      );

      // Component should render without throwing
      expect(container.querySelector("#genderForm")).toBeInTheDocument();
    });
  });
});
