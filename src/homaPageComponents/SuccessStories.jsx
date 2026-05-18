import { useEffect, useRef, useState } from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
import image1 from "../assets/images/woman-donor-smiling.jpg"
import image2 from "../assets/images/man-grateful-recipient.jpg"
import image3 from "../assets/images/woman-healthy-donor.jpg"

function SuccessStories() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const stories = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Donor",
      story:
        "Donating blood has become part of my routine. Knowing that my donation can save lives makes me feel connected to my community.",
      image: image1,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Recipient",
      story:
        "After my surgery, I received blood from generous donors. I'm forever grateful for their selfless act that gave me a second chance.",
      image: image2,
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Donor",
      story:
        "I started donating to help others, but I discovered it also improved my own health. It's a win-win for everyone involved.",
      image: image3,
    },
  ]

  return (
    <section
      id="stories"
      ref={sectionRef}
      className="py-5"
      style={{ background: "linear-gradient(to bottom, #fff6f6ff, #fff)" }}
    >
      <Container className="px-3 px-md-4">
        <div
          className="text-center mb-5"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "0.8s ease",
          }}
        >
          <h2 className="fw-bold display-5">Real Stories, Real Impact</h2>
          <p className="fs-5 text-muted mx-auto" style={{ maxWidth: "600px" }}>
            Hear from donors and recipients whose lives have been changed by blood donation.
          </p>
        </div>

        <Row className="g-4">
          {stories.map((story, index) => (
            <Col md={4} key={story.id}>
              <Card className="h-100 mb-3 mb-md-0 rounded-3 shadow"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "scale(1)" : "scale(0.95)",
                  transition: `0.7s ease ${index * 0.15}s`,
                }}
              >
                <Card.Img 
                  variant="top" 
                  src={story.image} 
                  alt={story.name}
                  style={{ height: "250px", objectFit: "cover" }}
                />

                <Card.Body className="p-3 p-md-4 d-flex flex-column">
                  <Card.Title className="fw-bold mb-2">{story.name}</Card.Title>
                  <Card.Subtitle className="text-danger fw-semibold mb-3">
                    {story.role}
                  </Card.Subtitle>
                  <Card.Text className="text-muted mb-0 flex-grow-1">
                    {story.story}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default SuccessStories;
