import React from "react";



import {Store, getStore, Task} from "./logic";



const storePr = getStore();

namespace TaskInput{
  export type State = {
    task: string;
  }

  export type Props = {
    addTast: (store: Task)=>void;
  }
}

class TaskInput extends React.Component<TaskInput.Props, TaskInput.State>{

  constructor(props: TaskInput.Props){
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
        store.addTask(this.state.task).then(
          task =>{
              this.props.addTast(task);
          }

        )

      

        console.log(store.tasks);
        
        this.setState({
          "task": ""
        })
      }
    )

    
  }

  render = ()=>{
    return(
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.handleChange} type="text" value={this.state.task}/>
        <input type="submit"/>
      
      </form>
    )
  }
}

namespace Tasks{
  export type Props = {
    store: Tasks
  }
}

class Tasks extends React.Component<Tasks.Props>{


  render = ()=>{
    return(

      <ul>
        {this.props.store === undefined ? "loading" :
          this.props.store.tasks.map(
            (cur, index) => {
              return <li>{cur.task}</li>
              
              
            }
          )
        }
        
      </ul>

    )
  }
}

namespace TodoList{
  export type State = {
    task: Tasks;
  }
}

export class TodoList extends React.Component<{}, TodoList.State>{

  constructor(props: {}){
    super(props);
    this.state = {
      "task": ""
    }
  }


  private addTask = (store: Tasks)=>{
    this.setState({
      s
    })

    

  }

  render = ()=>{
    return (
      <div>
        <TaskInput addTast={this.addTask}/>
        <Tasks store={this.state.store}/>
      </div>
    )
  }
}