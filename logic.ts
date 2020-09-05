

type TodoElement = {
  element: string;
  id: number;
  isComplete: boolean;
}

type Store = {
  readonly todoElements: readonly TodoElement[];

  readonly addElement: (element: string)=> void;
  readonly removeElement: (id: number)=> void;
  readonly markOrUnMarkAsCompleted: (id: number)=> void;
  

}


function getStore(){
  let store: Store;

  let todoElements: TodoElement[] = [
    {
      "element": "fuck my wife",
      "id": 0,
      "isComplete": false,
    }
  ];

  let count = 1;

  store = {
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
          todoElements.splice(id, 0);
          return;
        }
      });
    },

    "markOrUnMarkAsCompleted": id =>{
      todoElements.map((elem, index)=>{
        if(id === elem.id){
          elem.isComplete = elem.isComplete ? false : true;
          return;
        }
      })
    }

  }

}


export const store = getStore();

