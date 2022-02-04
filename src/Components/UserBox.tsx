import axios from "axios";
import React from "react";
import { User } from "../Models/User";
import configData from '../config.json';
import ConfirmationDialog from "./ConfirmationDialog";

interface UserBoxProps {
  item: User,
  onDelete: any
}

interface UserBoxState {
  isEditing: boolean,
  showDialog: boolean,
  item: User,
  originalUser: User
}

class UserBox extends React.Component<UserBoxProps, UserBoxState> {
  private url = '';

  constructor(props: any) {
    super(props);
    const { item } = props;
    this.state = {
      isEditing: false,
      showDialog: false,
      item: item,
      originalUser: item
    };
    this.url = configData.JSON_API_URL + `users/${item.id}`;
  }

  handleEditing(isEditing: boolean) {
    this.setState({isEditing: isEditing});
  }

  handleInputChanged = (e: any) => {
    const name = e.target.name;
    let newItem = { ...this.state.item };
    (newItem as any)[name] = e.target.value;
    this.setState({
      item: newItem
    });
  };

  handleCancel = () => {
    let newState = { ...this.state };
    newState.isEditing = false;
    newState.item = newState.originalUser;
    this.setState(newState);
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    const { item } = this.state;
    axios.put(this.url, item)
        .then(() => this.handleEditing(false))
        .catch((error) => console.log(error));
  }

  handleDialogShow = (show: boolean) => {
    this.setState({
      showDialog: show
    });
  }

  handleDelete = () => this.handleDialogShow(true);

  handleAccept = () => {
    const { onDelete } = this.props;
    this.handleDialogShow(false);
    axios.delete(this.url)
      .then(() => onDelete())
      .catch((error) => console.log(error));
  }

  render(): React.ReactNode {
    const { isEditing, showDialog, item } = this.state;

    return (
      <div className="card card-custom mb-4">
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div className="card-header text-center">
            {!isEditing && (
              <h6 className="my-2">
                <i className="fa fa-user"></i> {item.name}
              </h6>
            )}
            {isEditing && (
              <input
                type="text"
                className="form-control"
                name="name"
                value={item.name}
                maxLength = { 200}
                onChange={(e) => this.handleInputChanged(e)}
                required
              />
            )}
          </div>
          <div className="card-body text-center">
            <p className="my-0">
              <img src="/img/user-icon.jpg" width="200" alt="" />
            </p>
            {!isEditing && <p>{item.title}</p>}
            {isEditing && (
              <input
                type="text"
                className="form-control mt-2"
                id="title"
                name="title"
                value={item.title}
                maxLength = { 100}
                onChange={(e) => this.handleInputChanged(e)}
                required
              />
            )}
            <p className="mt-3 mb-2">
              <button className="btn btn-sm btn-custom">
                <i className="fa fa-calendar-check-o"></i> Schedules
              </button>
            </p>
          </div>
          <div className="card-footer text-center">
            { isEditing && (
              <React.Fragment>
                <button type="submit" className="btn btn-sm btn-outline-success">
                  <i className="fa fa-save"></i> Update
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => this.handleCancel()}
                >
                  <i className="fa fa-ban"></i> Cancel
                </button>
              </React.Fragment>
            )}
            { !isEditing && (
              <React.Fragment>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => this.handleEditing(true)}
                >
                <i className="fa fa-pencil"></i> Edit
                </button>
                <button type="button" className="btn btn-sm btn-danger" onClick={() => this.handleDelete()}>
                  <i className="fa fa-times"></i> Remove
                </button>
              </React.Fragment>
            )}
          </div>
        </form>
        <ConfirmationDialog
          show={showDialog}
          message={`Are you sure to delete '${item.name}' user?`}
          callback={() => this.handleAccept()}
          close={() => this.handleDialogShow(false)}/>
      </div>
    );
  }
}

export default UserBox;
