import { readFile } from "fs/promises";
import path from "path";
import past from "../src";
import { Spectral } from "@stoplight/spectral-core";
import ruleset from "./__fixtures__/.spectral";

const fixturesPath = path.join(__dirname, "__fixtures__");

it("should return void when an event is past tense", () => {
  const result = past("LightShined");
  expect(result).toBeFalsy();
});

it("should return a validation message when an event is not past tense", () => {
  const result = past("LightShining");
  expect(result).toBeDefined();
  expect(result).toHaveLength(1);
  expect(result).toContainEqual({ message: "Value must be past tense." });
});

it("should return a validation error on an AsyncAPI document", async () => {
  const subject = await readFile(path.join(fixturesPath, "streetlights-invalid.yaml"), "utf-8");
  const spectral = new Spectral();
  spectral.setRuleset(ruleset);
  const results = await spectral.run(subject);
  expect(results).toContainEqual({
    code: "rule",
    message: "Value must be past tense.",
    path: ["channels", "light/measured", "publish", "message", "name"],
    range: { end: { character: 28, line: 20 }, start: { character: 14, line: 20 } },
    severity: 1,
  });
});

it("should return a validation error on an AsyncAPI document", async () => {
  const subject = await readFile(path.join(fixturesPath, "streetlights-valid.yaml"), "utf-8");
  const spectral = new Spectral();
  spectral.setRuleset(ruleset);
  const results = await spectral.run(subject);
  expect(results).toHaveLength(0);
});
