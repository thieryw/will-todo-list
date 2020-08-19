import React from "react";

import {Tasks} from "./Tasks";
import {TaskInput} from "./TaskInput";

import {Store, storePr} from "./logic";









namespace TodoList{
  export type State = {
    store: Store;
    taskLoadingId: number;
    areTasksClearing: boolean;
  }
}

export class TodoList extends React.Component<{}, TodoList.State>{

  constructor(props: {}){
    super(props);
    this.state = {
      "store": undefined,
      "taskLoadingId": undefined,
      "areTasksClearing": false
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
    this.setState({
      "areTasksClearing": true
    })
    store.deleteAllTasks().then(
      ()=>{
        this.setState({
          store,
          "areTasksClearing": false
        })
      }
    );

    
  }

  render = ()=>{
   
    storePr.then(
      store =>{
        this.setState({
          store
        })
      }
    )
    
    return (
      

      <div>
      {this.state.store === undefined ? <p>loading</p> : 
      <div>
        <TaskInput addTast={this.addTask}/>
        <Tasks 
        store={this.state.store} 
        completeUncompleteTask={this.completeUncompleteTask}
        deleteTask={this.deleteTask}
        deleteAllTasks={this.deleteAllTasks}
        taskLoadinId={this.state.taskLoadingId}
        areTasksClearing={this.state.areTasksClearing}
        
        />
        </div>
      }


      </div>
    )
  }
}