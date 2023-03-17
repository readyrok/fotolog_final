import React, { useState, useEffect, Fragment } from "react";
import './BoardAdmin.css'
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

const BoardAdmin = () => {
  const [content, setContent] = useState("");
  const [users, setUsers] = useState({});

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setUsers(response.data);
        console.log(response.data);
        console.log(users);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
        <Fragment>
          <h3 className="admin-header">.ADMIN BOARD</h3>
          <div className="user-list">
            {users.map((user) => {
              return(<div className='user' key={user.id}>
                    <div>{user.email}</div>
                    <button className="delete-btn">.DELETE</button>
                </div>);
            })}
          </div>
        </Fragment>
  );
};

export default BoardAdmin;