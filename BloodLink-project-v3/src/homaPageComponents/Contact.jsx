import { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import emailjs from "emailjs-com";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sending form data:", formData);

    emailjs
      .send(
        "service_2z00o85",       
        "template_7uaw6lw",      
        formData,                
        "HL7fOaCcJmdjWb8gN" 
      )
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
          alert("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" }); 
        },
        (error) => {
          console.log("Failed to send email:", error.text);
          alert("Failed to send message, check console for error.");
        }
      );
  };

  const contactItems = [
    { Icon: Mail, title: "Email", content: "info@bloodcare.com" },
    { Icon: Phone, title: "Phone", content: "+1 (555) 123-4567" },
    { Icon: MapPin, title: "Location", content: "123 Health Street, Medical City" },
  ];

  const socialLinks = [
    { Icon: Facebook, href: "#" },
    { Icon: Instagram, href: "#" },
    { Icon: Twitter, href: "#" },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-5"
      style={{ background: "linear-gradient(to bottom, #fff0f2, #ffe6eb)" }}
      id="contact"
    >
      <Container className="px-3 px-md-4">
        <div
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease",
          }}
        >
          <h2 className="mb-2">Get In Touch</h2>
          <p className="text-muted">Have questions? We'd love to hear from you. Send us a message!</p>
        </div>

        <Row className="g-4">
          <Col xs={12} md={6}>
            <Card className={`p-4 rounded-4 shadow-sm`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "scale(1)" : "scale(0.95)",
                transition: "all 0.8s ease",
                transitionDelay: "0.1s",
              }}
            >
              <Card.Body>
                <Card.Title className="mb-4">Send us a Message</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      style={{ borderRadius: "1rem", background: "linear-gradient(to bottom, #fff0f2, #ffe6eb)" }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 rounded-4">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      style={{ borderRadius: "1rem", background: "linear-gradient(to bottom, #fff0f2, #ffe6eb)" }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Your message here..."
                      required
                      style={{ borderRadius: "1rem", resize: "none", background: "linear-gradient(to bottom, #fff0f2, #ffe6eb)" }}
                    />
                  </Form.Group>

                  <Button type="submit" variant="danger" className="w-100">
                    Send Message
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6} className="d-flex flex-column gap-3">
            {contactItems.map((item, i) => (
              <Card className="p-3 rounded shadow-sm"
                key={i}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "scale(1)" : "scale(0.95)",
                  transition: `all 0.8s ease ${0.2 + i * 0.1}s`,
                }}
              >
                <div className="d-flex align-items-center gap-3">
                  <div className="p-2 bg-danger text-white rounded-circle">
                    <item.Icon size={20} />
                  </div>
                  <div>
                    <h6 className="mb-0">{item.title}</h6>
                    <small className="text-muted">{item.content}</small>
                  </div>
                </div>
              </Card>
            ))}

            <Card className="p-3 rounded shadow-sm"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "scale(1)" : "scale(0.95)",
                transition: `all 0.8s ease 0.5s`,
                textAlign: "center",
              }}
            >
              <p className="mb-3">Follow us on social media</p>
              <div className="d-flex justify-content-center gap-3">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    className="d-flex align-items-center justify-content-center bg-light text-danger rounded-circle"
                    style={{
                      width: "50px",
                      height: "50px",
                      transition: "all 0.3s",
                    }}
                  >
                    <social.Icon size={24} />
                  </a>
                ))}
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Contact;




