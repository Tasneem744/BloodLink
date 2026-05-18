import NavbarAfterLogin from '../components/common/navbar/NavbarAfterLogin';
import Footer from '../components/common/footer/Footer';
import Profile from "../features/user/components/ProfilePage.jsx"

function ProfilePage() {
  return (
    <>
    <div className="pt-4">
      <NavbarAfterLogin />
      <Profile />
      <Footer />
    </div>
    </>
  )
}

export default ProfilePage