type Task = Readonly<{
  description: string;
  id: number;
  isComplete: boolean;
}>



export type Store = Readonly<{
  tasks: readonly Task[];
  addNewTask: (description: string)=>Promise<void>;
  
}>


export async function getStore(): Promise<Store> {
  const tasks: Task[] = [];
  let count = 0;

  const simulateNetworkDelay = ()=>{
    return new Promise<void>(resolve => setTimeout(resolve, 3000));
  }

  const store: Store = {
    tasks,
    "addNewTask": async description =>{

      const newTask: Task = {
        description,
        "id": count++,
        "isComplete": false,
      }
      tasks.push(newTask);

  


    }
  }

  await simulateNetworkDelay();

  return store;

}