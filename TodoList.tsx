import React from "react";


type Store = {
    readonly tasks: readonly string[];
    addTask(task: string): void;
    removeTask(index: number): void;
    removeAllTasks(): void;
};




async function getStore(): Promise<Store>{
  
  await new Promise(resolve => setTimeout(resolve, 5000));

  const tasks: string[] = [];

  const store: Store = {
    tasks,
    "addTask": task =>{
      tasks.push(task);
    },
    "removeTask": index=> {
      tasks.splice(index, 1);
    },
    "removeAllTasks": ()=>{
      tasks.splice(0, store.tasks.length);
    }
  }

  return store;
}

const storePr = getStore();


namespace TaskInput {

    export type State = {
        text: string;
        loadingText: string;
    };

    export type Props = {
      updateTasks: (store: Store) => void;
    
    };

}

class TaskInput extends React.Component<TaskInput.Props, TaskInput.State>{

    constructor(props: TaskInput.Props) {
        super(props);
        this.state = { 
          "text": "" , 
          "loadingText": ""
          };
    }

    

    private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ "text": e.target.value })
    };

    private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const text = this.state.text;
        this.setState({
          "loadingText": "loading"
        })


        storePr.then(
          store => {
            store.addTask(text);
            this.props.updateTasks(store);
            this.setState({
              "loadingText": ""
            })
          
            
            
            
          }
        )
        this.setState({ "text": "" });
        
    };

    render = () => {
      
      return (
      
        <form onSubmit={this.handleSubmit}>
            <legend>add to list</legend>
            <input
                value={this.state.text}
                type="text"
                onChange={this.handleChange}
            />
            <input type="submit" value="submit" />
            <p>{this.state.loadingText}</p>
        </form>
      )
    };

}





namespace Tasks{
  export type Props = {
    store: Store;
    deleteTask: (index: number)=>void;
    
  }
}

class Tasks extends React.Component<Tasks.Props>{

  private handleDelete(index){
  
    this.props.deleteTask(index);
   
  }

  render = ()=>{
    
    return(
      <ul>
        {
    
          this.props.store === undefined ? 
          <div></div> : 
          this.props.store.tasks.map(
            (cur, index) => <li key={index}>{cur} <p onClick={()=> this.handleDelete(index)}>X</p></li>
            )
            
          
        }

      </ul>
    )
  }

}

namespace TodoList{
  export type State = {
    store: Store;
    
  }
}
export class TodoList extends React.Component<{}, TodoList.State>{

  constructor(props: {}){
    super(props);

    this.state = {
      "store": undefined,
      

    }

   
  }

  private updateTasks = (store: Store)=>{
      this.setState({
        "store": store
      })
  }

  private deleteTask = index => {

    const store = this.state.store;
    store.removeTask(index);
    this.setState({
      store
    })
    
  }



  render = ()=>{
    
    return(
      <div>
        <TaskInput updateTasks={this.updateTasks}/>
        <Tasks store={this.state.store} deleteTask={this.deleteTask}/>
        
      </div>
    )
  }
}


/*namespace Store {

    export async function fetch(): Promise<Store>{

        await new Promise(resolve=> setTimeout(resolve,1000));

        const tasks: string[] = [];

        const store: Store = {
            tasks,
            "addTask": element=> {
                tasks.push(element);
            },
            "removeTask": index => {
                tasks.splice(index, 1);
            },
            "removeAllTasks": ()=> {
                tasks.splice(0, store.tasks.length);
            }
        };

        return store;

    }

}


(async ()=>{

    const store = await Store.fetch();


})();*/


//const pr = Promise.resolve(3);

/*
const pr = new Promise<number>((resolve, reject)=> {

  if( Date.now() % 2 === 0 ) {
    resolve(44);
  }else{
    reject(new Error("foo"));
  }

});
*/


/*
function getNumber(): Promise<number> {

  return new Promise<number>((resolve, reject)=> {

    setTimeout(()=>{

      if( Date.now() % 2 === 0 ) {
        resolve(44);
      }else{
        reject(new Error("foo"));
      }

    }, 1000);

  });

}
*/

/*async function getNumber(): Promise<number> {

  await new Promise(resolve=> setTimeout(resolve, 1000));

  if( Date.now() % 2 === 0 ) {
    return 44;
  }else{
    throw new Error("foo");
  }

}





(async ()=>{

  console.log("b");

  const n = await getNumber()
    .catch(error=> error as Error);

  if( n instanceof Error){
    console.log(n.message);
    return;
  }

  console.log(n);


})();





console.log("d");

*/

















