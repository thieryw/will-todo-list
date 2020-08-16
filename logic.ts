


export type Task = {
  task: String;
  id: number;

}

export type Store = {
  
  readonly tasks: readonly Task[];
  addTask: (task: string) => Promise<Task>;
  deleteTask: (id: number) => void;

  


}




export async function getStore(): Promise<Store>{
  const createDelay = (delay: number) => {
    return new Promise<void>(resolve => setTimeout(resolve, delay));
  }
  
  const tasks: Task[] = [];
  let index: number = 0;
  
  await createDelay(700);
  

  const store: Store = {
    tasks,

    "addTask": async task =>{
      
      await createDelay(400);

      const newTask: Task = {
        task,
        "id": index++
      }

      tasks.push(newTask);

      return newTask;


    },
    "deleteTask": id=>{
      

      tasks.map((cur, index)=> {
        if(cur.id === id){
          tasks.splice(index, 1);
        }
      })

    }
  }

  return store;
}



