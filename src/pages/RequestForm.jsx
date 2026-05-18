import React from 'react';
import RequestForm from '../features/requests/RequestForm';
import NavbarAfterLogin from '../components/common/navbar/NavbarAfterLogin';
import Footer from '../components/common/footer/Footer';

function RequestFormPage() {
  return (
    <>
    <NavbarAfterLogin/>
    <div className="py-5 mt-5">
      <RequestForm/>
    </div>
    <Footer/>
    </>
  );
}

export default RequestFormPage;