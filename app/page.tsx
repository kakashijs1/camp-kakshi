
import LoadingLogo from "@/components/card/LoadingLogo";
 
import LandmarkContainer from "@/components/home/LandmarkContainer";
import { Suspense } from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}) => {
  //search
  const { search, category } = await searchParams;


  return (
    <section>
      <Suspense fallback={<LoadingLogo />}>
        <LandmarkContainer search={search} category={category} />
      </Suspense>
    </section>
  );
};
export default page;
