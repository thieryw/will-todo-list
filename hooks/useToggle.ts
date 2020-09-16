import React, {useState, useCallback, useReducer, useEffect} from "react";



export function useToggle(pr: Promise<void>, setIsPending: React.Dispatch<React.SetStateAction<boolean>>, [...vars]): void{
  console.log("fuck");
  useCallback(async ()=>{
    setIsPending(true);

    await pr;

    setIsPending(false);
  },[])
}