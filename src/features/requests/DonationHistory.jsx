import React, { useEffect, useState } from "react";
import { Modal, Button, Card, Row, Col } from "react-bootstrap";
import { BsPersonCircle, BsStarFill, BsStar } from "react-icons/bs";
import { toast } from "react-toastify";

export default function DonationHistory() {
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [rating, setRating] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedDonations = JSON.parse(localStorage.getItem("donationHistory")) || [];
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const validDonations = storedDonations.filter(d => d.userPhone);

    const merged = validDonations.map((d) => {
      const user = storedUsers.find((u) => u.phone === d.userPhone) || {};
      return {
        ...d,
        ...user,
        confirmedDate: d.confirmedDate || null,
      };
    });

    setDonations(merged);
  }, []);

  const handleRateClick = (donation) => {
    setSelectedDonation(donation);
    setRating(0);
    setShowModal(true);
  };

  const handleSubmitRating = () => {
    if (!rating) {
      toast.error("Please select a rating first");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = storedUsers.findIndex((u) => u.phone === selectedDonation.userPhone);

    if (userIndex !== -1) {
      let user = { ...storedUsers[userIndex] };
      user.ratingsArray = user.ratingsArray || [];
      user.ratingsArray.push(rating);
      const sum = user.ratingsArray.reduce((a, b) => a + b, 0);
      const avg = sum / user.ratingsArray.length;
      user.rating = Number(avg.toFixed(1));
      user.raters = user.ratingsArray.length;
      storedUsers[userIndex] = user;
      localStorage.setItem("users", JSON.stringify(storedUsers));
    }

    const now = new Date().toISOString();

    setDonations((prev) =>
      prev.map((d) =>
        d.userPhone === selectedDonation.userPhone
          ? { ...d, confirmed: true, confirmedDate: now }
          : d
      )
    );

    const storedDonations = JSON.parse(localStorage.getItem("donationHistory")) || [];
    const donationIndex = storedDonations.findIndex(
      (d) => d.userPhone === selectedDonation.userPhone
    );
    if (donationIndex !== -1) {
      storedDonations[donationIndex].confirmed = true;
      storedDonations[donationIndex].confirmedDate = now;
      localStorage.setItem("donationHistory", JSON.stringify(storedDonations));
    }

    setShowModal(false);
    setRating(0);
    setSelectedDonation(null);
    toast.success("Rating submitted successfully!", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Donation History</h2>

      {donations.length === 0 ? (
        <p className="text-center text-muted">
          No result found</p>
      ) : (
        <Row className="g-4 justify-content-center">
          {donations.map((donation, idx) => (
            <Col xs={12} sm={10} md={8} lg={7} key={donation.userPhone || idx}>
              <Card
                className="p-4 border-0 mb-3"
                style={{ borderRadius: "24px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}
              >
                <Card.Body>
                  <div className="d-flex align-items-center mb-2">
                    <BsPersonCircle size={28} className="me-2 text-danger" />
                    <h5 className="mb-0">{donation.name || "Unknown"}</h5>
                  </div>
                  <p className="text-muted mb-2">
                    Donation Date:{" "}
                    {donation.confirmedDate
                      ? new Date(donation.confirmedDate).toLocaleDateString()
                      : "Not confirmed yet"}
                  </p>

                  <Button
                    className="w-100 mt-2"
                    variant={donation.confirmed ? "outline-success" : "danger"}
                    onClick={() => handleRateClick(donation)}
                    disabled={donation.confirmed}
                  >
                    {donation.confirmed ? "Already Rated" : "Rate Donor"}
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
            {selectedDonation && <h5>{selectedDonation.name}</h5>}
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