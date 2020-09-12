import { Evt, NonPostableEvt, ToPostableEvt } from "evt";

type Item = {
  description: string;
  id: number;
  isComplete: boolean;
}


export type Store = {
  readonly tasks: readonly Item[];
  readonly addTask: (task: string)=> Promise<void>;
  readonly evtTaskAdded: NonPostableEvt<Item>;
}



async function getStore(): Promise<Store>{
  const tasks: Item[] = [];

  const simulateDelay = (delay: number)=>{
    return new Promise<void>(resolve => setTimeout(resolve, delay));

  }

  let count = 0;

  const store: ToPostableEvt<Store> = {
    tasks,
    "addTask": async description =>{
      
      await simulateDelay(3000);
      
      const item: Item = {
        description,
        "id": count++,
        "isComplete": false,
      }
      
      tasks.push(item);

      store.evtTaskAdded.post(item);

    },
    "evtTaskAdded": new Evt(),
  }

  return store;
    
  
}

const storePr = getStore();

export const evtStoreLoaded: Evt<Store> = new Evt();

storePr.then(
  store =>{
    evtStoreLoaded.post(store);

  }
)



