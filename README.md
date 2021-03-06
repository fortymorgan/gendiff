# Gendiff
Console-based Node.js app for generating diff between config files. Supported formats: JSON, YAML, INI.

[![Maintainability](https://api.codeclimate.com/v1/badges/40cf0c26816093b89911/maintainability)](https://codeclimate.com/github/fortymorgan/project-lvl2-s257/maintainability)
[![Build Status](https://travis-ci.org/fortymorgan/gendiff.svg?branch=master)](https://travis-ci.org/fortymorgan/gendiff)

## How it works

The application detects file format based on its extension. It converts config to an object structure (AST), same for different formats.  
Then the app creates a diff by comparing the ASTs recursively with a [function](https://github.com/fortymorgan/gendiff/blob/8ce34d2589c7f7a20ca3263f4360f7bcb3296375/src/index.js#L40). Finally, the app renders diff in the selected `format` to the console.

## Examples

### Config files

First config:
```
{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22"
}
```

Second config:
```
{
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
}
```

### Output

Standart format:
```
{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  + verbose: true
}
```
Plain format:
```
Property 'timeout' was updated. From '50' to '20'
Property 'proxy' was removed
Property 'verbose' was added with value: 'true'
```
JSON format:
```
[
  {
    "key": "host",
    "type": "not changed",
    "value": "hexlet.io"
  },
  {
    "key": "timeout",
    "type": "changed",
    "value": {
      "oldValue": 50,
      "newValue": 20
    }
  },
  {
    "key": "proxy",
    "type": "deleted",
    "value": "123.234.53.22"
  },
  {
    "key": "verbose",
    "type": "inserted",
    "value": true
  }
]
```

## How to develop

Fist you need to build app with:
```
npm run build
```

Then you can run app:

### Usage
```
dist/bin/gendiff.js [options] <firstConfig> <secondConfig>
```

### Options
```
-v, --version        output the version number
-f, --format [type]  output format
-h, --help           output usage information
```

### Formats (see examples)
- `standart`, output diff with `+ / -` , like `git diff`
- `plain`, output diff as text strings
- `json`, output diff in JSON format

## Testing

Tests are made with [Jest](https://github.com/facebook/jest)

Run tests with:
```
npm test
```
Config files and results for tests in `__tests__/__fixtures__`.
