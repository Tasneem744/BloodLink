import React from "react";
import ReceivedRequests from "../features/requests/ReceivedRequests";
import NavbarAfterLogin from '../components/common/navbar/NavbarAfterLogin';
import Footer from '../components/common/footer/Footer';

function ReceivedRequestsPage() {
  return(
  <>
    <NavbarAfterLogin/>
    <div className="py-5 mt-5">
      <ReceivedRequests/>
    </div>
    <Footer/>
  </>
  );
}

export default ReceivedRequestsPage;