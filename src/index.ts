import { IFunctionResult } from "@stoplight/spectral-core";
import { noCase } from "change-case";
const Tag = require("en-pos").Tag;

type Options = {
  overrides?: string[];
};

export default (input: string | unknown, options?: Options): IFunctionResult[] | void => {
  if (typeof input !== "string") {
    return;
  }

  const words: string[] = noCase(input).split(" ");

  if (options?.overrides) {
    const isOverride = words.find(word => options.overrides?.includes(word));
    if (isOverride) {
      return;
    }
  }

  const tags = new Tag(words).initial().smooth().tags;

  if (!tags.includes("VBD")) {
    return [
      {
        message: "Value must be past tense.",
      },
    ];
  }
};
