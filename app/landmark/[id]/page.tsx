import { fetchLandmarkDetail } from "@/actions/actions";
import FavoriteToggleButton from "@/components/card/FavoriteToggleButton";
import Breadcrum from "@/components/landmark/Breadcrum";
import Description from "@/components/landmark/Description";
import ImageContainer from "@/components/landmark/ImageContainer";
import ShareButton from "@/components/landmark/ShareButton";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const landmark = await fetchLandmarkDetail({ id });

  if (!landmark) {
    redirect("/");
  }

  return (
    <section>
      <Breadcrum name={landmark.name} />
      <header className="mt-4 flex items-center justify-between">
        <h1 className="text-xl font-bold capitalize"> {landmark.name}</h1>

        <div className="flex gap-4 items-center">
           <ShareButton landmarkId={landmark.id} name={landmark.name}/>
            <FavoriteToggleButton landmarkId={landmark.id}/>
        </div>

      </header>
      {/* Image */}
      <ImageContainer mainImage={landmark.image} name={landmark.name}/>
      {/* Detail */}
      <section>
        <div>
          <Description province={landmark.province} description={landmark.description} price={landmark.price}/>
         
        </div>
      </section>
    </section>
  );
};
export default page;
