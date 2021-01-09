import React, { useEffect, useState } from "react";
import Table from "./Table";
import UserItem from "./UserItem";
import { useHistory } from "react-router";
import { URL_PATH } from "../config/urlPath";
import axios from "axios";
import { LIST_URL } from "../config";
import { v4 as uuidv4 } from "uuid";

export default function UserList(props) {
  const history = useHistory();
  const [users, setUsers] = useState(
    (props.location.state && props.location.state.users) || []
  );
  const [loading, setShowLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortBetCount, setSortBetCount] = useState(0);
  const [sortPriceCount, setSortPriceCount] = useState(0);

  useEffect(() => {
    if (!users.length) getUsers();
  }, []);

  const getUsers = () => {
    setShowLoading(true);
    axios
      .get(LIST_URL)
      .then((response) => {
        let userList = response.data;
        userList.forEach((element) => {
          element.isSelected = false;
          element.id = uuidv4();
          element.wins = 0;
          element.loss = 0;
        });
        setUsers(userList);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setShowLoading(false);
      });
  };

  const onCheck = (value, id) => {
    let isSelectedCount = 0;
    let userList = users;
    userList.forEach((element) => {
      if (element.isSelected) {
        isSelectedCount++;
      }
    });
    userList.forEach((element) => {
      if (element.id === id && (!value || isSelectedCount < 9)) {
        element.isSelected = value;
      }
    });
    setUsers(JSON.parse(JSON.stringify(userList)));
  };

  const onClickStart = () => {
    let userList = users;
    let isSelectedCount = 0;
    userList.forEach((element) => {
      if (element.isSelected) {
        isSelectedCount++;
      }
    });
    if (isSelectedCount === 9) {
      history.push({
        pathname: URL_PATH.PLAY_AREA,
        state: { users: users },
      });
    } else {
      alert("Select 9 player to start");
    }
  };

  const searchUser = (event) => {
    setSearchText(event.target.value);
    let usersList = users;
    let filteredArray =
      usersList.length &&
      usersList.filter(
        (data) =>
          JSON.stringify(data)
            .toLowerCase()
            .indexOf(event.target.value.toLowerCase()) !== -1
      );
    setFilteredUsers(JSON.parse(JSON.stringify(filteredArray)));
  };

  const onSortBet = () => {
    if (sortBetCount === 0) {
      let usersList = users;
      usersList.sort(function(a, b) {
        return a.Bet - b.Bet;
      });
      setSortedUsers(JSON.parse(JSON.stringify(usersList)));
      setSortBetCount(1);
    }
    if (sortBetCount === 1) {
      setSortBetCount(2);
      let usersList = users;
      usersList.sort(function(a, b) {
        return b.Bet - a.Bet;
      });
      setSortedUsers(JSON.parse(JSON.stringify(usersList)));
    }
    if (sortBetCount === 2) {
      setSortBetCount(0);
      setSortedUsers(JSON.parse(JSON.stringify(users)));
    }
  };

  const onSortPrice = () => {
    if (sortPriceCount === 0) {
      setSortPriceCount(1);
      let usersList = users;
      usersList.sort(function(a, b) {
        return a.Price - b.Price;
      });
      setSortedUsers(JSON.parse(JSON.stringify(usersList)));
    }
    if (sortPriceCount === 1) {
      setSortPriceCount(2);
      let usersList = users;
      usersList.sort(function(a, b) {
        return b.Price - a.Price;
      });
      setSortedUsers(JSON.parse(JSON.stringify(usersList)));
    }
    if (sortPriceCount === 2) {
      setSortPriceCount(0);
      setSortedUsers(JSON.parse(JSON.stringify(users)));
    }
  };

  return (
    <div className="flex content">
      <div className="flex-side bg-gray">
        <div>
          <img
            style={{ width: "100%" }}
            src={require("../assets/images/dice.png")}
            alt=""
          />
          <div className="mx-1">
            <b className="text-muted">Playing 9</b>
            {users &&
              users.map((user, i) => {
                return user.isSelected && <UserItem key={i} user={user} />;
              })}
          </div>
        </div>
        <div className="mx-1">
          <button className="start-btn" onClick={() => onClickStart()}>
            START
          </button>
        </div>
      </div>
      <div className="flex-main w-full">
        <div>
          <b className="text-blue">Select Playing 9</b>
          <div className="w-25 mt-4">
            <div className="flex">
              <div className="s-icon">
                <img
                  src={require("../assets/images/search.png")}
                  alt=""
                  height="12"
                  width="12"
                />
              </div>{" "}
              <input
                type="text"
                placeholder="Search Players"
                className="search"
                value={searchText}
                onChange={(e) => searchUser(e)}
              />
            </div>
          </div>
          <div className="mt-4">
            {loading ? (
              "Loading..."
            ) : (
              <Table
                users={
                  filteredUsers.length
                    ? filteredUsers
                    : sortedUsers.length
                    ? sortedUsers
                    : users
                }
                onCheck={(val, id) => onCheck(val, id)}
                onSortBet={() => onSortBet()}
                onSortPrice={() => onSortPrice()}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
