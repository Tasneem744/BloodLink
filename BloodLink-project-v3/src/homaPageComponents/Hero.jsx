import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks"; 
import styles from "./styles/Hero.module.css";

function Hero() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);

  const handleDonateClick = () => {
    if (user) {
      navigate("/donation-centers", { replace: false });
    } else {
      navigate("/login");
    }
  };

  return (
    <section
      id="home"
      className={`${styles.heroSection} d-flex align-items-center justify-content-center position-relative`}
      style={{ minHeight: "100vh", margin: 0 }}
    >
      <div className={styles.heroBg}></div>

      <Container className="h-100 pt-2 mt-5 px-3 px-md-4">
        <Row className="align-items-center justify-content-center h-100 g-4">
          <Col
            lg={6}
            className="text-center text-lg-start mb-4 mb-lg-0"
          >
            <h1 className="fw-bold text-dark mb-3 display-4 display-md-3 display-lg-2">
              Donate Blood, <br />
              <span className="text-danger">Save Lives</span>
            </h1>

            <p className="text-dark mb-4 fs-6 fs-md-5">
              Join our community of lifesavers. Every donation makes a
              difference in someone's life. Be the hero someone needs today.
            </p>

            <div className="d-flex flex-column flex-sm-row gap-2 gap-md-3 justify-content-center justify-content-lg-start">
              <Button
                variant="danger"
                size="lg"
                onClick={handleDonateClick}
                className="d-flex align-items-center justify-content-center gap-2 fw-bold px-3 px-md-4 py-2 w-100 w-sm-auto"
              >
                Donate Now <ArrowRight size={18} className="ms-1" />
              </Button>

              <Button
                variant="outline-danger"
                size="lg"
                href="#about"
                className="fw-bold px-3 px-md-4 py-2 w-100 w-sm-auto"
              >
                Learn More
              </Button>
            </div>
          </Col>

          <Col lg={6} className="text-center">
            <div className={`${styles.illustrationWrapper}`}>
              <svg
                className={styles.heartIcon}
                viewBox="0 0 100 100"
                fill="currentColor"
              >
                <path d="M50 90 C 20 70, 5 55, 5 40 C 5 25, 15 15, 25 15 C 35 15, 45 25, 50 35 C 55 25, 65 15, 75 15 C 85 15, 95 25, 95 40 C 95 55, 80 70, 50 90 Z" />
              </svg>
              <div className={styles.circle2}></div>
              <div className={styles.circle1}></div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Hero;
