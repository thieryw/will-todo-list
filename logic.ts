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
  readonly deleteTask: (id: number)=> Promise<void>;
  
  readonly evtTaskAdded: NonPostableEvt<Readonly<Task>>;
  readonly evtToggleTask: NonPostableEvt<Readonly<Task>>;
  readonly evtTaskDeleted: NonPostableEvt<Readonly<Task>>;
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
      
      const task = tasks.find(task => task.id === id);
      if(!task){
        return;
      }

      tasks[tasks.indexOf(task)].isComplete = !task.isComplete;
    

      store.evtToggleTask.post(task);

    },
    
    "deleteTask": async id =>{
      await simulateDelay(300);
      
      const task = tasks.find(task => task.id === id);
      if(!task){
        return;
      }

      tasks.splice(tasks.indexOf(task), 1);
      
      store.evtTaskDeleted.post(task);
      
    },
    
    "evtTaskAdded": new Evt(),
    "evtToggleTask": new Evt(),
    "evtTaskDeleted": new Evt(),
  }

  await simulateDelay(3000);

  return store;
    
  
}







