import React, { useState } from "react";
import { User } from "../Models/User";

const NewUser = (props: any) => {
    const emptyUser: User = {
        id: 0,
        name: '',
        title: ''
    };
    const [user, setUser] = useState<User>(emptyUser);
    const handleInputChanged = (e: any) => {
        const name = e.target.name;
        let newUser = { ...user };
        (newUser as any)[name] = e.target.value;
        setUser(newUser);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const { onAddNew } = props;
        onAddNew(user);
    }

    return (
        <div className="card card-custom mb-4">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="card-header text-center">
          <input
                type="text"
                className="form-control"
                name="name"
                value={user.name}
                maxLength = { 200}
                onChange={(e) => handleInputChanged(e)}
                required
              />
          </div>
          <div className="card-body text-center">
            <p className="my-0">
              <img src="/img/user-icon.jpg" width="200" alt="" />
            </p>
            <input
                type="text"
                className="form-control mt-2"
                id="title"
                name="title"
                value={user.title}
                maxLength = { 100}
                onChange={(e) => handleInputChanged(e)}
                required
              />
            <p className="mb-1">&nbsp;</p>
          </div>
        <div className = "card-footer text-center" >
            <button type="submit" className="btn btn-sm btn-outline-secondary"><i className="fa fa-plus"></i> Create</button>
          </div>
        </form>
      </div>
    );
}

export default NewUser;