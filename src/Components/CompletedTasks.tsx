import React from "react";
import { Task } from "../Models/Task";
import TaskPreview from "./TaskPreview";

interface CompletedTasksProps {
  list: Task[];
}

class CompletedTasks extends React.Component<CompletedTasksProps, any> {
  private child: any;
  constructor(props: CompletedTasksProps) {
    super(props);
    this.state = {
      selectedTask: null,
    };
  }

  handlePreview(task: Task) {
    this.setState({
      selectedTask: task,
    });
    this.child.handlePreview(true);
  }

  render(): React.ReactNode {
    const { list } = this.props;
    const { selectedTask } = this.state;

    return (
      <div className="card">
        <div className="card-header text-secondary">
          <h5 className="mb-0">
            Tasks got done<i className="fa fa-cubes right-icon"></i>
          </h5>
        </div>
        <div className="card-body py-0">
          <ul className="list-group list-group-flush">
            {list.map((task: any) => (
              <li key={task.id} className="list-group-item px-0">
                <button
                  className="btn btn-link text-dark border-0 p-0"
                  onClick={() => this.handlePreview(task)}
                >
                  {task.title}
                </button>
              </li>
            ))}
          </ul>
          <TaskPreview
            task={selectedTask}
            ref={(child) => {
              this.child = child;
            }}
          />
        </div>
      </div>
    );
  }
}

export default CompletedTasks;
