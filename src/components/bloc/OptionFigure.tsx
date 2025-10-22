import { JSX, useEffect, useState } from "react";
import { CLASSES } from "../../lib/data/classes";
import { OptionFigureProps } from "../../lib/declarations/interfaces/components";
import { Card, CardMedia, Radio } from "@mui/material";

export default function OptionFigure(props: OptionFigureProps): JSX.Element {
  const [checked, setChecked] = useState(props.checked || false);
  useEffect(() => {
    setChecked(props.checked || false);
  }, [props.checked]);
  return (
    <Card
      component={"figure"}
      variant={checked ? "outlined" : undefined}
      sx={{ borderWidth: checked ? 2 : 1 }}
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
          checked={props.checked || false}
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
          className="option-figure-img"
          src={props.src}
          {...props.imgAddProps}
          style={{
            objectFit: "cover",
            borderRadius: "8px",
            objectPosition: "center center",
          }}
        />
      </label>
      <figcaption>{props.caption}</figcaption>
    </Card>
  );
}
