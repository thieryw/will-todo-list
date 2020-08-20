import React from "react";

import {Store} from "./logic";

namespace Tasks{
  export type Props = {
    store: Store | undefined;
    completeUncompleteTask: (taskId: number)=>void;
    deleteTask: (id: number)=> void;
    deleteAllTasks: ()=>void;
    taskLoadinId: number;
    areTasksClearing: boolean;
  }


}



export class Tasks extends React.Component<Tasks.Props>{



  private handleCheckBox(id: number){
    this.props.completeUncompleteTask(id);
    
  }

  private handleDelete(id: number){
    this.props.deleteTask(id);
  }

  private handleClearButton = ()=>{
    this.props.deleteAllTasks();
  }

  private callbackByTask = (()=>{

    const map = new Map<number, {inputClick: ()=> void; pClick: ()=> void; }>();

    this.props.store.tasks.forEach(({id})=>
      map.set(id, {
        "inputClick": ()=> this.handleCheckBox(id),
        "pClick": ()=> this.handleDelete(id)
      })
    );


    return map;

  })();


  render = ()=>{
    return(
      <div>
        {
          this.props.store === undefined ? 
          <p></p> : (this.props.store.tasks.length > 1 ? 
            <button className="clearButton" onClick={this.handleClearButton}>
              {this.props.areTasksClearing ? <p className="clearLoading">loading</p> : "Clear all tasks"}
            </button> : 
            <p></p>
          )
        }
        <ul>
          {this.props.store === undefined ? "" :
            this.props.store.tasks.map(
              (cur, index) => 
                <li 
                  key={cur.id} 
                  className={cur.isCompleted ? "complete": "notComplete"}>
                  <input 
                    type="checkbox" checked={cur.isCompleted} 
                    onClick={this.callbackByTask.get(cur.id)!.inputClick}
                  />
                  {
                  this.props.taskLoadinId === undefined || cur.id !== this.props.taskLoadinId ?
                    cur.task
                    :
                    <p className="taskLoadin">loading</p>
                  }
                  <p onClick={this.callbackByTask.get(cur.id)!.pClick}>X</p>
                </li>
                
                
              
            )
          }
          
        </ul>
      </div>

    )
  }
}