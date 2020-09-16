import React, {useState, useCallback, useReducer, useEffect} from "react";
import {Store} from "./logic";
import {useEvt} from "evt/hooks";
import {Evt, StatefulEvt} from "evt";




export const NewTaskForm: React.FunctionComponent<{
  newTask: (task: string)=> void;
}> = props =>{

  const { newTask: addTask }= props;

  const [textInput, setTextInput] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      
   
      if(textInput === ""){
        
        return;
      }

      addTask(textInput);
   
      setTextInput("");

    }, 
    [ addTask, textInput ]
  );

  

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={textInput} 
        onChange={useCallback(({target})=> setTextInput(target.value),[])}
      />
      <input type="submit"/>
    
    </form>
  )
}