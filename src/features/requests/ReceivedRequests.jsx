import { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { BsGeoAltFill, BsDropletFill, BsPersonCircle, BsTelephoneFill, BsCalendarDate, BsStarFill } from "react-icons/bs";
import report2Gif from "../../assets/images/report (1).gif";
import noResultGif from "../../assets/images/no-data (1).gif";
import { toast } from "react-toastify";

export default function ReceivedRequestsPage() {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [accepted, setAccepted] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedRequests = JSON.parse(localStorage.getItem("requests")) || [];
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const storedAccepted = JSON.parse(localStorage.getItem("acceptedRequests")) || [];

    setUser(storedUser);
    setRequests(storedRequests);
    setUsers(storedUsers);
    setAccepted(storedAccepted);
  }, []);

  if (!user) return <h3 style={{ textAlign: "center", marginTop: 30 }}>Please login first</h3>;

  const receivedRequests = requests.filter((r) => {
    const requestUser = users.find(
      (u) =>
        u.phone === r.user_phone &&
        u.governorate?.toLowerCase() === user.governorate?.toLowerCase()
    );

    return (
      r.user_phone !== user.phone &&
      r.blood_type_needed === user.bloodType &&
      requestUser &&
      new Date(r.createdAt) > new Date(user.registrationTime)
    );
  });


  const handleAccept = (req) => {
  const requestIndex = requests.findIndex(r => r.id === req.id);
  if (requestIndex === -1) return;

  const updatedRequests = [...requests];
  const targetRequest = updatedRequests[requestIndex];

  const alreadyAccepted = targetRequest.acceptedUsers?.some(
    u => u.userPhone === user.phone
  );

  if (alreadyAccepted) return;

  const updatedAcceptedUsers = targetRequest.acceptedUsers
    ? [...targetRequest.acceptedUsers]
    : [];

  updatedAcceptedUsers.push({
    userId: user.phone,
    name: user.name,
    phone: user.phone,
    rating: 0,
    raters: 0,
    confirmed: false
  });

  targetRequest.acceptedUsers = updatedAcceptedUsers;

  const totalAccepted = updatedAcceptedUsers.length;

  if (totalAccepted % 3 === 0) {
    targetRequest.state = "pending";
  } else {
    targetRequest.state = "open";
  }

  setRequests(updatedRequests);
  localStorage.setItem("requests", JSON.stringify(updatedRequests));

  const newAccepted = [...accepted, { requestId: req.id, userPhone: user.phone }];
  setAccepted(newAccepted);
  localStorage.setItem("acceptedRequests", JSON.stringify(newAccepted));

  toast.success("You accepted this request!", {
    position: "top-center",
    autoClose: 2000,
    theme: "colored"
  });
};

  const requesterInfo = (phone) => {
    const reqUser = users.find(u => u.phone === phone);
    return reqUser
      ? {
          name: reqUser.name,
          phone: reqUser.phone || "N/A",
          rating: reqUser.rating || 0,
          raters: reqUser.raters || 0
        }
      : { name: "Unknown", phone: "N/A", rating: 0, raters: 0 };
  };

  const getStatusBadge = (state) => {
    return (
      <div className={`d-flex align-items-center justify-content-center p-2 px-5 mb-2 rounded-4 fw-bold`} style={{
        backgroundColor: state === "open" ? "#dbfce7" : state === "pending" ? "#fff3cd" : "#ffe2e2",
        color: state === "open" ? "#1d6630" : state === "pending" ? "#856404" : "#9f1526",
        fontSize: "0.85rem"
      }}>
        {state === "open" ? "Open" : state === "pending" ? "Pending" : "Closed"}
      </div>
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <BsStarFill
        key={i}
        className={i < Math.floor(rating) ? "text-warning" : "text-secondary"}
        style={i + 1 - rating === 0.5 ? { opacity: 0.5 } : {}}
      />
    ));
  };

  return (
    <Container className="py-4">
      <h2 className="text-center mb-2 fw-bold">
        Received Requests
        <img src={report2Gif} alt="Blood Donation" style={{ width: "80px" }} />
      </h2>
      <p className="text-center text-secondary mb-5">
        View incoming blood donation requests from people in need
      </p>

      {receivedRequests.length > 0 ? (
        <Row className="g-4 justify-content-center">
          {receivedRequests.map((r) => {
            const { name, phone, rating, raters } = requesterInfo(r.user_phone);
            const hasAccepted = accepted.some(a => a.requestId === r.id && a.userPhone === user.phone);

            return (
              <Col xs={12} sm={10} md={9} lg={8} xl={7} xxl={6} key={r.id}>
                <Card
                  className="w-100 border-0 p-3 p-sm-4 position-relative d-flex flex-column"
                  style={{
                    borderRadius: "24px",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                    background: "#fff",
                    minHeight: "100%",
                    maxWidth: "650px",
                    margin: "0 auto"
                  }}
                >

                  <Card.Body className="text-start p-0 flex-grow-1">
                    <Card.Title className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3">
                      <div className="d-md-none w-100 mb-2">
                        {getStatusBadge(r.state)}
                      </div>

                      <div className="d-flex align-items-center">
                        <BsPersonCircle className="me-2 text-danger" size={28} />
                        <span className="fw-bold">{name}</span>
                      </div>

                      <div className="d-none d-md-block ms-3">
                        {getStatusBadge(r.state)}
                      </div>
                    </Card.Title>
                    <Card.Text className="d-flex align-items-center mb-2">
                      <BsDropletFill className="me-2 text-danger" size={20}/>
                      <strong>Blood Type:&nbsp;</strong>{r.blood_type_needed}
                    </Card.Text>

                    <Card.Text className="d-flex align-items-center mb-2">
                      <BsGeoAltFill className="me-2 text-danger" size={20}/>
                      <strong>Location:&nbsp;</strong>{r.place}
                    </Card.Text>

                    <Card.Text className="d-flex align-items-center mt-2">
                      <BsCalendarDate className="me-2 text-danger" size={20}/>
                      <strong>Date:&nbsp;</strong>{r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "N/A"}
                    </Card.Text>

                    <Card.Text className="d-flex align-items-center mt-2">
                      <BsTelephoneFill className="me-2 text-danger" size={20}/>
                      <strong>Phone:&nbsp;</strong>
                      {phone !== "N/A" ? (
                        <a href={`tel:${phone}`} className="text-decoration-none text-danger">{phone}</a>
                      ) : "N/A"}
                    </Card.Text>

                    <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start mt-2">
                      <Card.Text className="d-flex align-items-center mb-2 mb-lg-0">
                        <BsStarFill className="me-2 text-danger" size={23} />
                        <strong className="me-2">Rating:</strong>
                        {rating > 0 ? (
                          <>
                            <span className="d-flex align-items-center me-2">{renderStars(rating)}</span>
                            ({raters})
                          </>
                        ) : "No ratings yet"}
                      </Card.Text>

                      <Button
                        className="float-end w-sm-100 px-5 mt-3 mt-lg-0"
                        variant="danger"
                        size="md"
                        disabled={hasAccepted || r.state !== "open"}
                        onClick={() => handleAccept(r)}
                      >
                        {hasAccepted ? "Accepted" : "Accept"}
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      ) : (
        <p className="text-center">
          <img src={noResultGif} alt="No results" className="d-block mx-auto mb-3" style={{width:"80px"}}/>
          No requests found.
        </p>
      )}
    </Container>
  );
}
