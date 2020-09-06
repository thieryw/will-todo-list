import {Evt} from "evt";

export type TodoElement = {
  readonly element: string;
  readonly id: number;
  readonly isComplete: boolean;
}

export type Store = {
  readonly todoElements: readonly TodoElement[];

  readonly addElement: (element: string)=> Promise<void>;
  readonly removeElement: (id: number)=> void;
  readonly markOrUnMarkAsCompleted: (id: number)=> void;

  readonly evtElement: Evt<TodoElement>;
  

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

  let count = 1;

  const store: Store = {
    todoElements,
    
    "addElement": async element =>{
      await new Promise<void>(resolve => setTimeout(resolve, 1000));
      const tempElement: TodoElement = {
        element,
        "id": count++,
        "isComplete": false,
      }
      
      store.evtElement.post(tempElement);
    },
    
    "removeElement": id =>{
      todoElements.map((elem, index) => {
        if(id === elem.id){
          todoElements.splice(index, 1);
          return;
        }
      });
    },

    "markOrUnMarkAsCompleted": id =>{
      todoElements.map((elem, index)=>{
        if(id === elem.id){
          (elem.isComplete as boolean) = elem.isComplete ? false : true;
          return;
        }
      })
    },

    "evtElement": new Evt<TodoElement>(),

  }

  await new Promise<void>(resolve=> setTimeout(resolve, 3000));

  return store;

}

export const evtStore = new Evt<Store>();



const storePr = getStorePr();


storePr.then(
  store =>{
    evtStore.post(store);
  }
)




