import React, { useState, useContext } from "react";

import { Container, Row, Col } from "react-bootstrap";

import AdminHeader from "../../components/AdminLayout/AdminHeader";
import CardButton from "../../components/AdminLayout/CardButton";
import DataGrid from "../../components/DataGrid";
import Alert from "../../components/Alert";

import { ReactComponent as CircleIcon } from "../../assets/circle.svg";
import { ReactComponent as AvailableIcon } from "../../assets/available.svg";
import { ReactComponent as NotAvailableIcon } from "../../assets/not-available.svg";
import { ReactComponent as InboxIcon } from "../../assets/inbox.svg";
import { ReactComponent as AddIcon } from "../../assets/add.svg";

import { Context } from "../../context/alertContext";

const AdminDashboard = () => {
  const { error } = useContext(Context);
  const [totalCount, setTotalCount] = useState(0);
  const [availableCount, setAvailableCount] = useState(0);
  const [notAvailableCount, setNotAvailableCount] = useState(0);

  return (
    <div>
      <AdminHeader
        title={"Books"}
        subtitle={`You currently have ${totalCount} in the catalog!`}
      />
      {error && <Alert />}
      <Container fluid as="main" className="my-3" role="main">
        <Row>
          <Col>
            <h5 className="border-bottom py-1">Overview</h5>
          </Col>
        </Row>
        <Row className="my-3">
          <Col xs={12} md className="mb-2 mb-md-0">
            <CardButton
              title={totalCount}
              subtitle={"ALL BOOKS"}
              icon={<CircleIcon fill="#cce4ff" />}
              color="text-primary"
            />
          </Col>
          <Col xs={12} md className="mb-2 mb-md-0">
            <CardButton
              title={availableCount}
              subtitle={"IN STOCK"}
              icon={<AvailableIcon fill="#fff2cd" />}
              color="text-warning"
            />
          </Col>
          <Col xs={12} md className="mb-2 mb-md-0">
            <CardButton
              title={notAvailableCount}
              subtitle={"OUT OF STOCK"}
              icon={<NotAvailableIcon fill="#f8d6d9" />}
              color="text-danger"
            />
          </Col>
          <Col xs={12} md className="mb-2 mb-md-0">
            <CardButton
              title={<AddIcon width="22px" height="22px" fill="#28a745" />}
              subtitle={"NEW BOOK"}
              icon={<InboxIcon fill="#d4edd9" />}
              href={"/admin/dashboard/newbook"}
              color="text-success"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h5 className="border-bottom py-1">Books ({totalCount})</h5>
          </Col>
        </Row>
        <Row className="my-3">
          <Col>
            <DataGrid
              setTotalCount={setTotalCount}
              setAvailableCount={setAvailableCount}
              setNotAvailableCount={setNotAvailableCount}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminDashboard;
