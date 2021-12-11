import { noCase } from "change-case";
import { Tag } from "en-pos";

type Options = {
  overrides?: string[];
};

export default (input: string, options?: Options): { message: string }[] | undefined => {
  if (typeof input !== "string") {
    return [{ message: "invalid input, input should be a string" }];
  }

  if (options?.overrides) {
    if (!Array.isArray(options.overrides)) {
      throw new Error("functionOptions of `past`: `overrides` should be an array of strings");
    }

    for (const override of options.overrides) {
      if (typeof override !== "string") {
        throw new Error("functionOptions of `past`: `overrides` should be an array of strings");
      }
    }
  }

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
};
