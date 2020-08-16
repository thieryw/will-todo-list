import React from "react";

import {Store, storePr} from "./logic";




namespace TaskInput{
  export type State = {
    task: string;
    loadingMsg: string;
  }

  export type Props = {
    addTast: (store: Store)=>void;
  }
}

export class TaskInput extends React.Component<TaskInput.Props, TaskInput.State>{

  constructor(props: TaskInput.Props){
    super(props);
    this.state = {
      "task": "",
      "loadingMsg": ""
    }
  }
  
  private handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    
    this.setState({
      "task": e.target.value
    })

  }

  private handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    this.setState({
      "loadingMsg": "loading"
    })

    storePr.then(
      store => {

        store.addTask(this.state.task);
        this.props.addTast(store);
        
        this.setState({
          "task": "",
          "loadingMsg": ""
        })
      }
    )

    
  }

  render = ()=>{
    return(
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.handleChange} type="text" value={this.state.task}/>
        <input type="submit"/>
        <p>{this.state.loadingMsg}</p>
      
      </form>
    )
  }
}