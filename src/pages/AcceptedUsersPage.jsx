import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AcceptedUsersList from "../features/requests/AcceptedUsers";

export default function AcceptedUsersPage() {
  const { id } = useParams();

  return (
    <Container className="pt-5 mt-5">
      <AcceptedUsersList requestId={id} />
    </Container>
  );
}
