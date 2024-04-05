# jsme-react

This project wraps the BSD licensed [JSME molecule editor](https://peter-ertl.com/jsme/) (by B. Bienfait and P. Ertl) in a React component for easy use in React apps.

Please note that JSME was originally developed in Java and transpiled to Javascript. By modern Javascript standards it uses a few unconventional techniques to load. To accomodate this, this library will perform a side effect when the component is being loaded in the browser of appending the script tag that loads the JSME Javascript entrypoint (which will then trigger a few more loads). This works with lazy loading of Javascript modules.

If for some reason you want this loading to happen at a specific (early) point in time you can call the setup function of this module which will perform the steps described above.

## How to use

#### Prerequisites

- React 17 or 18

#### Step one: add this library to your project

```bash
npm install jsme-react
# or
yarn add jsme-react
```

#### Step two: use the React component

```jsx
import { Jsme } from 'jsme-react'

export default function App() {
  const logSmiles = (smiles) => {
    console.log(smiles)
  }
  return (
    <Jsme height={300} width={400} options="oldlook,star" onChange={logSmiles}/>
  )
}
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
npm link jsme-react
npm start
```

## License

BSD-3
