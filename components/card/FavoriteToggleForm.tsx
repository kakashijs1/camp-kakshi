"use client"
import { toggleFavoriteAction } from "@/actions/actions";
import FormContainer from "../Form/FormContainer";
import { usePathname } from "next/navigation";
import { CardsubmitButton } from "../Form/Buttons";

const FavoriteToggleForm = ({
  favoriteId,
  landmarkId,
}: {
  favoriteId: string | null;
  landmarkId: string;
}) => {
    const pathname = usePathname()

    const toggleAction = toggleFavoriteAction.bind(null,{
        favoriteId,
        landmarkId,
        pathname
    })
  return (
    <FormContainer action={toggleAction}>
      <CardsubmitButton isFavorite={favoriteId ? true : false}/>
    </FormContainer>
  );
};
export default FavoriteToggleForm;
