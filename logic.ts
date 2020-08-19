


type Task = {
  readonly task: String;
  readonly id: number;
  readonly isCompleted: boolean;
 
 

}


let id = 0;

function getTask(task: string): Task{
 
  
  
  const taskInstance: Task = {
    "id": id++,
    "isCompleted": false,
    task,
   
 

    
  }

  return taskInstance;
}


export type Store = {
  
  readonly tasks: readonly Task[];
  addTask: (task: string) => Promise<void>;
  deleteTask: (id: number) => void;
  completeOrUncompleteTask: (id: number) => void;
  deleteAllTasks: ()=>void;
  
}

async function getStore(): Promise<Store>{
  const createDelay = (delay: number) => {
    return new Promise<void>(resolve => setTimeout(resolve, delay));
  }
  
  await createDelay(4000);
  const tasks: Task[] = [];
  

  const store: Store = {
    tasks,

    "addTask": async task =>{
      await createDelay(400);


      tasks.push(getTask(task));
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
          (cur.isCompleted as boolean) = !cur.isCompleted;
        }
      })
    },

    "deleteAllTasks": ()=>{
      tasks.splice(0, tasks.length);
    }

  }

  return store;
}

export const storePr = getStore();

