import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
import {SplashScreen} from './TodoList';




interface AppProps { }
interface AppState {
  name: string;
}

/*class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>
      <div>{store.todoElements[0].element}</div>
  
      </div>
    );
  }
}*/

const App: React.FunctionComponent<{}> = ()=>{
  return(
    <SplashScreen/>

  )

}

render(<App />, document.getElementById('root'));
