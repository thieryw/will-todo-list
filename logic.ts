import { Evt, NonPostableEvt, ToPostableEvt } from "evt";


type Task = {
  description: string;
  id: number;
  isComplete: boolean;
};


export type Store = Readonly<{
  readonly tasks: readonly Readonly<Task>[];
  readonly addTask: (task: string)=> Promise<void>;
  readonly toogleTask: (id: number)=> Promise<void>;
  readonly evtTaskAdded: NonPostableEvt<Readonly<Task>>;
  readonly evtToggleTask: NonPostableEvt<Readonly<Task>>;
}>;

export async function getStore(): Promise<Store>{
  const tasks: Task[] = [
    {
      "description": "learn everything",
      "id": -1,
      "isComplete": false,
    }
  ];

  const simulateDelay = (delay: number)=>{
    return new Promise<void>(resolve => setTimeout(resolve, delay));

  }

  let count = 0;

  const store: ToPostableEvt<Store> = {
    tasks,
    "addTask": async description =>{
      
      await simulateDelay(300);
      
      
      const task: Task = {
        description,
        "id": count++,
        "isComplete": false,
      }
      
      tasks.push(task);

      store.evtTaskAdded.post(task);

    },
    "toogleTask": async id =>{
      await simulateDelay(300);
      let changedTask: Task;
      tasks.forEach(task=>{
        if(task.id !== id){
          return;
        }
        task.isComplete = !task.isComplete;
        changedTask = task;
      })

      store.evtToggleTask.post(changedTask);
    },
    "evtTaskAdded": new Evt(),
    "evtToggleTask": new Evt(),
  }

  await simulateDelay(3000);

  return store;
    
  
}







