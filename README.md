# spectral-function-past-tense

A custom function for [Spectral](https://github.com/stoplightio/spectral) to check that the input contains a verb in the
past tense. This can be useful for checking the message names in an [AsyncAPI](https://www.asyncapi.com/) document.

## Installation

```
npm install spectral-function-past-tense
```

or

```
yarn add spectral-function-past-tense
```

## How it works

This custom function will attempt to parse a string of any case(snake_case, kebab-case, camelCase, etc.) and ensure it
contains a past tense verb.

## Usage

_Note: Check out the [example](https://github.com/kevinswiber/spectral-function-past-tense/tree/main/example) directory
for a complete demonstration._

A Spectral ruleset can contain custom functions. By default, with the declarative syntax, these will be in a `functions`
directory. At this time, there isn't a way to include functions from outside packages other than to wrap them in your
own function or to use the JavaScript version of a Spectral ruleset.

To wrap the `spectral-function-past-tense` custom function, create a simple Node.js module in your `functions` directory
named `past.js` with the following contents:

```js
import past from "spectral-function-past-tense";
export default past;
```

Then use the following for your Spectral YAML ruleset:

```yaml
functions: [past]
formats: [asyncapi2]
rules:
  rule:
    given: "$.channels.*.[publish,subscribe].message.name"
    then:
      function: past
```

The JavaScript version may look like this:

```js
import past from "spectral-function-past-tense";

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
```

If the input doesn't contain a past-tense word, a validation result will be produced. Example:

```
➜ spectral lint --ruleset=./example/ruleset.yaml ./example/streetlights.yaml

./example/streetlights.yaml
 96:13  warning  rule  Value "dimLight" must be past tense.  components.messages.dimLight.name

✖ 1 problem (0 errors, 1 warning, 0 infos, 0 hints)
```

## Options

This custom function allows for optional overrides. It can either match on the entire string (e.g., `LightShining`
string will match `LightShining` override exactly) or it will match on individual words (e.g., `LightShining` string
will match `Shining` override).

In practice, with a declarative ruleset, the overrides option will look like this:

```
functions: [past]
formats: [asyncapi2]
rules:
  rule:
    given: "$.channels.*.[publish,subscribe].message.name"
    then:
      function: past
      functionOptions:
        overrides:
          - Shining
```

## License

MIT
