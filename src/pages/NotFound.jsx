import NotFpuntGig from "../assets/images/no-data.gif"

function NotFound() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center mt-5 pt-5">
      <img src={NotFpuntGig} alt="404 Not Found" style={{ maxWidth: '400px', width: '100%' }} />
      <h2 className="mt-4">404 - Page Not Found</h2>
    </div>
  );
}

export default NotFound;