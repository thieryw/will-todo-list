import React from "react";

import {Tasks} from "./Tasks";
import {TaskInput} from "./TaskInput";

import {Store} from "./logic";









namespace TodoList{
  export type State = {
    store: Store;
    taskLoadingId: number;
  }
}

export class TodoList extends React.Component<{}, TodoList.State>{

  constructor(props: {}){
    super(props);
    this.state = {
      "store": undefined,
      "taskLoadingId": undefined
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
      "taskLoadingId": id
    })
    store.completeOrUncompleteTask(id).then(
      ()=>{
        this.setState({
          store,
          "taskLoadingId": undefined
        })
      }
    );

    
    
  }

  private deleteTask = (id: number)=>{
    const store = this.state.store;
    this.setState({
      "taskLoadingId": id
    })
    store.deleteTask(id).then(
      ()=>{
        this.setState({
          store,
          "taskLoadingId": undefined
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
        taskLoadinId={this.state.taskLoadingId}
        
        />
      </div>
    )
  }
}