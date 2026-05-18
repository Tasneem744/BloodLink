import Register from "../features/auth/components/RegisterForm"
import NavbarbeforeLogin from "../components/common/navbar/NavbarbeforeLogin";
import Footer from '../components/common/footer/Footer';

export default function RegisterPage() {
  return (
    <>   
        <NavbarbeforeLogin/>
        <main className="py-5">
        <Register />
        </main>
        <Footer/>
    </>
  )
}
