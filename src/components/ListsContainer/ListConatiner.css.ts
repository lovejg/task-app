import { style } from "@vanilla-extract/css";
import { vars } from "../../App.css";

export const listsContainer = style({
  display: "flex",
  flexWrap: "wrap",
  rowGap: vars.spacing.listSpacing,
  margin: vars.spacing.listSpacing,
  height: "max-content",
});
