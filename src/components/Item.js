import React from "react";

export default function UserItem({ item }) {
  return (
    <div className="flex user-item">
      <div className="flex justify-start">
        <div className="flex f-col ml-10">
          <h5 className="m-0 mt-3">{item.title}</h5>
        </div>
      </div>
      <div className='price'>${item.price}</div>
    </div>
  );
}
