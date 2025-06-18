import { fetchFavorits } from "@/actions/actions"
import EmptyList from "@/components/home/EmptyList"
import LandmarkList from "@/components/home/LandmarkList"

const FavoritsPage = async() => {

  const favorites = await fetchFavorits()
  if(favorites.length === 0) {
    return <EmptyList  
    message="Please Add your Favorite"
    btnText="Back Home"
    headding="No items Favorites"/>
  }
   
  return (
    <LandmarkList landmarks={favorites}/> 
  )
}
export default FavoritsPage