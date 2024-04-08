# @loschmidt/jsme-react

This project wraps the BSD licensed [JSME molecule editor](https://peter-ertl.com/jsme/) (by B. Bienfait and P. Ertl) in a React component for easy use in React apps.

Please note that JSME was originally developed in Java and transpiled to Javascript. By modern Javascript standards it uses a few unconventional techniques to load. To accomodate this, this library will perform a side effect when the component is being loaded in the browser of appending the script tag that loads the JSME Javascript entrypoint (which will then trigger a few more loads). This works with lazy loading of Javascript modules.

If for some reason you want this loading to happen at a specific (early) point in time you can call the `jsmeSetup` function of this module which will perform the steps described above.

## Prerequisites

- React 17 or 18

## Installation

```bash
npm install @loschmidt/jsme-react
# or
yarn add @loschmidt/jsme-react
```

## Props

Required props

* `height`: number or string, e.g. 300 or "300px"
* `width`: number or string, e.g. 400 or "400px"

Optional props
* `options`: string or array of strings. The available JSME options are described on the [JSME documentation page](https://peter-ertl.com/jsme/JSME_2017-02-26/doc.html#JSME_API)
* `onChange`: event handler that is passed the smiles whenever it is changed in the editor
* `smiles`: the smiles to display (if not set, an empty canvas will be shown)
* `src`: url of the jsme source code. Default value is `"https://jsme-editor.github.io/dist/jsme/jsme.nocache.js"`
* `setup`: boolean telling whether JSME script should be loaded by the Jsme component, `true` - JSME script will be loaded once, `false` - JSME script will never be loaded, `undefined` (default) - JSME script will be loaded once, if was not previously loaded using a script element (included by you as library user).

## How to use

There are several ways how to load the underlying JSME library.
1. Fully automatic (recommended).
2. Use the `jsmeSetup` function.
3. Add `<script>` tag into your HTML template.

### 1. Fully automatic (recommended)

```jsx
import { Jsme } from '@loschmidt/jsme-react'

export default function App() {
  const logSmiles = (smiles) => {
    console.log(smiles)
  }
  return (
    <Jsme height={300} width={400} options="oldlook,star" onChange={logSmiles}/>
  )
}
```

JSME library will be loaded during rendering of the Jsme component.

You can use `setup={true}` but it's not necessary.

### 2. Use `jsmeSetup`

Before rendering a Jsme component, run the `jsmeSetup` function.

```jsx
import { Jsme, jsmeSetup } from '@loschmidt/jsme-react'

// Load JSME library
jsmeSetup();

export default function App() {
  const logSmiles = (smiles) => {
    console.log(smiles)
  }
  return (
    <Jsme height={300} width={400} options="oldlook,star" onChange={logSmiles}/>
  )
}
```

You can use `setup={false}` but it's not necessary.

### 3. Add `<script>` into HTML

To avoid dynamic creation of script elements, you can include it into your HTML template.

```html
<head>
  <!-- ... -->
  <script src="https://jsme-editor.github.io/dist/jsme/jsme.nocache.js" type="text/javascript"></script>
</head>
```

```jsx
import { Jsme } from '@loschmidt/jsme-react'

export default function App() {
  const logSmiles = (smiles) => {
    console.log(smiles)
  }
  return (
    <Jsme height={300} width={400} options="oldlook,star" onChange={logSmiles}/>
  )
}
```

You can use `setup={false}` but it's not necessary.

## Self-hosted JSME library

By default, JSME library is downloaded from https://jsme-editor.github.io/.
If you want, you can use your copy by installing the [jsme-editor](https://www.npmjs.com/package/jsme-editor) package and serve it yourself.

```bash
npm install jsme-editor
```

Example for the Create React App framework:
```js
// File: src/setupProxy.js

const express = require('express');
const path = require('path');

const jsmeEditorDir = path.dirname(require.resolve('jsme-editor'));

module.exports = function(app) {
  app.use(
    '/jsme',
    express.static(jsmeEditorDir)
  );
};
```

You can find a working example in the [example](./example) directory.

## Development

#### First terminal

```bash
# In the repository root

npm install
npm link
npm start
```

#### Second terminal
```bash
# In the "example" directory

npm install
npm link @loschmidt/jsme-react
npm start
```

## License

BSD-3
