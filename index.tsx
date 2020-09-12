import React, { Component, useState } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
import {useEvt} from "evt/hooks";
import { SplashScreen } from "./TodoList";
import {evtStoreLoaded} from "./logic";






const App: React.FunctionComponent = ()=>{
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  useEvt(ctx=>{
    

  }, [isContentLoaded])
  return(
    <div>sexe</div>
  )
}



render(<App />, document.getElementById('root'));
