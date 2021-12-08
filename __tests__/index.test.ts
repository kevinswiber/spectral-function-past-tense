import ensurePastTense from "../src";
it("should return void when an event is past tense", () => {
  const result = ensurePastTense("LightShined");
  expect(result).toBeFalsy();
});

it("should return a validation message when an event is not past tense", () => {
  const result = ensurePastTense("LightShining");
  expect(result).toBeDefined();
  expect(result).toHaveLength(1);
  expect(result).toContainEqual({ message: "Value must be past tense." });
});
