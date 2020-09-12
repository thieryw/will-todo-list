import React, { Component, useState } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
import {useEvt} from "evt/hooks";
import {Evt} from "evt";
import { id } from "evt/tools/typeSafety/id";

import { SplashScreen } from "./TodoList";
import {getStore, Store} from "./logic";


const prStore = Evt.from(id<Promise<Store | undefined>>(getStore()))
  .toStateful(undefined);




const App: React.FunctionComponent = ()=>{

  const [store, setStore] = useState<Store | undefined>(undefined);




  return(
    <div>
      {
        store === undefined ? 
          <SplashScreen/>:
          <p>{JSON.stringify(store)}</p>
      }
    </div>
    
  )
}



render(<App />, document.getElementById('root'));
