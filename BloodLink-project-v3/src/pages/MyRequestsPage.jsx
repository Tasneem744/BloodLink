import React from 'react';
import MyRequests from '../features/requests/MyRequests';
import NavbarAfterLogin from '../components/common/navbar/NavbarAfterLogin';
import Footer from '../components/common/footer/Footer';

export default function MyRequestsPage() {
  return (
    <>
    <NavbarAfterLogin/>
    <main className="py-5">
        <MyRequests />
    </main>
    <Footer/>
    </>
  )
};
