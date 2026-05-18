import React, { useState, useMemo, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { BsGeoAltFill, BsClockFill, BsTelephoneFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import noResultGif from "../../../assets/images/no-data (1).gif";
import transfusionGif from "../../../assets/images/transfusion.gif";

const PlaceList = () => {
  const centers = useSelector((state) => state.place.centers);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const [search, setSearch] = useState("");

  const userCityCenters = useMemo(() => {
    if (!centers || !user?.governorate) return [];
    return centers.filter(
      (center) => center.city.toLowerCase() === user.governorate.toLowerCase()
    );
  }, [centers, user]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return userCityCenters;
    return userCityCenters.filter(
      (center) =>
        (center.name || "").toLowerCase().includes(q) ||
        (center.city || "").toLowerCase().includes(q)
    );
  }, [search, userCityCenters]);

  return (
    <Container className="pt-5 mt-5">
      <h2 className="text-center fw-bold">
        Donation Centers in Your City
        <img
          src={transfusionGif}
          alt="Blood Donation"
          style={{ width: "80px" }}
        />
      </h2>
      <p className="text-center text-muted mb-3">
        Find nearby blood donation centers in your area
      </p>

      <Form className="mb-5 d-flex justify-content-center">
        <Form.Control
          type="text"
          placeholder="Search by center name"
          value={search}
          style={{ maxWidth: 500 }}
          className="focus-ring focus-ring-danger"
          onChange={(e) => setSearch(e.target.value)}
        />
      </Form>

      <Row className="g-4">
        {filtered.length === 0 ? (
          <Col xs={12}>
            <p className="text-center text-muted">
              <img
                src={noResultGif}
                alt="No results"
                className="d-block mx-auto mb-3"
                style={{ width: "80px" }}
              />
              No centers found in your area.
            </p>
          </Col>
        ) : (
          filtered.map((center) => (
            <Col key={center.id} xs={12} sm={6} md={6} lg={4}>
              <Card
                className="rounded-4 border-0"
                style={{ boxShadow: "0 4px 8px #ffabab" }}
              >
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <Card.Title className="fw-bold mb-0">
                        {center.name}
                      </Card.Title>
                      <small className="text-muted">{center.city}</small>
                    </div>
                  </div>

                  <div className="text-muted mb-3" style={{ flex: 1 }}>
                    <div className="mb-2 d-flex align-items-center">
                      <BsGeoAltFill className="me-2 text-danger" />
                      <span>{center.address || center.city}</span>
                    </div>
                    <div className="mb-2 d-flex align-items-center">
                      <BsClockFill className="me-2 text-danger" />
                      <span>{center.available_time}</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <BsTelephoneFill className="me-2 text-danger" />
                      <span>{center.phone || "—"}</span>
                    </div>
                  </div>

                  <Button
                    variant="danger"
                    className="mt-2 fw-semibold"
                    onClick={() => window.open(center.location, "_blank")}
                  >
                    View Location
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default PlaceList;
