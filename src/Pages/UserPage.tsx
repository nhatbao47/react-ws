import axios from "axios";
import React from "react";
import UserBox from "../Components/UserBox";
import { User } from "../Models/User";

interface UserPageState {
  newUserVisible: boolean;
  users: User[];
}

class UserPage extends React.Component<any, UserPageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      newUserVisible: false,
      users: [],
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/users`).then((res) => {
      const users = res.data;
      let newState = { ...this.state };
      newState.users = users;
      this.setState(newState);
    });
  }

  render(): React.ReactNode {
    const { newUserVisible, users } = this.state;

    return (
      <React.Fragment>
        <div className="button-group">
          {!newUserVisible && (
            <button type="button" className="btn btn-sm btn-custom">
              <i className="fa fa-user-plus"></i> Add
            </button>
          )}
          {newUserVisible && (
            <button type="button" className="btn btn-sm btn-danger">
              <i className="fa fa-ban"></i> Cancel
            </button>
          )}
        </div>
        <div className="row">
          {newUserVisible && <div className="col-md-3">New-User</div>}
          {users.map((user: User) => (
            <div className="col-md-3">
              <UserBox item={user} />
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default UserPage;
