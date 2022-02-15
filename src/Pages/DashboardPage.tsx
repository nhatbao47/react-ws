import axios from "axios";
import React from "react";
import CompletedTasks from "../Components/CompletedTasks";
import InprogressTasks from "../Components/InprogressTasks";
import NewTasks from "../Components/NewTasks";
import { Task, TaskState } from "../Models/Task";
import configData from '../config.json';
import "./DashboardPage.css";

interface DashboardPageState {
  tasks: Task[]
}

class DashboardPage extends React.Component<any, DashboardPageState> {
  private url = configData.JSON_API_URL + 'tasks';
  constructor(props: any) {
    super(props);
    this.state = {
      tasks: [] as Task[],
    };
  }

  componentDidMount() {
    axios.get(this.url).then((res) => {
      const tasks = res.data;
      this.setState({ tasks: tasks });
    });
  }

  filterTasks(tasks: Task[], state: TaskState): Task[] {
	  return tasks.filter((task: Task) => task.state === state);
  }

  render(): React.ReactNode {
	  const { tasks } = this.state;
	  const newTasks = this.filterTasks(tasks, TaskState.New);
	  const inprogressTasks = this.filterTasks(tasks, TaskState.Inprogress);
	  const completedTasks = this.filterTasks(tasks, TaskState.Done);

    return (
      <div className="row">
        <div className="col-md-3">
          <NewTasks list={newTasks}></NewTasks>
        </div>
        <div className="col-md-3">
          <InprogressTasks list={inprogressTasks}></InprogressTasks>
        </div>
        <div className="col-md-3">
          <CompletedTasks list={completedTasks}></CompletedTasks>
        </div>
      </div>
    );
  }
}

export default DashboardPage;
