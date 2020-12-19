import React, { useState, useEffect, useContext } from "react";
import { Image } from "react-bootstrap";

import noImage from "../../assets/noimage.png";

import { Context } from "../../context/alertContext";

import { getBook } from "../../actions/bookActions";

const OrderItem = ({ orderDetail, totalSum, setTotalSum }) => {
  const { addAlert } = useContext(Context);
  const [book, setBook] = useState();

  useEffect(() => {
    (async () => {
      const book = await getBook(orderDetail.bookISBN, addAlert);
      setBook(book);
      setTotalSum(totalSum + orderDetail.amount * book.price);
    })();
  }, [orderDetail.bookISBN, orderDetail.amount, setTotalSum]);

  return (
    <React.Fragment>
      {book && (
        <div className="d-flex flex-column flex-md-row justify-content-between my-1">
          <div className="d-flex flex-row">
            <Image width="80px" src={book.src ? book.src : noImage} />
            <div className="px-2">
              <h5>{book.title}</h5>
              <h6>
                {book.bookAuthors?.map(
                  (bookAuthor) =>
                    ` ${bookAuthor.author.firstName} ${bookAuthor.author.lastName},`
                )}
              </h6>
              <span>
                {book.format}, {book.language}
              </span>
              <br />
              <span>{book.publicationDate}</span>
            </div>
          </div>
          <div className="d-flex flex-row flex-fill mt-2 mt-md-0">
            <div className="ml-md-auto">x {orderDetail.amount}</div>
            <div className="ml-auto">{book.price * orderDetail.amount}$</div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default OrderItem;
