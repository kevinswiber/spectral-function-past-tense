import past from "../../src";

export default {
  rules: {
    rule: {
      given: "$.channels.*.[publish,subscribe].message.name",
      then: {
        function: past,
      },
    },
  },
};
