import React from "react";



type Task = {
  task: String;
  id: number;

}

type Store = {
  tasks: readonly Store[];
  addTask: (task: string) => Promise<string>;
  deleteTask: (id: number) => void;
  


}




export class TodoList extends React.Component{

  render = ()=>{
    return (
      <div>
        <p>pending</p>
      </div>
    )
  }
}