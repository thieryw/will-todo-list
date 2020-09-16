import { Evt, NonPostableEvt, ToPostableEvt } from "evt";


export type Task = {
  description: string;
  id: number;
  isComplete: boolean;
};


export type Store = Readonly<{
  tasks: readonly Readonly<Task>[];
  addTask: (task: string)=> Promise<void>;
  toggleTask: (id: number)=> Promise<void>;
  deleteTask: (id: number)=> Promise<void>;
  changeTask: (id: number, newTask: string)=> Promise<void>;
  
  evtTaskAdded: NonPostableEvt<Readonly<Task>>;
  evtTaskDeleted: NonPostableEvt<Readonly<Task>>;
  evtTaskUpdated: NonPostableEvt<Readonly<{task: Task; updateType: "IS COMPLETE" | "DESCRIPTION"}>>;
  
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
    
    "toggleTask": async id =>{
      await simulateDelay(300);
      
      const task = tasks.find(task => task.id === id);
      if(!task){
        return;
      }

      tasks[tasks.indexOf(task)].isComplete = !task.isComplete;
    

      store.evtTaskUpdated.post({task, "updateType": "IS COMPLETE"});
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
    "changeTask": async (id, taskStr) =>{
      await simulateDelay(300);

      const index = tasks.findIndex(task => task.id === id);
    

      tasks[index].description = taskStr;

      

      store.evtTaskUpdated.post({"task": tasks[index], "updateType": "DESCRIPTION"});
    },
    
    "evtTaskAdded": new Evt(),
    "evtTaskDeleted": new Evt(),
    "evtTaskUpdated": new Evt(),
  }

  await simulateDelay(3000);

  return store;
    
  
}







