import React from "react";

import {Store} from "./logic";

namespace Tasks{
  export type Props = {
    store: Store;
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
  render = ()=>{
    return(
      <div>
        {
          this.props.store === undefined ? 
          <p></p> : (this.props.store.tasks.length > 1 ? 
            <button className="clearButton" onClick={this.handleClearButton}>clear all tasks</button> : <p></p>
          )
        }
        <ul>
          {this.props.store === undefined ? "" :
            this.props.store.tasks.map(
              (cur, index) => {
                return <li key={cur.id} className={cur.isCompleted ? "complete": "notComplete"}>
                <input type="checkbox" checked={cur.isCompleted} onClick={()=> this.handleCheckBox(cur.id)}/>
                {
                  (()=>{
                    if(this.props.taskLoadinId === undefined || cur.id !== this.props.taskLoadinId){
                      return cur.task;
                    }

                    return <p className="taskLoadin">loading</p>;
                    

                  
                  })()
                }
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