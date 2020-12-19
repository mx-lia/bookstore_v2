import React, { useEffect, useState, useContext } from "react";

import OrderCard from "../../components/Account/OrderCard";

import { getOrders } from "../../actions/orderActions";

import { Context } from "../../context/alertContext";

const History = () => {
  const { addAlert } = useContext(Context);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      setOrders(await getOrders(addAlert));
    })();
  }, []);

  return (
    <div className="panel shadow-sm py-2 px-3">
      <div className="border-bottom">
        <h5>Order history</h5>
      </div>
      {orders?.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};

export default History;
