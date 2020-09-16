import React, { Component, useState, useEffect } from 'react';
import { render } from 'react-dom';

import './style.css';
import {useEvt, useStatefulEvt} from "evt/hooks";
import {Evt} from "evt";

import { App } from "./App";
import {getStore, Store} from "./logic";

const SplashScreen = ()=> <h1>Loading...</h1>

const evtStore = Evt.from(getStore()).toStateful();

const Switcher: React.FunctionComponent = ()=>{

  useStatefulEvt([evtStore]);

  return(
    <div>
      {
        evtStore.state === undefined ? 
          <SplashScreen/>:
          <App store={evtStore.state}/>
      }
    </div>
    
  )
}



render(<Switcher />, document.getElementById('root'));
