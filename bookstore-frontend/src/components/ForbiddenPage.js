import React from "react";

import { Image } from "react-bootstrap";

import error403 from "../assets/error_403.png";

const ForbiddenPage = () => {
  return (
    <div className="d-flex flex-column">
      <Image className="mx-auto" src={error403} fluid />
    </div>
  );
};

export default ForbiddenPage;
