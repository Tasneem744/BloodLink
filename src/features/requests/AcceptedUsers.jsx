import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Modal, Button, Card, Row, Col } from "react-bootstrap";
import {
  BsPersonCircle,
  BsTelephoneFill,
  BsStarFill,
  BsStar,
} from "react-icons/bs";
import { toast } from "react-toastify";
import acceptGof from "../../assets/images/finger-tap.gif";
import noResultGif from "../../assets/images/no-data (1).gif";

export default function AcceptedUsersPage() {
  const { id } = useParams(); 
  const [acceptedUsers, setAcceptedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [rating, setRating] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedAccepted = JSON.parse(localStorage.getItem("acceptedRequests")) || [];
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const acceptedForThisRequest = storedAccepted.filter(
      (a) => a.requestId === Number(id)
    );

    const merged = acceptedForThisRequest.map((a) => {
      const fullUser = storedUsers.find((u) => u.phone === a.userPhone);
      return {
        ...a,
        ...fullUser, 
      };
    });

    setAcceptedUsers(merged);
  }, [id]);

  const handleConfirmClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleSubmitRating = () => {
    if (!rating) {
      toast.error("Please select a rating first");
      return;
    }

    const storedAccepted = JSON.parse(localStorage.getItem("acceptedRequests")) || [];
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const storedRequests = JSON.parse(localStorage.getItem("requests")) || [];

    const userIndex = storedUsers.findIndex(
      (u) => u.phone === selectedUser.phone
    );

    if (userIndex !== -1) {
      let globalUser = storedUsers[userIndex];

      globalUser.ratingsArray = globalUser.ratingsArray || [];

      globalUser.ratingsArray.push(rating);

      const sum = globalUser.ratingsArray.reduce((a, b) => a + b, 0);
      const avg = sum / globalUser.ratingsArray.length;

      globalUser.rating = Number(avg.toFixed(1));
      globalUser.raters = globalUser.ratingsArray.length;

      storedUsers[userIndex] = globalUser;
      localStorage.setItem("users", JSON.stringify(storedUsers));
    }

    const acceptedIndex = storedAccepted.findIndex(
      (a) =>
        a.requestId === Number(id) &&
        a.userPhone === selectedUser.phone
    );

    if (acceptedIndex !== -1) {
      storedAccepted[acceptedIndex].confirmed = true;
      storedAccepted[acceptedIndex].confirmedDate = new Date().toISOString();
      localStorage.setItem("acceptedRequests", JSON.stringify(storedAccepted));
    }
    const requestIndex = storedRequests.findIndex(
      (r) => r.id === Number(id)
    );

    if (requestIndex !== -1) {
      let req = storedRequests[requestIndex];

      req.acceptedUsers = req.acceptedUsers || [];

      let insideReqIndex = req.acceptedUsers.findIndex(
        (u) => u.phone === selectedUser.phone
      );

      if (insideReqIndex === -1) {
        req.acceptedUsers.push({
          phone: selectedUser.phone,
          rating: selectedUser.rating,
          raters: selectedUser.raters,
          ratingsArray: selectedUser.ratingsArray || [],
          confirmed: true,
        });
      } else {
        req.acceptedUsers[insideReqIndex] = {
          ...req.acceptedUsers[insideReqIndex],
          rating: selectedUser.rating,
          raters: selectedUser.raters,
          ratingsArray: selectedUser.ratingsArray || [],
          confirmed: true,
        };
      }

      storedRequests[requestIndex] = req;
      localStorage.setItem("requests", JSON.stringify(storedRequests));
    }

    const updatedAcceptedForThisRequest = storedAccepted
      .filter((a) => a.requestId === Number(id))
      .map((a) => {
        const fullUser = storedUsers.find((u) => u.phone === a.userPhone);
        return { ...a, ...fullUser };
      });

    setAcceptedUsers(updatedAcceptedForThisRequest);
    setShowModal(false);
    setRating(0);
    setSelectedUser(null);

    toast.success("Rating submitted successfully!", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  return (
    <div className="container py-4">
      <h2 className="text-center fw-bold mb-4">
        Accepted Users
        <img src={acceptGof} style={{ width: "80px" }} alt="Accepted" />
      </h2>

      {acceptedUsers.length === 0 ? (
        <p className="text-center">
          <img
            src={noResultGif}
              alt="No results"
              className="d-block mx-auto mb-3"
              style={{ width: "80px" }}
          />
          No accepted users yet.</p>
      ) : (
        <Row className="g-4 justify-content-center">
          {acceptedUsers.map((user) => (
            <Col xs={12} sm={10} md={8} lg={7} xl={5} key={user.userPhone}>
              <Card
                className="w-100 border-0 p-4"
                style={{
                  borderRadius: "24px",
                  background: "#fff",
                  boxShadow: "0 0 10px rgba(250, 82, 82, 0.336)",
                }}
              >
                <Card.Body className="text-start p-0">
                  <Card.Title className="d-flex align-items-center mb-3">
                    <BsPersonCircle className="me-2 text-danger" size={28} />
                    <span className="fw-bold" style={{ fontSize: "1.3rem" }}>
                      {user.name}
                    </span>
                  </Card.Title>

                  <Card.Text className="d-flex align-items-center mb-2">
                    <BsTelephoneFill className="me-2 text-danger" size={20} />
                    <span className="text-black fw-semibold">{user.phone}</span>
                  </Card.Text>

                  <div className="d-flex align-items-center mb-3">
                    {[1, 2, 3, 4, 5].map((n) =>
                      n <= Math.round(user.rating || 0) ? (
                        <BsStarFill key={n} className="text-warning me-1" />
                      ) : (
                        <BsStar key={n} className="text-warning me-1" />
                      )
                    )}
                    <span className="ms-2">({user.raters || 0} ratings)</span>
                  </div>

                  <Button
                    className="w-100 mt-3"
                    variant="danger"
                    size="md"
                    disabled={user.confirmed}
                    onClick={() => handleConfirmClick(user)}
                  >
                    {user.confirmed ? "Donation Confirmed" : "Confirm Donation"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Rate Donor</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="text-center">
            {selectedUser && <h5>{selectedUser.name}</h5>}
            <div className="d-flex justify-content-center mt-3">
              {[1, 2, 3, 4, 5].map((n) =>
                n <= rating ? (
                  <BsStarFill
                    key={n}
                    size={28}
                    className="text-warning mx-1"
                    onClick={() => setRating(n)}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <BsStar
                    key={n}
                    size={28}
                    className="text-warning mx-1"
                    onClick={() => setRating(n)}
                    style={{ cursor: "pointer" }}
                  />
                )
              )}
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>

          <Button variant="danger" onClick={handleSubmitRating}>
            Submit Rating
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}