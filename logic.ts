import { Evt, NonPostableEvt, ToPostableEvt } from "evt";

export type Task = {
  element: string;
  id: number;
  isComplete: boolean;
}

export type Store = {
  readonly tasks: Task[];

  readonly addElement: (element: string)=> Promise<void>;
  readonly removeElement: (id: number)=> Promise<void>;
  readonly markOrUnMarkAsCompleted: (id: number)=> Promise<void>;
  readonly changeElement: (id: number, newElement: string)=> Promise<void>;

  readonly evtUpdateStore: NonPostableEvt<{ 
    type: "TASK ADDED" | "TASK DELETED" | "TASK UPDATED"
    task: Task; 
  }>;



  

}



async function getStorePr(): Promise<Store>{

  const tasks: Task[] = [     
    {
      "element": "fuck my wife",
      "id": 0,
      "isComplete": false,
    },
    {
      "element": "do a poo in the loo",
      "id": 1,
      "isComplete": false,
    }
  ];

  const setNetworkDelay = (delay: number)=> {
    return new Promise<void>(resolve=> setTimeout(resolve, delay));
  }

  let count = 2;

  const evtUpdateStore: ToPostableEvt<Store["evtUpdateStore"]> = new Evt();

  const store: Store = {
    tasks,
    "addElement": async element =>{
 
      await setNetworkDelay(1000);

      const task: Task = {
        element,
        "id": count++,
        "isComplete": false
      };

      tasks.push(task);

      evtUpdateStore.post({ "type": "TASK ADDED", task });
      
      
    },
    
    "removeElement": async id =>{
      await setNetworkDelay(3000);

      const task = tasks.find(task => task.id === id );

      if( !task ){
        return;
      }

      tasks.splice(tasks.indexOf(task),1)

      evtUpdateStore.post();
    },

    "markOrUnMarkAsCompleted": async id =>{
      await setNetworkDelay(3000);
      tasks.map((elem, index)=>{
        if(id === elem.id){
          elem.isComplete = !elem.isComplete;
          return;
        }
      });


      evtUpdateStore.post();
    },
    
    "changeElement": async (id, newElement) =>{
      await setNetworkDelay(1000);
      tasks.map((elem, index)=>{
        if(id === elem.id){
          (elem.element as string) = newElement;
          return;
        }
      })

      
      evtUpdateStore.post();
    },
    evtUpdateStore
  }

  await setNetworkDelay(3000);

  return store;

}

export const evtStore = new Evt<Store>();



const storePr = getStorePr();


storePr.then(
  store =>{
    evtStore.post(store);
  }
)




