import React, { useContext } from "react";
import { Alert } from "react-bootstrap";

import { Context } from "../context/alertContext";

const MyAlert = ({ alerts }) => {
  const { removeAlert } = useContext(Context);

  return (
    <div className="d-flex flex-column-reverse" style={{
      position: 'absolute',
      zIndex: 9999,
      top: 10,
      right: 10,
    }}>
      {alerts?.map(alert => (
        setTimeout(() => removeAlert(alert.id), 5000) && <Alert key={alert.id} variant={alert.type} onClose={() => removeAlert(alert.id)} dismissible >
          {alert.message}
        </Alert>
      ))}
    </div>
  );
};

export default MyAlert;
