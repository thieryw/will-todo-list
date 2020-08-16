import React from "react";

import {Store} from "./logic";

namespace Tasks{
  export type Props = {
    store: Store;
    completeUncompleteTask: (taskId: number)=>void;
    deleteTask: (id: number)=> void;
    deleteAllTasks: ()=>void;
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