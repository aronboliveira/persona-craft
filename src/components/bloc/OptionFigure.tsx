import { JSX } from "react";
import { CLASSES } from "../../lib/data/classes";
import { OptionFigureProps } from "../../lib/declarations/interfaces/components";

export default function OptionFigure(props: OptionFigureProps): JSX.Element {
  return (
    <figure className={`option-figure ${props.figureAddClasses?.join(" ")}`}>
      <label
        htmlFor={`${props.prefix}_${props.suffix}`}
        className={CLASSES.IMG_RD_LB}
      >
        <input
          className={CLASSES.IMG_RD_INP}
          type="radio"
          id={`${props.prefix}_${props.suffix}`}
          value={props.value ? props.value : "false"}
          checked={props.checked || false}
          onChange={props.handleChange}
          name={props.name}
          {...props.inpAddProps}
        />
        <img
          width={512}
          height={512}
          loading="lazy"
          decoding="async"
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
    </figure>
  );
}
