import { Evt, NonPostableEvt, ToPostableEvt } from "evt";


type MutableTask = {
  description: string;
  id: number;
  isComplete: boolean;
};

type Task = Readonly<MutableTask>;

export type Store = {
  readonly tasks: readonly Task[];
  readonly addTask: (task: string)=> Promise<void>;
  readonly evtTaskAdded: NonPostableEvt<Task>;
}

export async function getStore(): Promise<Store>{
  const tasks: MutableTask[] = [];

  const simulateDelay = (delay: number)=>{
    return new Promise<void>(resolve => setTimeout(resolve, delay));

  }

  let count = 0;

  const store: ToPostableEvt<Store> = {
    tasks,
    "addTask": async description =>{
      
      await simulateDelay(3000);
      
      const task: Task = {
        description,
        "id": count++,
        "isComplete": false,
      }
      
      tasks.push(task);

      store.evtTaskAdded.post(task);

    },
    "evtTaskAdded": new Evt(),
  }

  await simulateDelay(3000);

  return store;
    
  
}







