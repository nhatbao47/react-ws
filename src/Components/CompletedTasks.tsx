import React from "react";
import { Task } from "../Models/Task";
import TaskPreview from "./TaskPreview";

interface CompletedTasksProps {
    list: Task[]
}

const CompletedTasks = (props: CompletedTasksProps) => (
  <div className="card">
    <div className="card-header text-secondary">
      <h5 className="mb-0">
        Tasks got done<i className="fa fa-cubes right-icon"></i>
      </h5>
    </div>
    <div className="card-body py-0">
      <ul className="list-group list-group-flush">
        {props.list.map((task: any) => (
          <li key={task.id} className="list-group-item px-0">
            <a>{task.title}</a>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default CompletedTasks;
