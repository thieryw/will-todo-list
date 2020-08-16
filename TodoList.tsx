import React from "react";



import {Store, getStore} from "./logic";



const storePr = getStore();

namespace TaskInput{
  export type State = {
    task: string;
  }
}

class TaskInput extends React.Component<{}, TaskInput.State>{

  constructor(props: {}){
    super(props);
    this.state = {
      "task": ""
    }
  }
  
  private handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    
    this.setState({
      "task": e.target.value
    })

  }

  private handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    storePr.then(
      store => {
        store.addTask(this.state.task);
      }
    )

    this.setState({
      "task": ""
    })
  }

  render = ()=>{
    return(
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.handleChange} type="text">{this.state.task}</input>
        <input type="submit"></input>
      
      </form>
    )
  }
}



export class TodoList extends React.Component{

  render = ()=>{
    return (
      <div>
        <TaskInput/>
      </div>
    )
  }
}