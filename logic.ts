type Task = Readonly<{
  description: string;
  id: number;
  isComplete: boolean;
}>

export type EventHandlers = {
  onNewTaskAdded: (newTask: Task)=> void;
}

export type Store = Readonly<{
  tasks: readonly Task[];
  addNewTask: (description: string)=>Promise<void>;
  
}>


export async function getStore(params: {eventHandlers: EventHandlers}): Promise<Store> {
  const tasks: Task[] = [];
  let count = 0;

  const store: Store = {
    tasks,
    "addNewTask": async description =>{

      const newTask: Task = {
        description,
        "id": count++,
        "isComplete": false,
      }
      tasks.push(newTask);

      params.eventHandlers.onNewTaskAdded(newTask);



    }
  }

  return store;

}