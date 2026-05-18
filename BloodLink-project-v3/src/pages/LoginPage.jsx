import Login from "../features/auth/components/LoginForm"
import Footer from '../components/common/footer/Footer'
import NavbarbeforeLogin from "../components/common/navbar/NavbarbeforeLogin"

export default function LoginPage() {
  return (
    <>
        <NavbarbeforeLogin/>
        <main className="pt-5">
        <Login />
        </main>
        <Footer/>
    </>
  )
}
