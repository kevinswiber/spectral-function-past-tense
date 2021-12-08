import { createRulesetFunction } from "@stoplight/spectral-core";
import { noCase } from "change-case";
import { Tag } from "en-pos";

type Options = {
  overrides?: string[];
};

export default createRulesetFunction(
  {
    input: {
      type: "string",
    },
    options: {
      type: ["object", "null"],
      additionalProperties: false,
      properties: {
        overrides: {
          type: "array",
          items: {
            type: "string",
          },
          minItems: 1,
        },
      },
    },
  },
  (input: string, options?: Options) => {
    if (options?.overrides?.find(override => override.toLowerCase() === input.toLowerCase())) {
      return;
    }

    const words: string[] = noCase(input).split(" ");

    if (options?.overrides) {
      const overrides = options.overrides.map(override => override.toLowerCase());
      const isOverride = words.find(word => overrides.includes(word));
      if (isOverride) {
        return;
      }
    }

    const tags = new Tag(words).initial().smooth().tags;

    if (!tags.includes("VBD")) {
      return [
        {
          message: `Value "${input}" must be past tense.`,
        },
      ];
    }
  },
);
