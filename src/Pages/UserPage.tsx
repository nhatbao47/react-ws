import axios from "axios";
import React from "react";
import UserBox from "../Components/UserBox";
import { User } from "../Models/User";
import configData from '../config.json';
import NewUser from "../Components/NewUser";

interface UserPageState {
  newUserVisible: boolean;
  users: User[];
}

class UserPage extends React.Component<any, UserPageState> {
  private url = configData.JSON_API_URL + "users";
  constructor(props: any) {
    super(props);
    this.state = {
      newUserVisible: false,
      users: [],
    };
  }

  componentDidMount() {
    axios.get(this.url).then((res) => {
      this.setState({
        users: res.data
      })
    });
  }

  handleNewUserVisibility = (visible: boolean) => {
    this.setState({
      newUserVisible: visible
    });
  }

  handleUserAddNew = (newUser: User) => {
    axios.post(this.url, newUser)
      .then((res) => {
        this.handleNewUserVisibility(false);
        let users = this.state.users;
        users.push(res.data);
        this.setState({
          users: users
        });
      })
      .catch((error) => console.log(error));
  }

  handleUserDelete = (id: number) => {
    let users = this.state.users.filter((user) => user.id !== id);
    this.setState({
      users: users
    });
  }

  render(): React.ReactNode {
    const { newUserVisible, users } = this.state;

    return (
      <React.Fragment>
        <div className="button-group">
          {!newUserVisible && (
            <button type="button" className="btn btn-sm btn-custom" onClick={() => this.handleNewUserVisibility(true)}>
              <i className="fa fa-user-plus"></i> Add
            </button>
          )}
          {newUserVisible && (
            <button type="button" className="btn btn-sm btn-danger" onClick={() => this.handleNewUserVisibility(false)}>
              <i className="fa fa-ban"></i> Cancel
            </button>
          )}
        </div>
        <div className="row">
          {users.map((user: User) => (
            <div key={user.id} className="col-md-3">
              <UserBox item={user} onDelete={() => this.handleUserDelete(user.id)} />
            </div>
          ))}
        { newUserVisible && <div className="col-md-3" > <NewUser onAddNew={(e: any) => this.handleUserAddNew(e)}/></div>}
        </div>
      </React.Fragment>
    );
  }
}

export default UserPage;
