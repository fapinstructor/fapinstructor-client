import * as yup from "yup";

import { isAlpha } from "@/utils/regex";

import { GAME_CONFIG_SCHEMA } from "./GAME_CONFIG_SCHEMA";

export const CREATE_GAME_SCHEMA = yup
  .object()
  .required()
  .shape({
    title: yup
      .string()
      .min(5, ({ min }) => `The title must contain at least ${min} characters.`)
      .max(
        50,
        ({ max }) => `The title cannot be greater than ${max} characters long.`
      )
      .required("Please enter a title."),
    tags: yup
      .array()
      .required()
      .of(
        yup
          .string()
          .required()
          .matches(isAlpha, "Only lowercase letters and spaces are permitted.")
          .min(3, ({ min }) => `A tag must be at least ${min} characters long.`)
          .max(
            30,
            ({ max }) => `A tag cannot be greater than ${max} characters long.`
          )
          .lowercase()
          .required()
      )
      .min(1, ({ min }) => `You must specify at least ${min} tag.`)
      .dedupe(),
    isPublic: yup.boolean().required(),
    config: GAME_CONFIG_SCHEMA,
  });
