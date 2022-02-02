import React from "react";
import { User } from "../Models/User";

interface UserBoxProps {
  item: User;
}

interface UserBoxState {
  isEditing: boolean;
  originalUser: User;
}

class UserBox extends React.Component<UserBoxProps, UserBoxState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isEditing: false,
      originalUser: props.item,
    };
  }

  handleEditing(isEditing: boolean) {
    let newState = { ...this.state };
    newState.isEditing = isEditing;
    this.setState(newState);
  }

  render(): React.ReactNode {
    const { isEditing } = this.state;
    const { item } = this.props;
    return (
      <div className="card card-custom mb-4">
        <form>
          <div className="card-header text-center">
            {!isEditing && (
              <h6 className="my-2">
                <i className="fa fa-user"></i> {item.name}
              </h6>
            )}
            {isEditing && (
              <input
                type="text"
                className={`form-control ${!isEditing ? "hidden" : ""}`}
                id="name"
                name="name"
                value={item.name}
                maxLength={200}
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
                maxLength={100}
                required
              />
            )}
            <p className="mt-3 mb-2">
              <button className="btn btn-sm btn-custom">
                <i className="fa fa-calendar-check-o"></i>
                Schedules
              </button>
            </p>
          </div>
          <div className="card-footer text-center">
            {isEditing && (
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => this.handleEditing(false)}
              >
                <i className="fa fa-ban"></i> Cancel
              </button>
            )}
            {isEditing && (
              <button type="submit" className="btn btn-sm btn-outline-success">
                <i className="fa fa-save"></i> Update
              </button>
            )}
            {!isEditing && (
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => this.handleEditing(true)}
              >
                <i className="fa fa-pencil"></i> Edit
              </button>
            )}
            <button type="button" className="btn btn-sm btn-danger">
              <i className="fa fa-times"></i>
              Remove
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default UserBox;
