import React, { Component, useState, useEffect } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
import {useEvt, useStatefulEvt} from "evt/hooks";
import {Evt} from "evt";

import { SplashScreen } from "./TodoList";
import {getStore, Store} from "./logic";


/*const evtStore = Evt.from<Store | undefined>(getStore())
  .toStateful(undefined);*/

const prStore = getStore();


const App: React.FunctionComponent = ()=>{

  const [store, setStore] = useState<Store | undefined>(undefined);

  useEffect(()=>{

    let isDone= false;

    prStore.then(store=> {

      if( isDone ){
        return;
      }

      setStore(store);

    });

    return ()=> isDone =true;

  },[prStore]);


  /*useStatefulEvt([ evtStore ]);*/

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
