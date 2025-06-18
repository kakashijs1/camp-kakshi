import { Skeleton } from "../ui/skeleton";

const LoadingCard = () => {
  return (
    <div className="py-8">
      <SkeletonCardHero  />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
};

export const SkeletonCard = () => {
  return (
    <div>
      <Skeleton className="h-[400px] w-[340px] overflow-hidden rounded-xl mb-2" />
      <Skeleton className="h-4 w-3/4 overflow-hidden rounded-xl mb-2" />
      <Skeleton className="h-4 w-1/2 overflow-hidden rounded-xl mb-2" />
      <Skeleton className="h-4 w-1/3 overflow-hidden rounded-xl" />
    </div>
  );
};

export const SkeletonCardHero = () => {
  return (
    <div>
      <Skeleton className=" w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[600px] overflow-hidden rounded-xl mb-2" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3 md:gap-4 py-6">
        <Skeleton className="h-24 w-full overflow-hidden rounded-xl mb-2" />
        <Skeleton className="h-24 w-full overflow-hidden rounded-xl mb-2" />
        <Skeleton className="h-24 w-full overflow-hidden rounded-xl mb-2" />
        <Skeleton className="h-24 w-full overflow-hidden rounded-xl mb-2" />
        <Skeleton className="h-24 w-full overflow-hidden rounded-xl mb-2" />
        <Skeleton className="h-24 w-full overflow-hidden rounded-xl mb-2" />
        <Skeleton className="h-24 w-full overflow-hidden rounded-xl mb-2" />
      </div>
    </div>
  );
};

export default LoadingCard;
