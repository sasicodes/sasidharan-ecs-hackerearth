import React from "react";

export default function Table({
  list,
  onCheck,
  onSortRating,
  page,
  totalLength,
  onClickPrev,
  onClickNext,
}) {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>SELECT</th>
            <th>S.NO</th>
            <th className="text-left">BOOK ID</th>
            <th>TITLE</th>
            <th>AUTHORS</th>
            <th className="cursor-pointer" onClick={() => onSortRating()}>
              AVG. RATING
              <img
                src={require("../assets/images/sort.png")}
                alt=""
                height="12"
                width="12"
              />
            </th>
            <th>ISBN</th>
            <th>LANGUAGE CODE</th>
            <th>
              RATINGS COUNT
            </th>
            <th>PRICE</th>
          </tr>
        </thead>
        <tbody>
          {list &&
            list.map((item, i) => {
              return (
                <tr key={i}>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      checked={item.isSelected}
                      onChange={(e) => onCheck(e.target.checked, item.bookID)}
                    />
                  </td>
                  <td className="text-left">{item.sNo}</td>
                  <td className="text-left">{item.bookID}</td>
                  <td className="text-center">{item.title || "-"}</td>
                  <td className="text-center">{item.authors}</td>
                  <td className="text-center">
                    {item.average_rating &&
                      Math.floor(item.average_rating) &&
                      Array(Math.floor(item.average_rating))
                        .fill()
                        .map((el, i) => {
                          return <i className="fas fa-star" key={i} />;
                        })}
                  </td>
                  <td className="text-center">{item.isbn || "-"}</td>
                  <td className="text-center">{item.language_code || "-"}</td>
                  <td className="text-center">{item.ratings_count}</td>
                  <td className="text-center">{item.price}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="pagination">
        <div className="flex justify-between align-items-center">
          <div>
            <a href="#/" onClick={() => onClickPrev()}>
              <img
                src={require("../assets/images/left-arrow.png")}
                alt=""
                height="12"
                width="12"
              />
            </a>
          </div>
          <h5>Page {page}</h5>
          <div>
            <a href="#/" onClick={() => onClickNext()}>
              <img
                src={require("../assets/images/right-arrow.png")}
                alt=""
                height="12"
                width="12"
              />
            </a>
          </div>
          Total books - {totalLength}
        </div>
      </div>
    </div>
  );
}
