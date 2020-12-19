import React, { useState, useEffect, useContext } from "react";

import {
  Row,
  Col,
  Form,
  FormControl,
  Button,
  InputGroup,
  Image,
} from "react-bootstrap";

import { Formik } from "formik";
import { initialValues, bookSchema } from "./form-config";

import { Context } from "../../context/alertContext";

import { getGenres, createGenre } from "../../actions/genreActions";
import { getAuthors, createAuthor } from "../../actions/authorActions";
import { getPublishers, createPublisher } from "../../actions/publisherActions";
import {
  deleteBook,
  updateBook,
  createBook,
  getBook,
} from "../../actions/bookActions";

import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";
import noImage from "../../assets/noimage.png";

import DatePicker from "./form-components/DatePicker";
import Select from "./form-components/Select";
import makeAnimated from "react-select/animated";

const BookForm = ({ isbn }) => {
  const { addAlert } = useContext(Context);
  const animatedComponents = makeAnimated();
  const [book, setBook] = useState(initialValues);
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [cover, setCover] = useState(null);

  useEffect(() => {
    (async () => {
      setGenres(await getGenres(addAlert));
      setAuthors(await getAuthors(addAlert));
      setPublishers(await getPublishers(addAlert));
      if (isbn) {
        const newValues = await getBook(isbn, addAlert);
        delete newValues.publisher_id;
        delete newValues.author_id;
        setBook({
          ...newValues,
          publishers: newValues.bookPublishers?.map((bookPublisher) => {
            return {
              label: bookPublisher.publisher.name,
              value: bookPublisher.publisher.id,
            };
          }),
          authors: newValues.bookAuthors?.map((bookAuthor) => {
            return {
              label: `${bookAuthor.author.firstName} ${bookAuthor.author.lastName}`,
              value: bookAuthor.author.id,
            };
          }),
          genres: newValues.bookGenres?.map((bookGenre) => {
            return { label: bookGenre.genre.name, value: bookGenre.genre.id };
          }),
        });
        setCover(newValues.src);
      }
    })();
  }, []);

  return (
    <Row className="my-3">
      <Col>
        <div className="panel shadow-sm">
          <Formik
            onSubmit={async (values) => {
              if (isbn) await updateBook(values, addAlert);
              else await createBook(values, addAlert);
              window.location.href = "/admin/dashboard";
            }}
            initialValues={book}
            validationSchema={bookSchema}
            enableReinitialize={true}
          >
            {({
              handleSubmit,
              handleChange,
              setFieldValue,
              values,
              errors,
            }) => (
              <Form
                noValidate
                autoComplete="false"
                onSubmit={handleSubmit}
                className="p-3"
              >
                <Form.Row className="justify-content-end">
                  {isbn && (
                    <Col xs="auto" className="ml-auto">
                      <Button
                        variant="danger"
                        className="d-inline-flex align-items-center"
                        onClick={async () => {
                          await deleteBook(values.isbn, addAlert);
                          window.location.href = "/admin/dashboard";
                        }}
                      >
                        <DeleteIcon fill="#fff" />
                      </Button>
                    </Col>
                  )}
                  <Col xs="auto">
                    <Button type="submit">Save</Button>
                  </Col>
                </Form.Row>
                <Form.Row className="justify-content-around">
                  <Form.Group
                    as={Col}
                    xs={12}
                    sm={4}
                    md={3}
                    xl={2}
                    className="d-flex flex-column justify-content-between"
                  >
                    <Image
                      src={cover ? cover : noImage}
                      fluid
                      className="my-auto py-2"
                    />
                    <Form.File
                      name="cover"
                      label="Custom file input"
                      custom
                      onChange={(event) => {
                        const img = event.target.files[0];
                        if (img) {
                          setCover(URL.createObjectURL(img));
                          setFieldValue("cover", img);
                        }
                      }}
                    />
                  </Form.Group>
                  <Col
                    xs={12}
                    sm={7}
                    md={8}
                    xl={9}
                    className="d-flex flex-column justify-content-between"
                  >
                    <Form.Row>
                      <Form.Group as={Col} xs={12} sm={12} md xl>
                        <Form.Label>ISBN</Form.Label>
                        <Form.Control
                          name="isbn"
                          type="text"
                          placeholder="ISBN"
                          value={values.isbn}
                          onChange={handleChange}
                          isInvalid={!!errors.isbn}
                          readOnly={isbn ? true : false}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.isbn}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} xs={12} sm={12} md xl>
                        <Form.Label>Genres </Form.Label>
                        <Select
                          id="genres"
                          name="genres"
                          value={values.genres}
                          errors={errors.genres}
                          items={genres}
                          setItems={setGenres}
                          createItem={createGenre}
                          closeMenuOnSelect={false}
                          isMulti
                          options={genres?.map((element) => ({
                            value: element.id,
                            label: element.name,
                          }))}
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form.Group>
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        name="title"
                        type="text"
                        placeholder="Title"
                        value={values.title}
                        onChange={handleChange}
                        isInvalid={!!errors.title}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.title}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Row>
                      <Form.Group as={Col} xs={12} sm={12} md xl>
                        <div className="d-flex justify-content-between">
                          <Form.Label>Author</Form.Label>
                        </div>
                        <Select
                          id="authors"
                          name="authors"
                          value={values.authors}
                          items={authors}
                          setItems={setAuthors}
                          createItem={createAuthor}
                          errors={errors.authors}
                          components={animatedComponents}
                          closeMenuOnSelect={false}
                          isMulti
                          options={authors?.map((element) => ({
                            value: element?.id,
                            label: `${element?.firstName} ${element?.lastName}`,
                          }))}
                        />
                      </Form.Group>
                      <Form.Group as={Col} xs sm={12} md xl>
                        <Form.Label>Publisher</Form.Label>
                        <Select
                          id="publishers"
                          name="publishers"
                          value={values.publishers}
                          items={publishers}
                          setItems={setPublishers}
                          createItem={createPublisher}
                          errors={errors.publishers}
                          components={animatedComponents}
                          closeMenuOnSelect={false}
                          isMulti
                          options={publishers?.map((element) => ({
                            value: element.id,
                            label: element.name,
                          }))}
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} xs={12} sm={12} md xl>
                        <Form.Label>Language</Form.Label>
                        <Form.Control
                          name="language"
                          type="text"
                          placeholder="Language"
                          value={values.language}
                          onChange={handleChange}
                          isInvalid={!!errors.language}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.language}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} xs={12} sm={12} md xl>
                        <Form.Label>Publication date</Form.Label>
                        <DatePicker
                          name="publicationDate"
                          errors={errors.publicationDate}
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} xs={12} sm={12} md xl>
                        <Form.Label>Format</Form.Label>
                        <Form.Control
                          name="format"
                          type="text"
                          placeholder="Format"
                          value={values.format}
                          onChange={handleChange}
                          isInvalid={!!errors.format}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.format}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} xs={12} sm={12} md xl>
                        <Form.Label>Pages</Form.Label>
                        <Form.Control
                          name="pages"
                          type="text"
                          placeholder="Pages"
                          value={values.pages}
                          onChange={handleChange}
                          isInvalid={!!errors.pages}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.pages}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} xs={12} sm={12} md xl>
                        <Form.Label>Price</Form.Label>
                        <InputGroup>
                          <InputGroup.Prepend>
                            <InputGroup.Text>$</InputGroup.Text>
                          </InputGroup.Prepend>
                          <FormControl
                            name="price"
                            type="text"
                            value={values.price}
                            onChange={handleChange}
                            isInvalid={!!errors.price}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.price}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                      <Form.Group as={Col} xs={12} sm={12} md xl>
                        <Form.Label>Quantity</Form.Label>
                        <InputGroup>
                          <InputGroup.Prepend>
                            <InputGroup.Text>$</InputGroup.Text>
                          </InputGroup.Prepend>
                          <FormControl
                            name="availableQuantity"
                            type="text"
                            value={values.availableQuantity}
                            onChange={handleChange}
                            isInvalid={!!errors.availableQuantity}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.availableQuantity}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                    </Form.Row>
                  </Col>
                </Form.Row>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    name="description"
                    as="textarea"
                    rows="10"
                    value={values.description}
                    onChange={handleChange}
                    isInvalid={!!errors.description}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form>
            )}
          </Formik>
        </div>
      </Col>
    </Row>
  );
};

export default BookForm;
