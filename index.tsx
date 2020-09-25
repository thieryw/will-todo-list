import React, {useEffect, useCallback, useReducer, useState} from "react";
import {render} from "react-dom";
import {getStore, Store} from "./logic";
import { App, eventHandlers } from "./App";



export const storePr = getStore();

const SplashScreen = ()=><h1>Loading...</h1>;


const Switcher: React.FunctionComponent = ()=>{
  
  const [store, setStore] = useState(undefined);

  

  useEffect(()=>{
    storePr.then(st=>{
      setStore(st);
    });

  },[store]);

  return(
    <div>
      {
        store === undefined ? <SplashScreen/> : <App store={store}/>
      }
    </div>
  )
}




render(<Switcher />, document.getElementById('root'));
