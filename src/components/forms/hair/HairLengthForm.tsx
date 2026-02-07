import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../errors/GenericErrorComponent";
import {
  useCallback,
  useState,
  useEffect,
  RefObject,
  ChangeEvent,
  JSX,
} from "react";
import { FORM_DICT } from "../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../lib/states/lang/generic";
import { HairLength } from "../../../lib/declarations/types/anatomy";
import { updateHair } from "../../../redux/mainStore/slices/promptSlice";
import { CLASSES } from "../../../lib/data/classes";
import { useAppDispatch, useAppSelector } from "../../../redux/mainStore/hooks";
import { useOptFormCtx } from "../../../lib/hooks/contexts/useOptFormCtx";
import OptionFieldset from "../../bloc/OptionFieldset";
import OptionFigure from "../../bloc/OptionFigure";
import Forms from "../../../pages/Forms";
import { GdAbbr, gdAbbrs, hrLng, hrTxt } from "../../../lib/data/opts";
import { DeepOptional } from "../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../lib/declarations/interfaces/anatomy";
import ErrorHandler from "../../../lib/utils/ErrorHandler";
import {
  genderAbbrSelector,
  hairTextureSelector,
  hairSelector,
} from "../../../redux/mainStore/selectors/characterSelectors";
import { BlobValidator } from "../../../lib/utils/BlobValidator";
import { defaultCharacter } from "../../../redux/data/defaults";
import LoadingSpinner from "../../icons/animated/LoadingSpinner";

export default function HairLengthForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["hairLengthForm"],
      objectFit: "contain",
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    hair = useAppSelector(hairSelector),
    gender = useAppSelector(genderAbbrSelector),
    texture = useAppSelector(hairTextureSelector),
    [isLoading, setIsLoading] = useState<boolean>(true),
    [lengthOptions, setLengthOptions] = useState<
      DeepAnatomicOption<HairLength>[]
    >([
      {
        key: defaultCharacter.hair.length,
        friendlyName: "Default",
        src: `/imgs/hair/length/${
          GdAbbr[defaultCharacter.gender]
        }/${defaultCharacter.hair.texture.slice(
          0,
          /[-_\s]+/.test(defaultCharacter.hair.texture)
            ? defaultCharacter.hair.texture.indexOf(
                defaultCharacter.hair.texture.match(/[-_\s]+/)![0],
              )
            : defaultCharacter.hair.texture.length,
        )}/${defaultCharacter.hair.length}.png`,
      },
    ]);
  useEffect(() => {
    const loadOptions = async () => {
      setIsLoading(true);
      const slicedTexture = texture.slice(
          /[-_\s]+/.test(texture)
            ? texture.indexOf(texture.match(/[-_\s]+/)![0]) + 1
            : 0,
          texture.length,
        ),
        otherGenders = gdAbbrs.filter(g => g !== gender),
        otherTextures = hrTxt
          .filter(t => t !== texture)
          .map(t =>
            t.slice(
              /[-_\s]+/.test(t) ? t.indexOf(t.match(/[-_\s]+/)![0]) + 1 : 0,
              t.length,
            ),
          ),
        labelMap: Record<HairLength, string> = {
          bald: "Bald",
          "very-short": "Very short",
          short: "Short",
          medium: "Medium",
          long: "Long",
          "very-long": "Very long",
          "extremely-long": "Extremely long",
        };

      const options: DeepAnatomicOption<HairLength>[] = [];
      for (const length of hrLng) {
        try {
          let foundPath: string | null = null;
          foundPath = await BlobValidator.testImagePath(
            `/imgs/hair/length/${gender}/${slicedTexture}/${length}`,
          );
          if (!foundPath) {
            for (const otherTexture of otherTextures) {
              foundPath = await BlobValidator.testImagePath(
                `/imgs/hair/length/${gender}/${otherTexture}/${length}`,
              );
              if (foundPath) break;
            }
          }
          if (!foundPath) {
            for (const otherGender of otherGenders) {
              foundPath = await BlobValidator.testImagePath(
                `/imgs/hair/length/${otherGender}/${slicedTexture}/${length}`,
              );
              if (foundPath) break;
            }
          }
          if (!foundPath) {
            outerLoop: for (const otherGender of otherGenders) {
              for (const otherTexture of otherTextures) {
                foundPath = await BlobValidator.testImagePath(
                  `/imgs/hair/length/${otherGender}/${otherTexture}/${length}`,
                );
                if (foundPath) break outerLoop;
              }
            }
          }
          if (foundPath) {
            options.push({
              key: length,
              friendlyName: labelMap[length],
              src: foundPath,
            });
          } else {
            console.warn(`No valid image found for length: ${length}`);
            options.push({
              key: length,
              friendlyName: labelMap[length],
              src: `/imgs/hair/length/${defaultCharacter.gender}/${defaultCharacter.hair.texture}/${defaultCharacter.hair.length}.png`,
            });
          }
        } catch (err) {
          console.error("Error while validating image for length:", err);
          options.push({
            key: length,
            friendlyName: labelMap[length],
            src: `/imgs/hair/length/${defaultCharacter.gender}/${defaultCharacter.hair.texture}/${defaultCharacter.hair.length}.png`,
          });
        }
      }
      setIsLoading(false);
      setLengthOptions(options);
    };
    loadOptions();
  }, [gender, texture]);
  const handleLengthChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as HairLength;
        dispatch(
          updateHair({
            length: value,
          }),
        );
      },
      [dispatch],
    ),
    selectedLength = hair?.length as HairLength | undefined;
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
        id="hairLengthForm"
      >
        <Forms.Header containerId="hlnLeg" id="hlnLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.hln ??
            "What is the hair length of your character?"}
        </Forms.Header>
        <OptionFieldset selector="hln">
          {lengthOptions.map((opt, i) => {
            const isChecked = selectedLength === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="hln"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleLengthChange}
                name="hln"
                src={opt.src}
                caption={opt.friendlyName}
                imgAddProps={{
                  alt: `${opt.friendlyName} — ${
                    GENERIC_DICT[lang as keyof typeof GENERIC_DICT]?.img ??
                    "Image"
                  }`,
                }}
              />
            );
          })}
        </OptionFieldset>
        {isLoading && (
          <LoadingSpinner message="Loading hair length options..." size={60} />
        )}
      </fieldset>
      <Forms.Result variable={selectedLength ?? ""} />
    </ErrorBoundary>
  );
}
