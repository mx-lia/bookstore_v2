import React from "react";

import { Button } from "react-bootstrap";

const CardButton = ({ title, subtitle, href, icon, color }) => {
  return (
    <div>
      <Button
        variant="card"
        href={href ? href : null}
        className={"d-flex flex-column align-items-stretch py-3 h-100 w-100 " + color}
      >
        <div className="ml-auto">{icon}</div>
        <h4>{title}</h4>
        <h6>{subtitle}</h6>
      </Button>
    </div>
  );
};

export default CardButton;
