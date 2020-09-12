import React, { Component, useState } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
import {useEvt} from "evt/hooks";
import { SplashScreen } from "./TodoList";


/*interface AppProps { }
interface AppState {
  name: string;
}*/

/*class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      </>
    );
  }
}*/

const App: React.FunctionComponent = ()=>{
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  return(
    <div>sexe</div>
  )
}



render(<App />, document.getElementById('root'));
