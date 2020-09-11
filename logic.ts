import {Evt} from "evt";

export type Task = {
  readonly element: readonly string;
  readonly id: number;
  readonly isComplete: boolean;
}

export type Store = {
  readonly todoElements: readonly Task[];

  readonly addElement: (element: string)=> Promise<void>;
  readonly removeElement: (id: number)=> Promise<void>;
  readonly markOrUnMarkAsCompleted: (id: number)=> Promise<void>;
  readonly changeElement: (id: number, newElement: string)=> Promise<void>;

  readonly evtUpdateStore: Evt<void>;


  

}



async function getStorePr(): Promise<Store>{

  let tasks: Task[] = [
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

  const store: Store = {
    tasks,
    
    "addElement": async element =>{
 
      const tempElement: Task = {
        element,
        "id": count++,
        "isComplete": false,
      };

      await setNetworkDelay(1000);

      tasks.push(tempElement);

      store.evtUpdateStore.post();
      
      
    },
    
    "removeElement": async id =>{
      await setNetworkDelay(3000);
      tasks.map((elem, index) => {
        if(id === elem.id){
          tasks.splice(index, 1);
          return;
        }
      });

      store.evtUpdateStore.post();

    },

    "markOrUnMarkAsCompleted": async id =>{
      await setNetworkDelay(3000);
      tasks.map((elem, index)=>{
        if(id === elem.id){
          (elem.isComplete as boolean) = elem.isComplete ? false : true;
          return;
        }
      });

      store.evtUpdateStore.post();
    },
    
    "changeElement": async (id, newElement) =>{
      await setNetworkDelay(1000);
      tasks.map((elem, index)=>{
        if(id === elem.id){
          (elem.element as string) = newElement;
          return;
        }
      })

      store.evtUpdateStore.post();
    },

    "evtUpdateStore": new Evt<void>(),

   

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




