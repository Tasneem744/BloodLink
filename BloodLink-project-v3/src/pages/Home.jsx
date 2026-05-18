import Hero from "../homaPageComponents/Hero";
import About from "../homaPageComponents/About";
import How_Work from "../homaPageComponents/How_Work";
import Statistics from "../homaPageComponents/Statistics";
import Eligibility from "../homaPageComponents/Eligibility";
import SuccessStories from "../homaPageComponents/SuccessStories";
import Contact from "../homaPageComponents/Contact";
import Footer from '../components/common/footer/Footer';
import NavbarAfterLogin from '../components/common/navbar/NavbarAfterLogin';
import NavbarBeforeLogin from "../components/common/navbar/NavbarbeforeLogin";
import { useAppSelector } from "../app/hooks";

function Home() {
  const { user } = useAppSelector((state) => state.user);
  const loggedIn = !!user;

  return (
    <>
      {loggedIn ? <NavbarAfterLogin /> : <NavbarBeforeLogin />}
      <Hero />
      <About />
      <Eligibility />
      <Statistics />
      <How_Work />
      <SuccessStories />
      <Contact />
      <Footer />
    </>
  );
}

export default Home;