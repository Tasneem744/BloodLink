import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { useAppSelector } from "../../../app/hooks";
import EditProfile from "./EditProfileForm";
import { BsPersonCircle, BsCalendarDate } from "react-icons/bs";
import { toast } from "react-toastify";
import styles from "./ProfilePage.module.css";
import formGif from "../../../assets/images/form.gif";
import noResultGif from "../../../assets/images/no-data (1).gif";
import userGif from "../../../assets/images/user.gif";

function Profile() {
  const { user } = useAppSelector((state) => state.user);

  const [updatedUser, setUpdatedUser] = useState(user);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const [showRateModal, setShowRateModal] = useState(false);
  const [selectedRequester, setSelectedRequester] = useState(null);
  const [ratingStars, setRatingStars] = useState(0);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    if (user?.phone) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const found = users.find((u) => u.phone === user.phone);

      if (found) {
        const requestsLS = JSON.parse(localStorage.getItem("requests")) || [];
        const acceptedRequestsLS =
          JSON.parse(localStorage.getItem("acceptedRequests")) || [];

        const myDonations = acceptedRequestsLS
          .filter((r) => r.userPhone === found.phone && r.confirmed)
          .map((r) => {
            const req = requestsLS.find((req) => req.id === r.requestId) || {};
            return {
              requestId: r.requestId,
              date: r.confirmedDate?.split("T")[0],
              status: "Completed",
              requesterName: req?.requester_name || "Unknown",
              requesterPhone: req?.requester_phone || "",
              location: req?.place || "Unknown location",
              ratedByGlobal: req?.ratedByGlobal || {},
            };
          });

        found.donationHistory = myDonations;
        found.totalDonations = myDonations.length;

        const today = new Date();
        if (!found.rewardStartDate) {
          found.rewardStartDate = today.toISOString();
        }

        const diffInDays = Math.floor(
          (today - new Date(found.rewardStartDate)) / (1000 * 60 * 60 * 24)
        );

        let currentDiscount = (found.totalDonations || 0) * 10;
        if (diffInDays > 365) {
          currentDiscount = 0;
          found.rewardStartDate = today.toISOString();
          found.totalDonations = 0;
        }

        setDiscount(Math.min(currentDiscount, 100));
        localStorage.setItem("users", JSON.stringify(users));
        setUpdatedUser(found);
      }
    }
  }, [user]);

  if (!updatedUser)
    return <h3 className="text-center mt-5">No user found.</h3>;

  const handleRateSubmit = () => {
    if (!selectedRequester || ratingStars === 0) {
      toast.error("Please select a rating first!", { position: "top-center" });
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const requester = users.find(
      (u) => u.phone === selectedRequester.requesterPhone
    );
    if (!requester) return;

    requester.ratingsArray = requester.ratingsArray || [];
    requester.raters = requester.raters || 0;
    requester.ratedBy = requester.ratedBy || [];

    selectedRequester.ratedByGlobal = selectedRequester.ratedByGlobal || {};
    if (selectedRequester.ratedByGlobal[updatedUser.phone]) {
      toast.error("You already rated this request!", { position: "top-center" });
      return;
    }

    requester.ratingsArray.push(ratingStars);
    const total = requester.ratingsArray.reduce((a, b) => a + b, 0);
    requester.rating = Number((total / requester.ratingsArray.length).toFixed(1));
    requester.raters = requester.ratingsArray.length;
    requester.ratedBy.push(updatedUser.phone);

    selectedRequester.ratedByGlobal[updatedUser.phone] = true;

    const requests = JSON.parse(localStorage.getItem("requests")) || [];
    const requestIndex = requests.findIndex(r => r.id === selectedRequester.requestId);
    if (requestIndex !== -1) {
      requests[requestIndex].ratedByGlobal = requests[requestIndex].ratedByGlobal || {};
      requests[requestIndex].ratedByGlobal[updatedUser.phone] = true;
      localStorage.setItem("requests", JSON.stringify(requests));
    }

    localStorage.setItem("users", JSON.stringify(users));

    setShowRateModal(false);
    setRatingStars(0);
    setSelectedRequester(null);

    toast.success("Rating submitted successfully!", { position: "top-center" });
  };

  return (
    <div className={styles.bg}> 
      <Container className={styles.mainContainer}>
        <Row className={styles.alignStart}>
          <Col xs={12} md={3} className={styles.sidebar}>
            <div className={styles.profileBox}>
              <img
                src={userGif}
                className={styles.avatar}
                alt="User"
              />
              <h4 className="mt-3">{updatedUser.name}</h4>
              <p className="text-muted">{updatedUser.phone}</p>
              <span className={styles.bloodType}>{updatedUser.bloodType}</span>

              <div className="mt-4 w-100">
                <Button
                  variant="light"
                  className={`${styles.sidebarBtn} ${activeTab === "overview" ? styles.activeBtn : ""}`}
                  onClick={() => setActiveTab("overview")}
                >
                  Overview
                </Button>

                <Button
                  variant="light"
                  className={`${styles.sidebarBtn} ${activeTab === "history" ? styles.activeBtn : ""}`}
                  onClick={() => setActiveTab("history")}
                >
                  Donation History
                </Button>
              </div>
            </div>
          </Col>

          <Col xs={12} md={9} className={styles.mainContent}>
            {activeTab === "overview" && (
              <>
                <Row>
                  <Col xs={12} md={4}>
                    <Card className={`${styles.statCard} ${styles.statRed}`}>
                      <h5>Total Donations</h5>
                      <h2>{updatedUser.totalDonations || 0}</h2>
                    </Card>
                  </Col>

                  <Col xs={12} md={8}>
                    <Card className={`${styles.statCard} ${styles.statGreen}`} style={{ padding: "25px" }}>
                      <Row className="align-items-center">
                        <Col xs={12} md={6}>
                          <h5>Rewards</h5>
                          <h2>{discount}%</h2>
                        </Col>

                        <Col xs={12} md={6}>
                          <div
                            className="p-1 mt-2 mt-md-0"
                            style={{
                              border: "1px solid #28a745",
                              borderRadius: "8px",
                              backgroundColor: "#ececec",
                              fontSize: "14px",
                              color: "#155724",
                              textAlign: "center",
                            }}
                          >
                            Discount for any hospital lab tests / X-rays.
                            <br />
                            Valid for 1 year.
                            <br />
                            Each donation gives +10%.
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>

                <Card className="mt-4 p-4">
                  <div className="d-flex justify-content-between">
                    <h5>Personal Information</h5>
                    <Button variant="danger" onClick={() => setShowModal(true)}>
                      Edit
                    </Button>
                  </div>

                  <Row className="mt-3">
                    <Col md={6}>
                      <p className={styles.infoLabel}>Full Name</p>
                      <p className={styles.infoValue}>{updatedUser.name}</p>
                    </Col>

                    <Col md={6}>
                      <p className={styles.infoLabel}>Phone</p>
                      <p className={styles.infoValue}>{updatedUser.phone}</p>
                    </Col>

                    <Col md={6}>
                      <p className={styles.infoLabel}>Age</p>
                      <p className={styles.infoValue}>{updatedUser.age}</p>
                    </Col>

                    <Col md={6}>
                      <p className={styles.infoLabel}>Blood Type</p>
                      <p className={styles.infoValue}>{updatedUser.bloodType}</p>
                    </Col>

                    <Col md={6}>
                      <p className={styles.infoLabel}>City</p>
                      <p className={styles.infoValue}>{updatedUser.governorate}</p>
                    </Col>

                    <Col md={6}>
                      <p className={styles.infoLabel}>Rating</p>
                      <div className="star-rating readonly">
                        {Array.from({ length: 5 }, (_, i) => {
                          const filled = i < Math.round(updatedUser.rating || 0);
                          return (
                            <i
                              key={i}
                              className="bi bi-star-fill"
                              style={{
                                color: filled ? "#ffc107" : "#e4e5e9",
                                fontSize: "24px",
                                marginRight: "2px",
                              }}
                            ></i>
                          );
                        })}

                        <p className="mt-1 text-muted" style={{ fontSize: "14px" }}>
                          Rated by {updatedUser.raters || 0} user
                          {(updatedUser.raters || 0) !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </>
            )}

            {activeTab === "history" && (
              <Card className="p-4 mt-3">
                <h4>
                  Donation History
                  <img
                    src={formGif}
                    className="mx-auto mb-3"
                    style={{ width: "60px" }}
                  />
                </h4>

                {(updatedUser.donationHistory || []).length === 0 && (
                  <p className="mt-3 text-muted text-center">
                    <img
                      src={noResultGif}
                      alt="No results"
                      className="d-block mx-auto mb-3"
                      style={{ width: "80px" }}
                    />
                    No result found
                  </p>
                )}

                {(updatedUser.donationHistory || []).map((item, i) => {
                  const firstName = item.requesterName?.split(" ")[0] || "User";
                  const alreadyRated = item.ratedByGlobal?.[updatedUser.phone];

                  return (
                    <Card
                      key={i}
                      className="p-3 my-3 position-relative"
                      style={{
                        borderRadius: "18px",
                        minHeight: "120px",
                        boxShadow: "0 0 12px rgba(255,0,0,0.25)",
                        border: "none",
                      }}
                    >
                      <span
                        className={`${styles.statusCompleted} ${styles.statusFix} position-absolute`}
                        style={{ top: "10px", right: "10px" }}
                      >
                        {item.status}
                      </span>

                      <div className={`d-flex align-items-center mb-2  ${styles.historyCardHeader}`}>
                        <BsPersonCircle size={28} color="#dc3545" className="me-2" />
                        <h5 className="fw-bold mb-0">{item.requesterName}</h5>
                      </div>

                      <div className="d-flex align-items-center mb-3">
                        <BsCalendarDate size={20} color="#dc3545" className="me-2" />
                        <span className="text-muted request-date">{item.date}</span>
                      </div>

                      <div className="d-flex justify-content-end">
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="px-4 rate-btn"
                          style={{ height: "32px" }}
                          onClick={() => {
                            setSelectedRequester(item);
                            setRatingStars(0);
                            setShowRateModal(true);
                          }}
                          disabled={alreadyRated}
                        >
                          {alreadyRated ? "Already Rated" : `Rate ${firstName}`}
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </Card>
            )}
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditProfile closeModal={() => setShowModal(false)} />
        </Modal.Body>
      </Modal>

      <Modal show={showRateModal} onHide={() => setShowRateModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Rate {selectedRequester?.requesterName}:</Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center">
          <h5>{selectedRequester?.requesterName}</h5>
          <div className="mt-3">
            {Array.from({ length: 5 }, (_, i) => (
              <i
                key={i}
                className="bi bi-star-fill"
                style={{
                  fontSize: "32px",
                  margin: "5px",
                  cursor: "pointer",
                  color: i < ratingStars ? "#ffc107" : "#e4e5e9",
                }}
                onClick={() => setRatingStars(i + 1)}
              ></i>
            ))}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRateModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleRateSubmit}>
            Submit Rating
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Profile;
