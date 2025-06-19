import { fetchLandmarks, fetchLandmarksHero } from "@/actions/actions";
import LandmarkList from "./LandmarkList";
import Hero from "../hero/Hero";
import CategoriesList from "./CategoriesList";
import EmptyList from "./EmptyList";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const LandmarkContainer = async ({
  search,
  category,
}: {
  search?: string;
  category?: string;
}) => {
  const [landmarks, landmarksHero] = await Promise.all([
    fetchLandmarks({ search, category }),
    fetchLandmarksHero(),
  ]);

  return (
    <>
      <Navbar />
      <div className="py-8">
        <Hero landmarks={landmarksHero} />
        <CategoriesList search={search} category={category} />
        {landmarks.length === 0 ? (
          <EmptyList headding="No results" btnText="clear Filter" />
        ) : (
          <LandmarkList landmarks={landmarks} />
        )}

        <Footer />
      </div>
    </>
  );
};
export default LandmarkContainer;
