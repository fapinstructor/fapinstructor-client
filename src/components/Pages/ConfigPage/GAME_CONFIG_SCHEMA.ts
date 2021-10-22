import * as yup from "yup";

import { validSubreddit } from "utils/regex";
import { sum } from "utils/math";
import { MediaType } from "common/types/Media";
import { StrokeStyles } from "game/enums/StrokeStyle";
import { tasks } from "configureStore";

const MAX_GAME_DURATION = 60 * 12; // 12 hours

export const GAME_CONFIG_SCHEMA = yup
  .object()
  .required()
  .shape({
    subreddits: yup
      .array()
      .required()
      .of(
        yup
          .string()
          .trim()
          .lowercase()
          .required()
          .min(
            3,
            ({ value, min }) =>
              `Subreddit  '${value}' cannot be shorter than ${min} characters.`
          )
          .max(
            21,
            ({ value, max }) =>
              `Subreddit '${value}' cannot be longer than ${max} characters.`
          )
          .matches(
            validSubreddit,
            ({ value }) => `Subreddit '${value}' is an invalid name.`
          )
      )
      .dedupe()
      .unique()
      .min(1, ({ min }) => `Please specify at least ${min} subreddit.`)
      .max(200, ({ max }) => `Cannot specify more than ${max} subreddits.`),
    actionFrequency: yup
      .number()
      .required()
      .min(0)
      .max(
        MAX_GAME_DURATION,
        "Action frequency cannot be greater than 12 hours."
      ),
    slideDuration: yup
      .number()
      .required()
      .min(
        3,
        ({ min }) =>
          `Minimum slide duration cannot be shorter than ${min} seconds.`
      )
      .max(
        MAX_GAME_DURATION,
        "Maximum slide duration cannot be greater than 12 hours."
      ),
    imageType: yup
      .array()
      .required()
      .min(1, "One media type must be selected.")
      .of(yup.string().oneOf(Object.values(MediaType)))
      .unique(),
    gameDuration: yup
      .object()
      .default(undefined)
      .required()
      .shape({
        min: yup
          .number()
          .min(
            1,
            ({ min }) => `Game duration cannot be shorter than ${min} minute.`
          ),
        max: yup
          .number()
          .min(
            yup.ref("min"),
            "Maximum game duration must be greater than the minimum game duration."
          )
          .max(
            MAX_GAME_DURATION,
            "Maximum game duration cannot be greater than 12 hours."
          ),
      }),
    postOrgasmTorture: yup.boolean().required(),
    postOrgasmTortureDuration: yup
      .object()
      .default(undefined)
      .required()
      .shape({
        min: yup
          .number()
          .required()
          .min(0, "Minimum post orgasm time cannot be less than 0."),
        max: yup
          .number()
          .required()
          .min(
            yup.ref("min"),
            "Maximum post orgasm torture duration must be greater than minimum duration."
          )
          .max(
            MAX_GAME_DURATION,
            "Maximum post orgasm torture duration cannot exceed 12 hours."
          ),
      }),
    ruinedOrgasms: yup
      .object()
      .default(undefined)
      .required()
      .shape({
        min: yup
          .number()
          .required()
          .min(0, "Minimum ruined orgasms cannot be less than 0."),
        max: yup
          .number()
          .required()
          .min(
            yup.ref("min"),
            "Maximum ruined orgasms cannot exceed the minimum ruined orgasms."
          ),
      }),
    strokeSpeed: yup
      .object()
      .default(undefined)
      .required()
      .shape({
        min: yup
          .number()
          .required()
          .min(0, "Minimum stroke speed cannot be less than 0."),
        max: yup
          .number()
          .required()
          .max(8, ({ max }) => `Maximum stroke speed cannot exceed ${max}.`)
          .min(
            yup.ref("min"),
            "Maximum stroke speed cannot exceed the minimum stroke speed."
          ),
      }),
    gripAdjustments: yup.boolean().required(),
    initialGripStrength: yup
      .number()
      .required()
      .min(0, "The initial grip strength cannot be less than 0.")
      .max(6, ({ max }) => `The initial grip strength cannot exceed ${max}.`),
    defaultStrokeStyle: yup
      .string()
      .required()
      .oneOf(Object.keys(StrokeStyles)),
    minimumEdges: yup
      .number()
      .required()
      .min(0, "Minimum edges cannot be less than 0.")
      .max(1000, ({ max }) => `The number of edges cannot exceed ${max}.`),
    orgasms: yup
      .object()
      .default(undefined)
      .required()
      .shape({
        min: yup
          .number()
          .required()
          .min(0, "Minimum number of orgasms cannot be less than 0."),
        max: yup
          .number()
          .required()
          .max(
            50,
            ({ max }) => `Maximum number of orgasms cannot exceed ${max}.`
          )
          .min(
            yup.ref("min"),
            "Maximum number of orgasms must be greater than the minimum number of orgasms."
          ),
      }),
    ruinCooldown: yup
      .number()
      .required()
      .min(0)
      .max(
        MAX_GAME_DURATION,
        "Maximum ruined cooldown duration cannot exceed 12 hours."
      ),
    edgeCooldown: yup
      .number()
      .required()
      .min(0)
      .max(
        MAX_GAME_DURATION,
        "Maximum ruined cooldown duration cannot exceed 12 hours."
      ),
    edgeFrequency: yup
      .number()
      .required()
      .min(0)
      .max(100, "Edge frequency cannot exceed 100%"),
    finaleProbabilities: yup
      .object()
      .default(undefined)
      .required()
      .shape({
        orgasm: yup.number().required().min(0).max(100),
        denied: yup.number().required().min(0).max(100),
        ruined: yup.number().required().min(0).max(100),
      })
      .test(
        "probability-sum",
        "The sum of all probabilities should match 100%",
        function () {
          // @ts-expect-error TODO: Figure out how to type this `test` function so it uses the parents schema.
          const { finaleProbabilities } = this.parent;

          return sum(Object.values(finaleProbabilities)) === 100;
        }
      ),
    tasks: yup
      .array()
      .min(0, "Selected tasks cannot be below 0.")
      .of(yup.string().oneOf(tasks))
      .unique(),
  });
