'use client'

import dynamic from "next/dynamic";
const MapLandmark = dynamic(() => import('@/components/map/MapLandmark'),{ ssr: false})

const Maps = () => {
    return(
        <MapLandmark />
    )
}

export default Maps