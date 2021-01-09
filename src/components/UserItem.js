import React from "react";

export default function UserItem({ user }) {
  return (
    <div className="flex user-item">
      <div className="flex justify-start">
        <div className="user-image">
          <img
            src={user["Profile Image"]}
            className="card-img"
            alt=""
            height="40"
            width="40"
          />
        </div>
        <div className="flex f-col ml-10">
          <h5 className="m-0 mt-3">{user.Name}</h5>
          <div className="flex mt-5 justify-start fs-13">
            <span>
              <img
                src={require("../assets/images/trophy.png")}
                alt=""
                height="12"
                width="12"
              />{" "}
              {user.wins || 0}
            </span>
            <span className="ml-5">
              <img
                src={require("../assets/images/poker-chip.png")}
                alt=""
                height="12"
                width="12"
              />{" "}
              {user.Bet}
            </span>
          </div>
        </div>
      </div>
      <div>
        <img
          src={require("../assets/images/coin.png")}
          alt=""
          height="12"
          width="12"
        />{" "}
        {user.Price}
      </div>
    </div>
  );
}
