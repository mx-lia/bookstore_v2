import React from "react";

import { Card, Button } from "react-bootstrap";

import noImage from "../assets/noimage.png";

const BookCard = ({ book }) => {
  return (
    <Card className="border-0 h-100">
      <div className="d-flex">
        <Card.Img src={book.src ? book.src : noImage} className="rounded-0" />
      </div>
      <div className="mt-auto">
        <Card.Body className="d-flex flex-column p-0">
          <Card.Title as="h6">{book.title}</Card.Title>
          <div className="mb-3">
            <span>
              {book.bookAuthors?.map(
                (bookAuthor) =>
                  ` ${bookAuthor.author.firstName} ${bookAuthor.author.lastName},`
              )}
            </span>
            <br />
            <span>{book.publicationDate}</span>
            <br />
            <span className="text-pink">{book.price} $</span>
          </div>
          <Button href={"/books/" + book.isbn} className="w-100">
            Show more
          </Button>
        </Card.Body>
      </div>
    </Card>
  );
};

export default BookCard;
