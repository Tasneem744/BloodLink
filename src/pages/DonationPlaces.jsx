import PlaceList from "../features/places/components/PlacesList";
import NavbarAfterLogin from '../components/common/navbar/NavbarAfterLogin';
import Footer from '../components/common/footer/Footer';

function DonationPlaces() {
  return (
    <>
    <NavbarAfterLogin/>
    <div className="py-5">
      <PlaceList/>
    </div>
    <Footer/>
    </>
  );
}

export default DonationPlaces;
