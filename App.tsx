import React, {useState, useCallback, useEffect, useReducer} from "react";


import {EventHandlers, Store, getStore} from "./logic";


export const eventHandlers: EventHandlers = {
  "onNewTaskAdded": (task: Store["tasks"][number])=>{

  }
}


const TaskForm: React.FunctionComponent = ()=>{
  
  
  
  return(
    
      <form>
        <input type="text" />
        <input type="submit" />
      </form>

    
  )
}

export const App: React.FunctionComponent = ()=>{
  return(
    <div>
      <TaskForm/>
    </div>

  )
}




















