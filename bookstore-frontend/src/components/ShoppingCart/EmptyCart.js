import React from "react";

import { Image } from "react-bootstrap";

import emptyCart from "../../assets/empty_cart.png";

const EmptyCart = () => {
  return (
    <div className="d-flex flex-column">
      <Image className="mx-auto" width="600px" src={emptyCart} fluid />
    </div>
  );
};

export default EmptyCart;
