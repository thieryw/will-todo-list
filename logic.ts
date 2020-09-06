

type TodoElement = {
  readonly element: string;
  readonly id: number;
  readonly isComplete: boolean;
}

type Store = {
  readonly todoElements: readonly TodoElement[];

  readonly addElement: (element: string)=> void;
  readonly removeElement: (id: number)=> void;
  readonly markOrUnMarkAsCompleted: (id: number)=> void;
  

}



async function getStorePr(): Promise<Store>{

  let todoElements: TodoElement[] = [
    {
      "element": "fuck my wife",
      "id": 0,
      "isComplete": false,
    }
  ];

  let count = 1;

  const store: Store = {
    todoElements,
    
    "addElement": element =>{
      const tempElement: TodoElement = {
        element,
        "id": count++,
        "isComplete": false,
      }
      todoElements.push(tempElement);
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
    }

  }

  await setTimeout(()=>{}, 1000);

  return store;

}

function getStore(storePr: Promise<Store>){
  let store: Store;
  storePr.then(
    value=>{
      store = value;
    }
  );

  return store;
}



const storePr = getStorePr();


export const store = getStore(storePr);

