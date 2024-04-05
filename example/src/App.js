import {Jsme} from "jsme-react";
import React from "react";

function App() {
  const logSmiles = (smiles) => {
    console.log(smiles);
  }
  return (
    <div>
      <Jsme height="300px" width="400px" options="oldlook,star" onChange={logSmiles}/>
      <Jsme height="300px" width="600px" smiles="CC=O" onChange={logSmiles}/>
    </div>
  )
}

export default App;
