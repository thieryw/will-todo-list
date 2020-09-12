import { Evt } from "evt";

type Task = {
  task: string;
  id: number;
  isComplete: boolean;
}


type Store = {
  readonly tasks: readonly string[];
  readonly addTask: (task: string)=> Promise<void>;
  readonly evtTaskAdded: 
}