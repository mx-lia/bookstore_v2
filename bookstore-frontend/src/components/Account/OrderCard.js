import React, { useState } from "react";
import { Card } from "react-bootstrap";

import OrderItem from "./OrderItem";

const OrderCard = ({ order }) => {
  const [totalSum, setTotalSum] = useState(0);

  return (
    <Card className="rounded-0 my-2">
      <Card.Header className="d-flex flex-column flex-md-row justify-content-between">
        <div>
          Order No. {order.id} from {order.date}
        </div>
        <div>
          Total sum: <span> {totalSum}$</span>
        </div>
      </Card.Header>
      <Card.Body>
        {order.orderDetails?.map((orderDetail) => (
          <div>
            <OrderItem
              key={orderDetail.book}
              orderDetail={orderDetail}
              totalSum={totalSum}
              setTotalSum={setTotalSum}
            />
            <div className="border-top" />
            <div />
          </div>
        ))}
      </Card.Body>
    </Card>
  );
};

export default OrderCard;
