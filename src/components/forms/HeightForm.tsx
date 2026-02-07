import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../lib/states/lang/forms";
import {
  bdHgt,
  DEFAULT_OPTS,
  imgBasePath,
  isValidGender,
  isValidStyleAbbr,
} from "../../lib/data/opts";
import { GENERIC_DICT } from "../../lib/states/lang/generic";
import { BodyHeight } from "../../lib/declarations/types/anatomy";
import { updatePrompt } from "../../redux/mainStore/slices/promptSlice";
import { CLASSES } from "../../lib/data/classes";
import { useAppDispatch, useAppSelector } from "../../redux/mainStore/hooks";
import { OptDict } from "../../lib/declarations/interfaces/utils";
import { useOptFormCtx } from "../../lib/hooks/contexts/useOptFormCtx";
import OptionFieldset from "../bloc/OptionFieldset";
import OptionFigure from "../bloc/OptionFigure";
import Forms from "../../pages/Forms";
import ErrorHandler from "../../lib/utils/ErrorHandler";
import { ImageFormat } from "../../lib/declarations/types/helpers";
import {
  genderAbbrSelector,
  characterSelector,
  heightSelector,
} from "../../redux/mainStore/selectors/characterSelectors";
import { styleAbbrSelector } from "../../redux/mainStore/selectors/styleSelectors";

export default function HeightForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["bodyHeightForm"],
      objectFit: "contain",
    }),
    dispatch = useAppDispatch(),
    character = useAppSelector(characterSelector),
    height = useAppSelector(heightSelector),
    gender = useAppSelector(genderAbbrSelector),
    style = useAppSelector(styleAbbrSelector),
    heightOptions = useMemo(
      () =>
        (() => {
          const basePath = `${imgBasePath}/height/${
            isValidStyleAbbr(style) ? style : DEFAULT_OPTS.stl
          }/${isValidGender(gender) ? gender : DEFAULT_OPTS.gd}`;
          const entries = {} as {
            [K in BodyHeight]: {
              friendlyName: string;
              src: `${typeof imgBasePath}/height/${string}.${ImageFormat}`;
            };
          };
          for (const h of bdHgt) {
            let friendlyName: string;
            switch (h) {
              case "dwarfic":
                friendlyName = "Dwarfic";
                break;
              case "short":
                friendlyName = "Short";
                break;
              case "average":
                friendlyName = "Average";
                break;
              case "tall":
                friendlyName = "Tall";
                break;
              case "colossal":
                friendlyName = "Colossal";
                break;
              default:
                friendlyName = h;
            }
            entries[h] = {
              friendlyName,
              src: `${basePath}/${h}.png` as any,
            };
          }
          return entries;
        })(),
      [gender, style],
    ),
    handleHeightChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as BodyHeight;
        dispatch(
          updatePrompt({
            character: {
              ...character,
              height: value,
            },
          }),
        );
      },
      [dispatch, character],
    );
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        ErrorHandler.handleReactBoundaryError({
          error,
          info: errorInfo,
          alertType: "hot",
        });
      }}
      FallbackComponent={() => <GenericErrorComponent />}
    >
      <fieldset
        ref={formRef as RefObject<HTMLFieldSetElement>}
        id="bodyHeightForm"
      >
        <Forms.Header containerId="hgtLeg" id="hgtLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.hgt ??
            "What is the Height of your character?"}
        </Forms.Header>

        <OptionFieldset selector="hgt">
          {heightOptions &&
            Object.entries(heightOptions).map(([k, v], i) => {
              const opt = v as OptDict;
              const isChecked = height === k;

              return (
                <OptionFigure
                  key={k}
                  figureAddClasses={[CLASSES.STL_OPT]}
                  prefix="hgt"
                  suffix={`${i + 1}`}
                  value={k}
                  checked={isChecked}
                  handleChange={handleHeightChange}
                  name="hgt"
                  src={opt.src}
                  caption={opt.friendlyName}
                  imgAddProps={{
                    alt: `${opt.friendlyName} — ${
                      GENERIC_DICT[lang]?.img ?? "Image"
                    }`,
                  }}
                  imgStyle={{ objectFit: "contain" }}
                />
              );
            })}
        </OptionFieldset>
      </fieldset>

      <Forms.Result variable={height} />
    </ErrorBoundary>
  );
}
