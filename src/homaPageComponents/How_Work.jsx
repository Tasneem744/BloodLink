import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { MapPin, Heart, BarChart3, Bell } from "lucide-react";

function Features() {
  const features = [
    {
      icon: MapPin,
      title: "Find Nearby Centers",
      description:
        "Locate blood donation centers near you with real-time availability and directions.",
    },
    {
      icon: Heart,
      title: "Send Requests",
      description:
        "Post blood donation requests and connect with willing donors in your community.",
    },
    {
      icon: BarChart3,
      title: "Track History",
      description:
        "Keep a complete record of your donations and health metrics over time.",
    },
    {
      icon: Bell,
      title: "Get Notifications",
      description:
        "Receive alerts when your blood type is urgently needed in your area.",
    },
  ];

  return (
    <section id="features" className="py-5 bg-light">
      <Container>
        
        <div className="text-center mb-5">
         <h2 className="fw-bold mb-3 fs-4 fs-md-3 fs-lg-2">
            How It Works
          </h2>
         <p className="text-muted fs-5 mx-auto" style={{ maxWidth: "600px" }}>
            Our platform makes blood donation simple, safe, and impactful.
          </p>
        </div>

       
        <Row className="g-4 ">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
             <Col xs={12} sm={6} md={6} lg={3} key={index}>
              <Card className="h-100 shadow-sm border-0 rounded-3 p-3 p-md-4">
                    
                  <Card.Body className="d-flex flex-column align-items-start py-3 py-md-4">
                    <div
                    className="d-flex align-items-center justify-content-center mb-3 rounded bg-light p-2"
                    style={{
                    
                      backgroundColor: "#fee2e2"
                    }}
                                             >
                      <Icon size={24} color="#dc3545" />
                    </div>
                    <Card.Title className="fw-bold mb-2">{feature.title}</Card.Title>
                    <Card.Text className="text-muted">{feature.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
}

export default Features;