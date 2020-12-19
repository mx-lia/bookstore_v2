import React from "react";

import { Image } from "react-bootstrap";

import noResults from "../assets/no-results.gif";

const NoResults = () => {
  return (
    <div className="d-flex flex-column">
      <Image width="800px" className="mx-auto" src={noResults} fluid />
      <h5 className="text-center">No results</h5>
    </div>
  );
};

export default NoResults;
