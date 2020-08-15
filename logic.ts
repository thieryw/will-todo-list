


type Task = {
  task: String;
  id: number;

}

export type Store = {
  
  readonly tasks: readonly Store[];
  addTask: (task: string) => void;
  deleteTask: (id: number) => void;

  


}




export async function getStore(): Promise<Store>{
  const createDelay = (delay: number) => {
    return new Promise<void>(resolve => setTimeout(resolve, delay));
  }

  await createDelay(700);
  const tasks: Task[] = [];

  const store: Store = {
    tasks

    "addTask": task =>{

    },
    "deleteTask": id=>{

    }
  }
}



