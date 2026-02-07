import { JSX, memo } from "react"; // * removed useEffect/useState; component is now fully controlled via props
import { CLASSES } from "../../lib/data/classes";
import { OptionFigureProps } from "../../lib/declarations/interfaces/components";
import React from "react";
import { Card, CardMedia, Radio } from "@mui/material";

const OptionFigure = (props: OptionFigureProps): JSX.Element => {
  const isChecked = !!props.checked; // * derive checked flag directly from the prop

  return (
    <Card
      component={"figure"}
      variant={isChecked ? "outlined" : undefined} // * visual selection is driven by isChecked
      sx={{ borderWidth: isChecked ? 2 : 1 }} // * thicker border when selected
      className={`option-figure ${props.figureAddClasses?.join(" ")}`}
    >
      <label
        htmlFor={`${props.prefix}_${props.suffix}`}
        className={CLASSES.IMG_RD_LB}
      >
        <Radio
          className={CLASSES.IMG_RD_INP}
          id={`${props.prefix}_${props.suffix}`}
          value={props.value ? props.value : "false"}
          checked={isChecked} // * radio is controlled by parent (Redux) instead of internal state
          onChange={props.handleChange}
          name={props.name}
          {...props.inpAddProps}
        />
        <CardMedia
          component={"img"}
          width={512}
          height={512}
          loading="lazy"
          decoding="async"
          className={CLASSES.OPT_FIMG}
          src={props.src}
          {...props.imgAddProps}
          style={{
            objectFit: "contain",
            borderRadius: "8px",
            objectPosition: "center center",
          }}
        />
      </label>
      <figcaption>{props.caption}</figcaption>
    </Card>
  );
};

export default memo(OptionFigure);
