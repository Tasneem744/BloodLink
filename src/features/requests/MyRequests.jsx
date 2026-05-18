import { useEffect, useState } from "react";
import { Button, Table, Alert } from "react-bootstrap";
import { BsGeoAltFill, BsCalendarFill, BsDropletFill } from "react-icons/bs";
import reportGif from "../../assets/images/report.gif";
import noResultGif from "../../assets/images/no-data (1).gif";
import { Link } from "react-router-dom";

function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedRequests = JSON.parse(localStorage.getItem("requests")) || [];
    const storedAccepted = JSON.parse(localStorage.getItem("acceptedRequests")) || [];

    setUser(storedUser);
    setRequests(storedRequests);
    setAccepted(storedAccepted);
  }, []);

  if (!user)
    return <h3 style={{ textAlign: "center", marginTop: 30 }}>Please login first</h3>;

  const myRequests = requests.filter((r) => r.user_phone === user.phone);

  const handleToggle = (req) => {
    const newState = req.state === "open" ? "closed" : "open";

    const updatedRequests = requests.map((r) =>
      r.id === req.id ? { ...r, state: newState } : r
    );

    setRequests(updatedRequests);
    localStorage.setItem("requests", JSON.stringify(updatedRequests));
  };

  const countAccepted = (reqId) => {
    return accepted.filter(a => a.requestId === reqId).length;
  }

  return (
    <>
      <h2 className="mt-5 pt-4 text-center fw-bold">
        My Donation Requests
        <img src={reportGif} alt="Blood Donation" style={{ width: "80px" }} />
      </h2>
      <p className="text-center mb-2 text-secondary">
        Track the status of your blood donation requests
      </p>

      {myRequests.length > 0 && (
        <Alert
            variant="success"
            style={{
              fontSize: "0.9rem",
              width: "90%",         
              maxWidth: "780px", 
              margin: "10px auto 20px auto",
              padding: "0.75rem 1rem", 
              textAlign: "center",
            }}
          >
            To see the donors who accepted your request, click on the number in the "Accepted" column below.
          </Alert>
        )}

      {myRequests.length === 0 ? (
        <p className="text-center">
          <img src={noResultGif} alt="No results" className="d-block mx-auto mb-3" style={{ width: "80px" }} />
          No requests found.
        </p>
      ) : (
        <div className="container mt-4 mb-5">
          <Table responsive className="table table-hover align-middle">
            <thead className="fw-bold">
              <tr>
                <th>Place</th>
                <th>Blood Type</th>
                <th>Date</th>
                <th>Status</th>
                <th>Accepted</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {myRequests.map((r) => {
                const date = r.createdAt ? new Date(r.createdAt) : null;
                const acceptedCount = countAccepted(r.id);

                return (
                  <tr key={r.id}>
                    <td>
                      <BsGeoAltFill className="me-2 text-danger" size={20} />
                      {r.place || "—"}
                    </td>
                    <td>
                      <BsDropletFill className="me-2 text-danger" size={20} />
                      {r.blood_type_needed || "—"}
                    </td>
                    <td>
                      <BsCalendarFill className="me-2 text-danger" size={20} />
                      {date ? date.toLocaleDateString() : "_"}
                    </td>
                    <td>
                      <span
                        className="px-3 py-1 rounded-pill fw-bold"
                        style={{
                          backgroundColor:
                            r.state === "open"
                              ? "#dbfce7"
                              : r.state === "pending"
                              ? "#fff3cd"
                              : "#ffe2e2",
                          color:
                            r.state === "open"
                              ? "#1d6630"
                              : r.state === "pending"
                              ? "#856404"
                              : "#9f1526",
                        }}
                      >
                        {r.state || "—"}
                      </span>
                    </td>
                    <td>
                      <Link to={`/accepted/${r.id}`} className="text-decoration-none fw-bold">
                        {acceptedCount}
                      </Link>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleToggle(r)}
                      >
                        {r.state === "open" ? "Close" : "Open"}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
}

export default MyRequests;
