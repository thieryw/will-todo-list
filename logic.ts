import {Evt} from "evt";

type TodoElement = {
  readonly element: string;
  readonly id: number;
  readonly isComplete: boolean;
}

export type Store = {
  readonly todoElements: readonly TodoElement[];

  readonly addElement: (element: string)=> Promise<void>;
  readonly removeElement: (id: number)=> Promise<void>;
  readonly markOrUnMarkAsCompleted: (id: number)=> Promise<void>;

  readonly evtAddElement: Evt<void>;
  readonly evtRemoveElement: Evt<Store>;
  readonly evtMarkOrUnMark: Evt<Store>;


  

}



async function getStorePr(): Promise<Store>{

  let todoElements: TodoElement[] = [
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
    todoElements,
    
    "addElement": async element =>{
 
      const tempElement: TodoElement = {
        element,
        "id": count++,
        "isComplete": false,
      };

      await setNetworkDelay(1000);

      todoElements.push(tempElement);

      store.evtAddElement.post();
      
      
    },
    
    "removeElement": async id =>{
      await setNetworkDelay(1000);
      todoElements.map((elem, index) => {
        if(id === elem.id){
          todoElements.splice(index, 1);
          return;
        }
      });

      store.evtRemoveElement.post(store);

    },

    "markOrUnMarkAsCompleted": async id =>{
      await setNetworkDelay(1000);
      todoElements.map((elem, index)=>{
        if(id === elem.id){
          (elem.isComplete as boolean) = elem.isComplete ? false : true;
          return;
        }
      });

      store.evtMarkOrUnMark.post(store);
    },

    "evtAddElement": new Evt<void>(),
    "evtRemoveElement": new Evt<Store>(),
    "evtMarkOrUnMark": new Evt<Store>(),
   

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




