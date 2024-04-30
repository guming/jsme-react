import * as React from 'react';

declare global {
  // noinspection JSUnusedGlobalSymbols
  interface Window {
    jsmeOnLoad: () => void,
    JSApplet: any,
  }
}

let jsmeIsSetupInitiated = false;
let jsmeIsLoadedGlobal = false;
const jsmeCallbacks: Array<() => void> = [];

window['jsmeOnLoad'] = () => {
  jsmeIsLoadedGlobal = true;
  jsmeCallbacks.forEach(c => c());
}

const DEFAULT_SRC = "https://jsme-editor.github.io/dist/jsme/jsme.nocache.js";

// Export the setup function so that a user can override the super-lazy loading behaviour and choose to load it more eagerly.
export function jsmeSetup(src = DEFAULT_SRC) {
  const srcSlashPos = src.lastIndexOf('/');
  const srcFilename = src.substring(srcSlashPos + 1);
  const elements = Array.from(document.getElementsByTagName('script'));
  const alreadyExists = elements.some(el => el.src?.endsWith(srcFilename));
  if (!alreadyExists) {
    doJsmeSetup(src);
  }
}

export function doJsmeSetup(src = DEFAULT_SRC) {
  if (!jsmeIsSetupInitiated) {
    jsmeIsSetupInitiated = true;
    const script = document.createElement('script');
    script.src = src;
    document.head.appendChild(script);
  }
}

let jsmeCounter = 0;

export interface JsmeProps {
  height: string | number,
  width: string | number,
  smiles?: string,
  options?: string | string[],
  onChange?: (smiles: string) => void,
  src?: string,
  setup?: boolean,
}

// noinspection JSUnusedGlobalSymbols
export function Jsme(props: JsmeProps) {
  const myRef = React.useRef<HTMLDivElement | null>(null);
  const [jsmeApplet, setJsmeApplet] = React.useState<any>(null);
  const [jsmeIsLoaded, setJsmeIsLoaded] = React.useState(jsmeIsLoadedGlobal);

  const width = typeof props.width === 'string' && props.width.toLowerCase().endsWith('px') ? props.width : `${props.width}px`;
  const height = typeof props.height === 'string' && props.height.toLowerCase().endsWith('px') ? props.height : `${props.height}px`;
  const options = Array.isArray(props.options) ? props.options.join(',') : props.options;
  const smiles = props.smiles;

  const { src, setup } = props;

  React.useEffect(() => {
    const setJsmeIsLoadedToTrue = () => setJsmeIsLoaded(true);
    if (!jsmeIsLoadedGlobal) {
      jsmeCallbacks.push(setJsmeIsLoadedToTrue);
    }
    return () => {
      const idx = jsmeCallbacks.indexOf(setJsmeIsLoadedToTrue);
      if (idx >= 0) {
        jsmeCallbacks.splice(idx, 1);
      }
    }
  }, []);

  React.useEffect(() => {
    if (setup) {
      doJsmeSetup(src);
    } else if (setup !== false) {
      jsmeSetup(src);
    }
  }, [setup, src]);

  // width, height, options are not in dependencies - they should not trigger this effect
  React.useEffect(() => {
    if (!jsmeIsLoaded) {
      return;
    }

    const id = "jsme" + jsmeCounter++;
    const el = document.createElement("div");
    el.id = id;
    myRef.current?.appendChild(el);

    const jsmeApplet = new window['JSApplet'].JSME(id, width, height, options && {options: options});
    jsmeApplet.setCallBack("AfterStructureModified", handleChange);
    jsmeApplet.readGenericMolecularInput(props.smiles);
    setJsmeApplet(jsmeApplet);

    return () => {
      document.getElementById(id)?.remove();
      setJsmeApplet(null);
    };
  }, [jsmeIsLoaded]);

  React.useEffect(() => {
    jsmeApplet?.setSize(width, height);
  }, [jsmeApplet, width, height]);

  React.useEffect(() => {
    jsmeApplet?.options(options && {options: options});
  }, [jsmeApplet, options]);

  React.useEffect(() => {
    jsmeApplet?.readGenericMolecularInput(smiles);
  }, [jsmeApplet, smiles]);

  const handleChange = (jsmeEvent) => {
    props.onChange?.(jsmeEvent.src.smiles());
  }

  return <div ref={myRef}/>
}
