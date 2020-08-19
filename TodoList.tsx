import React from "react";

import {Tasks} from "./Tasks";
import {TaskInput} from "./TaskInput";

import {Store} from "./logic";









namespace TodoList{
  export type State = {
    store: Store;
    taskLoadingText: string;
  }
}

export class TodoList extends React.Component<{}, TodoList.State>{

  constructor(props: {}){
    super(props);
    this.state = {
      "store": undefined,
      "taskLoadingText": ""
    }
  }


  private addTask = (store: Store)=>{
    this.setState({
      store
    })

    

  }

  private completeUncompleteTask = (id: number)=>{
    const store = this.state.store;
    this.setState({
      "taskLoadingText": "loading"
    })
    store.completeOrUncompleteTask(id).then(
      ()=>{
        this.setState({
          store,
          "taskLoadingText": ""
        })
      }
    );

    
    
  }

  private deleteTask = (id: number)=>{
    const store = this.state.store;
    store.deleteTask(id).then(
      ()=>{
        this.setState({
          store
        });
      }
    )

 
  }

  private deleteAllTasks = ()=>{
    const store = this.state.store;
    store.deleteAllTasks().then(
      ()=>{
        this.setState({
          store
        })
      }
    );

    
  }

  render = ()=>{
    return (
      <div>
        <TaskInput addTast={this.addTask}/>
        <Tasks 
        store={this.state.store} 
        completeUncompleteTask={this.completeUncompleteTask}
        deleteTask={this.deleteTask}
        deleteAllTasks={this.deleteAllTasks}
        
        />
      </div>
    )
  }
}