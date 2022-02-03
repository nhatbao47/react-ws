import React from "react";
import { Link } from "react-router-dom";
import EditableTasks from "./EditableTasks";

const NewTasks = (props: any) => (
  <EditableTasks
    header={
      <div className="card-header text-primary">
        <h5 className="mb-0">
          New Tasks<i className="fa fa-thumb-tack right-icon"></i>
        </h5>
      </div>
    }
    tasks={props.list}
    footer={
      <li className="list-group-item px-0">
        <Link to="/dashboard/task/0" className="btn btn-sm btn-primary">
          <i className="fa fa-tasks"></i> Add
        </Link>
      </li>
    }
  />
);

export default NewTasks;
