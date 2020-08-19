


type Task = {
  readonly task: String;
  readonly id: number;
  readonly isCompleted: boolean;
 
 

}





export type Store = {
  
  readonly tasks: readonly Task[];
  addTask: (task: string) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  completeOrUncompleteTask: (id: number) => Promise<void>;
  deleteAllTasks: ()=> Promise<void>;
  
}

async function getStore(): Promise<Store>{
  const createDelay = (delay: number) => {
    return new Promise<void>(resolve => setTimeout(resolve, delay));
  }
  
  await createDelay(4000);
  const tasks: Task[] = [];
  let id = 0;
  

  const store: Store = {
    tasks,

    "addTask": async task =>{
      await createDelay(400);

      const newTask: Task = {
        "id": id++,
        "isCompleted": false,
        task
      }


      tasks.push(newTask);
    },
    
    "deleteTask": async id=>{
      await createDelay(400);
      
      tasks.map((cur, index)=> {
        if(cur.id === id){
          tasks.splice(index, 1);
        }
      })

    },

    "completeOrUncompleteTask": async id=>{
      await createDelay(400);
      tasks.map((cur, index)=>{
        if(cur.id === id){
          (cur.isCompleted as boolean) = !cur.isCompleted;
        }
      })
    },

    "deleteAllTasks": async ()=>{
      await createDelay(800);
      tasks.splice(0, tasks.length);
    }

  }

  return store;
}

export const storePr = getStore();

