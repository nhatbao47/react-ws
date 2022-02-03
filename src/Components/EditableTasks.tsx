import React from "react";
import { Link } from "react-router-dom";
import { Task } from "../Models/Task";

interface EditableTasksProps {
  header: React.ReactElement;
  tasks: Task[];
  footer?: React.ReactElement;
}
const EditableTasks = (props: EditableTasksProps) => {
  const { header, tasks, footer } = props;
  return (
    <div className="card">
      {header}
      <div className="card-body py-0">
        <ul className="list-group list-group-flush">
          {tasks.map((task: Task) => (
            <li key={task.id} className="list-group-item px-0">
              <Link to={`/dashboard/task/${task.id}`} className="task-link">{task.title}</Link>
            </li>
          ))}
          {footer}
        </ul>
      </div>
    </div>
  );
};

export default EditableTasks;
