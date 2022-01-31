import React from "react";

const TaskPreview = () => (
  <div className="border border-secondary bg-light p-2 mb-3">
    <span className="pull-right" role="button">
      <i className="fa fa-times pointer"></i>
    </span>
    <h4 className="mt-3 text-center">
      <i>task.title - Detail View</i>
    </h4>
    <form>
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          className="form-control"
          value="{{task.title}}"
          disabled
        />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea className="form-control" rows={3} defaultValue={'abc'} disabled>
          task.description
        </textarea>
      </div>
    </form>
  </div>
);

export default TaskPreview;
