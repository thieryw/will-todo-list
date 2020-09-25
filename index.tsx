import React, {useEffect, useCallback, useReducer, useState} from "react";
import {render} from "react-dom";
import {getStore, Store} from "./logic";
import { App, eventHandlers } from "./App";



export const storePr = getStore({eventHandlers});



const Switcher: React.FunctionComponent = ()=>{
  let store: Store | undefined;

  useEffect(()=>{
    storePr.then(value=>{
      store = value;
    })

  },[store])
  

  return(
    <div>
      {
        store === undefined ? "loading" : "ok"
      }
    </div>
  )
}




render(<Switcher />, document.getElementById('root'));
