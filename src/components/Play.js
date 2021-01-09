import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { URL_PATH } from "../config/urlPath";
import PlayCard from "./PlayCard";

export default function Play(props) {
  const [users, setUsers] = useState(props.location.state.users || []);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [randomNumber, setRandomNumber] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const random = Math.floor(Math.random() * (9 - 1 + 1) + 1);
    setRandomNumber(random);
  }, []);

  useEffect(() => {
    setSelectedUsersToState();
  }, [users]);

  const setSelectedUsersToState = () => {
    let userList = users;
    let tempArray = [];
    userList.forEach((element) => {
      if (element.isSelected) {
        tempArray.push(element);
      }
    });
    setSelectedUsers(JSON.parse(JSON.stringify(tempArray)));
  };

  const increaseWinToUser = (id) => {
    let userList = users;
    userList.forEach((element) => {
      if (element.id === id) {
        element.wins = element.wins + 1;
        element.Price = element.Price * 2;
      } else {
        element.loss = element.loss + 1;
        element.Price = 0;
      }
    });
    setUsers(JSON.parse(JSON.stringify(userList)));
  };

  return (
    <div className="play-area">
      <div className="my-auto">
        <div className="flex justify-center">
          {selectedUsers &&
            selectedUsers.map((user, i) => {
              return (
                i < 5 && (
                  <PlayCard
                    key={i}
                    user={user}
                    randomNumber={randomNumber}
                    increaseWinToUser={(id) => increaseWinToUser(id)}
                  />
                )
              );
            })}
        </div>
        <div>
          <div className="flex justify-center my-30">
            <div className="circle">
              <p>{randomNumber}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          {selectedUsers &&
            selectedUsers.map((user, i) => {
              return (
                i > 4 && (
                  <PlayCard
                    key={i}
                    user={user}
                    randomNumber={randomNumber}
                    increaseWinToUser={(id) => increaseWinToUser(id)}
                  />
                )
              );
            })}
        </div>
      </div>
      <button
        className="back-btn"
        onClick={() => {
          history.push({
            pathname: URL_PATH.USER_LIST,
            state: { users: users },
          });
        }}
      >
        BACK
      </button>
    </div>
  );
}
