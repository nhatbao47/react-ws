import React from "react";
import { Task } from "../Models/Task";

interface TaskPreviewProps {
  task?: Task;
}

class TaskPreview extends React.Component<TaskPreviewProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      visible: false
    };
  }

  handlePreview(visible: boolean) {
    this.setState({ visible: visible });
  }

  render(): React.ReactNode {
    const { task } = this.props;
    if (!task) return '';

    const { visible } = this.state;

    return (
      <div className={`border border-secondary bg-light p-2 mb-3 ${!visible ? 'hidden' : ''}`}>
        <span className="pull-right" role="button" onClick={() => this.handlePreview(false)}>
          <i className="fa fa-times pointer"></i>
        </span>
        <h4 className="mt-3 text-center">
          <i>{task.title} - Detail View</i>
        </h4>
        <form>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              className="form-control"
              value={task.title}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              className="form-control"
              rows={3}
              value={task.description}
              disabled
            />
          </div>
        </form>
      </div>
    );
  }
}

export default TaskPreview;
