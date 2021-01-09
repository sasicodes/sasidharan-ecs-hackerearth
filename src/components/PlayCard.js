import React, { useEffect } from "react";

export default function PlayCard({ user, randomNumber, increaseWinToUser }) {
  useEffect(() => {
    if (randomNumber === parseInt(user.Bet)) {
      console.log("🚀 ~ file: PlayCard.js ~ line 7 ~ useEffect ~ user", user);
      increaseWinToUser(user.id);
    }
  }, []);

  return (
    <div
      className={`${randomNumber === parseInt(user.Bet) ? "win-card" : "card"}`}
    >
      <div className="flex justify-start">
        <img
          src={user["Profile Image"]}
          alt=""
          height="40"
          width="40"
          className="card-img"
        />
        <div className="flex f-col justify-center ml-5">
          <h5 className="m-0 mt-3">{user.Name}</h5>
          <small>Level {user.level || 0}</small>
        </div>
      </div>
      <div className="flex f-col my-30">
        <div className="flex mt-5 justify-starts fs-13">
          <span>
            <img
              src={require("../assets/images/coin.png")}
              alt=""
              height="12"
              width="12"
            />{" "}
            {user.Price}
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
        <div className="flex mt-5 justify-starts fs-13">
          <span>
            <img
              src={require("../assets/images/trophy.png")}
              alt=""
              height="12"
              width="12"
            />{" "}
            {user.wins || 0}
          </span>
        </div>
      </div>
      <div className="flex justify-center">
        <span
          className="card-label"
          style={{
            backgroundColor: randomNumber === parseInt(user.Bet) && "black",
          }}
        >
          {randomNumber === parseInt(user.Bet) ? "WINNER" : "LOSE"}
        </span>
      </div>
    </div>
  );
}
