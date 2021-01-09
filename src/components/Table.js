import React from "react";

export default function Table({ users, onCheck, onSortBet, onSortPrice }) {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>SELECT</th>
            <th className="text-left">PLAYER NAME</th>
            <th>LEVEL</th>
            <th>AVATAR</th>
            <th className="cursor-pointer" onClick={() => onSortBet()}>
              <img
                src={require("../assets/images/poker-chip.png")}
                alt=""
                height="12"
                width="12"
              />{" "}
              BET{" "}
              <img
                src={require("../assets/images/sort.png")}
                alt=""
                height="12"
                width="12"
              />
            </th>
            <th>
              <img
                src={require("../assets/images/trophy.png")}
                alt=""
                height="12"
                width="12"
              />{" "}
              WINS
            </th>
            <th>LOST</th>
            <th className="cursor-pointer" onClick={() => onSortPrice()}>
              <img
                src={require("../assets/images/coin.png")}
                alt=""
                height="12"
                width="12"
              />{" "}
              PRICE{" "}
              <img
                src={require("../assets/images/sort.png")}
                alt=""
                height="12"
                width="12"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, i) => {
              return (
                <tr key={i}>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      checked={user.isSelected}
                      onChange={(e) => onCheck(e.target.checked, user.id)}
                    />
                  </td>
                  <td className="text-left">{user.Name}</td>
                  <td className="text-center">{user.level || "-"}</td>
                  <td className="text-center">
                    {" "}
                    <img
                      src={user["Profile Image"]}
                      alt=""
                      height="25"
                      width="25"
                      className="card-img"
                    />
                  </td>
                  <td className="text-center">{user.Bet}</td>
                  <td className="text-center">{user.wins || "-"}</td>
                  <td className="text-center">{user.loss || "-"}</td>
                  <td className="text-center">{user.Price}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="pagination">
        <div className="flex justify-between align-items-center">
          <div>
            <a href="#">
              <img
                src={require("../assets/images/left-arrow.png")}
                alt=""
                height="12"
                width="12"
              />
            </a>
          </div>
          <h5>10 of 36</h5>
          <div>
            <a href="#">
              <img
                src={require("../assets/images/right-arrow.png")}
                alt=""
                height="12"
                width="12"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
