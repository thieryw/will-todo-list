import React from "react";



import {Store, getStore, Task} from "./logic";



const storePr = getStore();

namespace TaskInput{
  export type State = {
    task: string;
    loadingMsg: string;
  }

  export type Props = {
    addTast: (store: Store)=>void;
  }
}

class TaskInput extends React.Component<TaskInput.Props, TaskInput.State>{

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

namespace Tasks{
  export type Props = {
    store: Store;
    completeUncompleteTask: (taskId: number)=>void;
    deleteTask: (id: number)=> void;
    deleteAllTasks: ()=>void;
  }


}

class Tasks extends React.Component<Tasks.Props>{



  private handleCheckBox(id: number){
    this.props.completeUncompleteTask(id);
  }

  private handleDelete(id: number){
    this.props.deleteTask(id);
  }

  private handleClearButton = ()=>{
    this.props.deleteAllTasks();
  }
  render = ()=>{
    return(
      <div>
        {
          this.props.store === undefined ? 
          <p></p> : (this.props.store.tasks.length > 1 ? 
            <button onClick={this.handleClearButton}>clear all tasks</button> : <p></p>
          )
        }
        <ul>
          {this.props.store === undefined ? "" :
            this.props.store.tasks.map(
              (cur, index) => {
                return <li className={cur.isCompleted ? "complete": "notComplete"}>
                <input type="checkbox" onClick={()=> this.handleCheckBox(cur.id)}/>
                {cur.task}
                <p onClick={()=> this.handleDelete(cur.id)}>X</p>
                </li>
                
                
              }
            )
          }
          
        </ul>
      </div>

    )
  }
}

namespace TodoList{
  export type State = {
    store: Store;
  }
}

export class TodoList extends React.Component<{}, TodoList.State>{

  constructor(props: {}){
    super(props);
    this.state = {
      "store": undefined
    }
  }


  private addTask = (store: Store)=>{
    this.setState({
      store
    })

    

  }

  private completeUncompleteTask = (id: number)=>{
    const state = this.state;
    state.store.completeOrUncompleteTask(id);

    this.setState({
      "store": state.store
    })
    
  }

  private deleteTask = (id: number)=>{
    const state = this.state;
    state.store.deleteTask(id);

    this.setState({
      "store": state.store
    })
  }

  private deleteAllTasks = ()=>{
    const state = this.state;
    state.store.d
  }

  render = ()=>{
    return (
      <div>
        <TaskInput addTast={this.addTask}/>
        <Tasks 
        store={this.state.store} 
        completeUncompleteTask={this.completeUncompleteTask}
        deleteTask={this.deleteTask}
        />
      </div>
    )
  }
}