import React from "react";


type Store = {
    readonly tasks: readonly string[];
    addTask(task: string): void;
    removeTask(index: number): void;
    removeAllTasks(): void;
};

const tasks: string[] = [];

const store: Store = {
  tasks,
  "addTask": task => {
    tasks.push(task);
  },
  "removeTask": index => {
    tasks.splice(index, 1);
  },
  "removeAllTasks": ()=>{
    tasks.splice(0, store.tasks.length);
  }
}




namespace TaskInput {

    export type State = {
        text: string;
    };

}


class TaskInput extends React.Component<{}, TaskInput.State>{

    constructor(props: {}) {
        super(props);
        this.state = { "text": "" };
    }

    private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ "text": e.target.value })
    };

    private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        store.addTask(this.state.text);
        this.setState({ "text": "" })
        console.log(store.tasks);
    };

    render = () => (
        <form onSubmit={this.handleSubmit}>
            <legend>add to list</legend>
            <input
                value={this.state.text}
                type="text"
                onChange={this.handleChange}
            />
            <input type="submit" value="submit" />
        </form>
    );

}

namespace Tasks{
  export type Props = {
    tasks: string[];    
  }
}


class Tasks extends React.Component<Tasks.Props>{

  render = ()=>{
    return(
      <ul>
        {
          
        }

      </ul>
    )
  }

}

export class TodoList extends React.Component{
  
  render = ()=>{
    return(
      <div>
        <TaskInput/>
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

















