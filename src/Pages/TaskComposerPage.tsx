import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Task, TaskState } from "../Models/Task";
import { Radio, RadioGroup } from "react-radio-group";
import configData from '../config.json';

interface RadioValue {
  label: string;
  value: TaskState;
}

const TaskComposerPage = () => {
  const url = configData.JSON_API_URL + 'tasks';
  const newTask: Task = {
    id: 0,
    title: '',
    description: '',
    state: TaskState.New
  };
  const [addNew, setAddNew] = useState(false);
  const [task, setTask] = useState<Task>(newTask);
  const navigate = useNavigate();
  const statusRadios: RadioValue[] = [
    {
      label: "New",
      value: TaskState.New,
    },
    {
      label: "In Progress",
      value: TaskState.Inprogress,
    },
    {
      label: "Done",
      value: TaskState.Done,
    },
  ];
  const { id } = useParams();

  useEffect(() => {
    if (parseInt(id ?? "") === 0) {
      setAddNew(true);
    } else {
      axios.get(`${url}/${id}`).then((res) => {
        setTask(res.data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (addNew) {
      axios.post(url, task)
        .then((res) => goToDashboard())
        .catch((error) => console.log(error));
    } else {
      axios.put(`${url}/${task.id}`, task)
      .then((res) => goToDashboard())
      .catch((error) => console.log(error));
    }
  };

  const handleInputChanged = (e: any, name = "") => {
    let newTask = { ...task };
    if (name === "") {
      name = e.target.name;
    }
    const value = name === "state" ? e : e.target.value;
    (newTask as any)[name] = value;
    setTask(newTask);
  };

  return (
    <React.Fragment>
      <div className="row">
        <p>
          <Link to="/dashboard" className="btn btn-sm btn-danger">
            <i className="fa fa-arrow-circle-o-left"></i> Back
          </Link>
        </p>
      </div>
      <ul className="nav nav-tabs justify-content-end" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="preview-tab"
            data-bs-toggle="tab"
            data-bs-target="#preview"
            type="button"
            role="tab"
            aria-controls="preview"
            aria-selected="false"
          >
            View
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="composer-tab"
            data-bs-toggle="tab"
            data-bs-target="#composer"
            type="button"
            role="tab"
            aria-controls="composer"
            aria-selected="true"
          >
            {addNew ? "Add" : "Edit"}
          </button>
        </li>
      </ul>
      <div className="tab-content bg-light">
        <div
          className="tab-pane fade show active"
          id="composer"
          role="tabpanel"
          aria-labelledby="composer-tab"
        >
          <div className="px-2 py-2">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="form-group">
                <label htmlFor="title" className="form-label fw-bold">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  placeholder="Insert the title..."
                  maxLength={200}
                  value={task.title}
                  onChange={(e) => handleInputChanged(e)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description" className="form-label fw-bold">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows={3}
                  placeholder="Insert suitable description..."
                  maxLength={1000}
                  value={task.description}
                  onChange={(e) => handleInputChanged(e)}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <h6 className="fw-bold">Status</h6>
                <RadioGroup
                  name="state"
                  selectedValue={task.state}
                  onChange={(e) => handleInputChanged(e, "state")}
                >
                  {statusRadios.map((radio: RadioValue, index: number) => (
                    <div key={index} className="form-check form-check-inline">
                      <Radio
                        className="form-check-input"
                        value={radio.value}
                        onChange={(e) => handleInputChanged(e)}
                        id={`rdoStatus${index}`}
                      />
                      <label htmlFor={`rdoStatus${index}`}>{radio.label}</label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="form-group mt-2">
                <p className="spacer">&nbsp;</p>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary btn-right"
                >
                  <i className="fa fa-ban"></i> Cancel
                </button>
                {!addNew && (
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger btn-right"
                  >
                    <i className="fa fa-trash"></i> Delete
                  </button>
                )}
                <button
                  type="submit"
                  className="btn btn-sm btn-primary btn-right"
                >
                  <i className="fa fa-save"></i> {addNew ? "Save" : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="preview"
          role="tabpanel"
          aria-labelledby="composer-tab"
        >
          <div className="px-2 py-2">
            <h2>{task.title}</h2>
            <p>{task.description}</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TaskComposerPage;
