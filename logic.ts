


type Task = {
  task: String;
  id: number;

}

export type Store = {
  
  tasks: readonly Store[];
  addTask: (task: string) => void;
  deleteTask: (id: number) => void;

  


}