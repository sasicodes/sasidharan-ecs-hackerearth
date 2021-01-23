import React, { useEffect, useState } from "react";
import Table from "./Table";
import Item from "./Item";
import axios from "axios";
import { LIST_URL } from "../config";
import { useIndexedDB } from "react-indexed-db";

export default function UserList(props) {
  const [list, setList] = useState([]);
  const [loading, setShowLoading] = useState(false);
  const [showPaymentDone, setShowPaymentDone] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortCount, setSortCount] = useState(0);
  const [page, setPage] = useState(1);
  const { add, getAll } = useIndexedDB("books");

  useEffect(() => {
    getAll().then((books) => {
      setList(books);
      if (!books.length) getBooks();
    });
  }, []);

  const getBooks = () => {
    setShowLoading(true);
    axios
      .get(LIST_URL)
      .then((response) => {
        let userList = response.data;
        userList.forEach((element, i) => {
          element.isSelected = false;
          element.sNo = i + 1;
        });
        setList(userList);
        storeInDB(userList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const storeInDB = (userList) => {
    userList.forEach((el) => {
      add(el).then(
        (event) => {
          console.log("Adding to indexed DB");
        },
        (error) => {
          console.log(error);
        }
      );
    });
    setShowLoading(false);
  };

  const onCheck = (value, bookID) => {
    let userList = list;
    userList.forEach((element) => {
      if (element.bookID === bookID) {
        element.isSelected = value;
      }
    });
    console.log(userList);
    setList(JSON.parse(JSON.stringify(userList)));
  };

  const onClickBuy = () => {
    let userList = list;
    userList.forEach((element) => {
      if (element.isSelected) {
        element.isSelected = false;
      }
    });
    setShowPaymentDone(true);
    setPage(1);
    setList(JSON.parse(JSON.stringify(userList)));
    setTimeout(() => {
      setShowPaymentDone(false);
    }, 3000);
  };

  const searchUser = (event) => {
    setSearchText(event.target.value);
    let usersList = list;
    let filteredArray =
      usersList.length &&
      usersList.filter(
        (data) =>
          JSON.stringify(data)
            .toLowerCase()
            .indexOf(event.target.value.toLowerCase()) !== -1
      );
    setPage(1);
    setFilteredUsers(JSON.parse(JSON.stringify(filteredArray)));
  };

  const onSortRating = () => {
    if (sortCount === 0) {
      let usersList = list;
      usersList.sort(function(a, b) {
        return a.average_rating - b.average_rating;
      });
      setSortedUsers(JSON.parse(JSON.stringify(usersList)));
      setSortCount(1);
    }
    if (sortCount === 1) {
      setSortCount(2);
      let usersList = list;
      usersList.sort(function(a, b) {
        return b.average_rating - a.average_rating;
      });
      setSortedUsers(JSON.parse(JSON.stringify(usersList)));
    }
    if (sortCount === 2) {
      setSortCount(0);
      setSortedUsers(JSON.parse(JSON.stringify(list)));
    }
    setPage(1);
  };

  const getTotalAmount = () => {
    let temp = list;
    let totalAmount = 0;
    temp.forEach((element) => {
      if (element.isSelected) {
        totalAmount += element.price;
      }
    });
    return totalAmount;
  };
  const disable = () => {
    let temp = list;
    let length = 0;
    temp.forEach((element) => {
      if (element.isSelected) {
                                length++;
                              }
    });
    return length === 0;
  };

  return (
    <div className="flex content">
      <div className="flex-side bg-gray">
        <div>
          <div className="mx-1">
            <h4>
              <i className="fas fa-shopping-cart" /> My Cart
            </h4>
            {list &&
              list.map((item, i) => {
                return item.isSelected && <Item key={i} item={item} />;
              })}
            {showPaymentDone && (
              <div className="flex-col jusify-center">
                <div className="text-center">
                  <i className="fas fa-check-circle" />
                </div>
                <p className="text-center">Thanks for shopping!</p>
              </div>
            )}
          </div>
        </div>
        <div className="mx-1">
          {getTotalAmount() !== 0 && <p> Total Amount - ${getTotalAmount()}</p>}
          <button
            className="buy-btn"
            disabled={disable()}
            onClick={() => onClickBuy()}
          >
            CHECKOUT
          </button>
        </div>
      </div>
      <div className="flex-main w-full">
        <div>
          <div className="above-table">
            <b className="text-blue">Select Books</b>
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
                  placeholder="Search Books"
                  className="search"
                  value={searchText}
                  onChange={(e) => searchUser(e)}
                />
              </div>
            </div>
          </div>
          <div className="mt-4 table-resp">
            {loading ? (
              <p className="mx-15">
                Loading first time takes longer than usual, please wait...
              </p>
            ) : (
              <Table
                list={
                  filteredUsers.length
                    ? filteredUsers.slice((page - 1) * 10, page * 10)
                    : sortedUsers.length
                    ? sortedUsers.slice((page - 1) * 10, page * 10)
                    : list.slice((page - 1) * 10, page * 10)
                }
                onCheck={(val, id) => onCheck(val, id)}
                onSortRating={() => onSortRating()}
                page={page}
                totalLength={list.length}
                onClickNext={() => setPage(page + 1)}
                onClickPrev={() => setPage(page - 1)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
