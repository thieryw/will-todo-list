


type Task = {
  task: String;
  id: number;

}

export type Store = {
  
  readonly tasks: readonly Task[];
  addTask: (task: string) => void;
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
      await createDelay(700);

      tasks.push({
        task,
        "id": index++
      })


    },
    "deleteTask": async id=>{
      await createDelay(700);

      tasks.map((cur, index)=> {
        if(cur.id === id){
          tasks.splice(index, 1);
        }
      })

    }
  }

  return store;
}



