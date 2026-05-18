import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Heart, Users, TrendingUp, Zap } from "lucide-react";

function Statistics() {
  const stats = [
    { target: 50000, label: "Total Donations", icon: Heart, suffix: "+" },
    { target: 100000, label: "Lives Saved", icon: Users, suffix: "+" },
    { target: 500, label: "Registered Donors", icon: TrendingUp, suffix: "+" },
    { target: 2024, label: "Donations This Year", icon: Zap, suffix: "" },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));
  const [start, setStart] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const section = document.getElementById("stats");
      if (section && section.getBoundingClientRect().top < window.innerHeight - 150) {
        setStart(true);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!start) return;
    const timers = stats.map((s, i) =>
      setInterval(() => {
        setCounts(prev => {
          const n = [...prev];
          n[i] = Math.min(n[i] + Math.ceil(s.target / 50), s.target);
          return n;
        });
      }, 40)
    );
    return () => timers.forEach(clearInterval);
  }, [start]);

  const format = n => (n >= 1000 ? (n / 1000).toFixed(0) + "K" : n);

  return (
    <section
      id="stats"
       className="py-5"
      style={{

        background: "linear-gradient(to bottom right, white, #fceff0ff, #fce7f1ff)",
        position: "relative"
      }}
    >
      <Container>
       
        <div className="text-center mb-5">
          <h2 className="fw-bold text-center display-4 display-md-3 display-lg-2">Our Impact</h2>
          <p className="text-secondary fs-6 fs-md-5 fs-lg-4 text-center">
            Making a difference in lives through blood donation
          </p>
        </div>

        <Row className="g-4">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <Col xs={12} sm={6} md={3} key={i}>
                <Card   className="text-center p-3 rounded-4 shadow-sm"
                  style={{
                    border: "1px solid #f9a8d4",
                    transition: "0.3s"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform =  "translateY(-12px) scale(1.03)";
                    e.currentTarget.style.boxShadow = "0 12px 35px rgba(0,0,0,0.15)";
                    e.currentTarget.style.background = "linear-gradient(to bottom right, white, #fceff0ff, #fce7f1ff)";

                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.08)";
                     e.currentTarget.style.background =  "white";

                  }}
                >
                  <div className="d-flex align-items-center justify-content-center mx-auto mb-3 rounded-circle"
                    style={{
                     
                      background: "linear-gradient(to bottom right, #fecdd3, #ffd8ec)"
                    }}
                  >
                    <Icon size={32} color="#d61f3c" />
                  </div>

                  <h3
                    className="fw-bold text-danger mb-1 fs-1 fs-md-2 fs-lg-1">
                  
                    {format(counts[i])}{s.suffix}
                  </h3>
                  <p className="fw-semibold text-secondary fs-6 fs-md-5">
                    {s.label}
                  </p>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
}

export default Statistics;