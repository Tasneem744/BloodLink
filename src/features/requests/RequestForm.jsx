import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Form, Button, Container } from "react-bootstrap";
import bloodGif from "../../assets/images/blood-test.gif";
import donationData from "../../data/data.json";

function RequestForm() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [places, setPlaces] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [place, setPlace] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    setUser(storedUser);
    setUsers(storedUsers);
    setPlaces(donationData.donation_places);
    setName(storedUser.name || "");
    setPhone(storedUser.phone || "");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please log in to send a request", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });
      return;
    }

    const existingRequests = JSON.parse(localStorage.getItem("requests")) || [];

    const recipients = users.filter(
      (u) =>
        u.phone !== user.phone && 
        u.governorate?.toLowerCase() === user.governorate?.toLowerCase() &&
        u.bloodType === bloodType
    );

    if (recipients.length === 0) {
      toast.error("No matching donors found in your governorate for this blood type", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });
      return;
    }


    const newRequest = {
      id: Date.now(),
      user_phone: user.phone,
      requester_name: name,
      requester_phone: phone,
      blood_type_needed: bloodType,
      place,
      state: "open",
      createdAt: new Date().toISOString(),
    };

    const updatedRequests = [...existingRequests, newRequest];
    localStorage.setItem("requests", JSON.stringify(updatedRequests));

    setBloodType("");
    setPlace("");

    toast.success("Request created successfully", {
      position: "top-center",
      autoClose: 2000,
      theme: "colored",
    });
  };

  return (
    <Container className="mt-5">
      <h3 className="mt-4 text-center fw-bold">Send Donation Request</h3>
      <p className="mt-2 text-center fs-8 text-secondary">
        Submit a blood donation request to find donors in your area
      </p>

      <Form
        onSubmit={handleSubmit}
        className="col-12 col-md-8 col-lg-5 mx-auto mt-4 py-4 px-3 border rounded shadow-sm"
        style={{ fontSize: "15px", backgroundColor: "#fff" }}
      >
        <img
          src={bloodGif}
          alt="Blood Donation"
          className="d-block mx-auto mb-3"
          style={{ width: "80px" }}
        />
        <p className="text-center fs-6 mb-4 fw-bold">
          Help save a life — every drop matters
        </p>

        <Form.Label htmlFor="name" className="mb-2">
          Full Name
        </Form.Label>
        <Form.Control
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-3 bg-light"
          style={{ fontSize: "15px" }}
        />

        <Form.Label htmlFor="phone" className="mb-2">
          Phone Number
        </Form.Label>
        <Form.Control
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mb-3 bg-light"
          style={{ fontSize: "15px" }}
        />

        <Form.Label htmlFor="bloodType" className="mb-2">
          Blood Type Needed
        </Form.Label>
        <Form.Select
          value={bloodType}
          onChange={(e) => setBloodType(e.target.value)}
          className="focus-ring focus-ring-danger fs-10"
          style={{ fontSize: "15px" }}
          required
        >
          <option value="">Choose blood type</option>
          {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bt) => (
            <option key={bt} value={bt}>
              {bt}
            </option>
          ))}
        </Form.Select>

        <Form.Label htmlFor="place" className="mt-3 mb-2">
          Donation Place
        </Form.Label>
        <Form.Select
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          className="focus-ring focus-ring-danger"
          style={{ fontSize: "15px" }}
          required
        >
          <option value="">Choose place</option>
          {places
            .filter(
              (p) => p.city?.toLowerCase() === user?.governorate?.toLowerCase()
            )
            .map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
        </Form.Select>

        <Button variant="danger" type="submit" className="mt-4 w-100">
          Send Request
        </Button>
      </Form>
    </Container>
  );
}

export default RequestForm;
