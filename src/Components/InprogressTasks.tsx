import React from "react";
import EditableTasks from "./EditableTasks";

const InprogressTasks = (props: any) => (
  <EditableTasks
    header={
      <div className="card-header text-success">
        <h5 className="mb-0">
          Tasks in progress
          <i className="fa fa-hourglass right-icon" aria-hidden="true"></i>
        </h5>
      </div>
    }
    tasks={props.list}
  />
);

export default InprogressTasks;