


export type Task = {
  task: String;
  id: number;
  isCompleted: boolean;
  

}

export type Store = {
  
  readonly tasks: readonly Task[];
  addTask: (task: string) => void;
  deleteTask: (id: number) => void;
  completeOrUncompleteTask: (id: number) => void;
  deleteAllTasks: ()=>void;
  
  


}




export async function getStore(): Promise<Store>{
  const createDelay = (delay: number) => {
    return new Promise<void>(resolve => setTimeout(resolve, delay));
  }
  
  const tasks: Task[] = [];
  let index: number = 0;
  
  await createDelay(4000);
  

  const store: Store = {
    tasks,

    "addTask": async task =>{
      
      

      const newTask: Task = {
        task,
        "id": index++,
        "isCompleted": false
      }

      tasks.push(newTask);

      


    },
    "deleteTask": id=>{
      

      tasks.map((cur, index)=> {
        if(cur.id === id){
          tasks.splice(index, 1);
        }
      })

    },

    "completeOrUncompleteTask": id=>{
      tasks.map((cur, index)=>{
        if(cur.id === id){
          cur.isCompleted = !cur.isCompleted;
        }
      })
    },

    "deleteAllTasks": ()=>{
      tasks.splice(0, tasks.length);
    }

  }

  

  return store;
}



