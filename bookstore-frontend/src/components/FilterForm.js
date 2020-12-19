import React, { useContext } from "react";

import {  Form, Button } from "react-bootstrap";

const FilterForm = () => {
  const { signIn, signUp } = useContext(CustomerContext);

  return (
    <Form>
      <Form.Group>
        <Form.Label>Keyword</Form.Label>
        <Form.Control
          type="text"
          size="sm"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Price range</Form.Label>
        <Form.Control as="select" size="sm" custom required>
          <option selected disabled>
            All
          </option>
          <option>Under 15$</option>
          <option>15$ to 30$</option>
          <option>15$ +</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Availability</Form.Label>
        <Form.Control as="select" size="sm" custom required>
          <option selected disabled>
            All
          </option>
          <option>Out of stock</option>
          <option>In stock</option>
        </Form.Control>
      </Form.Group>
      <Button type="submit" className="w-100">
        Filter
      </Button>
    </Form>
  );
};

export default FilterForm;
