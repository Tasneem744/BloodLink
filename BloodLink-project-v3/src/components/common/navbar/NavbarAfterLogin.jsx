"use client";
import { useState } from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { Menu, User } from "lucide-react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { clearUser } from "../../../features/user/userSlice";
import BloodLinkGif from "../../../assets/images/blood-ezgif.com-crop.gif";

export default function NavbarAfterLogin() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/donation-centers", label: "Donation Centers" },
    { to: "/donate", label: "Send Request" },
    { to: "/my-requests", label: "My Requests" },
    { to: "/received-requests", label: "Received Requests" },
  ];

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/login", { replace: true });
  };

  return (
    <Navbar
      expand="lg"
      bg="white"
      fixed="top"
      expanded={expanded}
      className="border-bottom shadow-sm py-2"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center gap-2">
          <div className="p-1 d-flex align-items-center justify-content-center">
            <img src={BloodLinkGif} alt="BloodLink" style={{ width: "50px" }} />
          </div>
          <span className="text-dark fw-bold fs-5">BloodLink</span>
        </Navbar.Brand>

        <Navbar.Toggle onClick={() => setExpanded(!expanded)}>
          <Menu size={24} />
        </Navbar.Toggle>

        <Navbar.Collapse className="justify-content-center">
          <Nav className="text-center">
            {navLinks.map((link) => (
              <Nav.Link
                as={NavLink}
                key={link.to}
                to={link.to}
                onClick={() => setExpanded(false)}
                className="fw-semibold mx-2"
                style={({ isActive }) => ({
                  color: isActive ? "#dc3545" : "#212529",
                  transition: "color 0.2s ease",
                })}
              >
                {link.label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>

        <Dropdown align="end">
          <Dropdown.Toggle
            variant="outline-danger"
            id="profile-dropdown"
            className="d-flex align-items-center gap-2 border border-danger rounded-pill px-3"
          >
            <User size={20} />
            <span className="fw-semibold">{user?.name || user?.phone || "User"}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu className="shadow-sm border-0">
            <Dropdown.Item as={Link} to="/profile">
              Profile
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className="text-danger fw-semibold" onClick={handleLogout}>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
}