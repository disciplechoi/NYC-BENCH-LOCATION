'use client'

//AIzaSyCV5DUqz-rq2PMXnnU278hGbz54cHHwgpU

import React, { useEffect } from 'react';

import { MapPosition } from '@/types';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import { getMapData } from '@/utils/mapData';
import Benches from '@/components/Benches';
import { GOOGLE_MAP_KEY } from '@/utils/config';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

let center = {
  lat: 0,
  lng: 0
};

let userLocation = {
  lat: 40.729864,
  lng: -73.8977284
};

const zoom = 16;

export default function Home() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAP_KEY

  })

  const [map, setMap] = React.useState(null);
  const [currentLocation, setCurrentLocation] = React.useState([{ lat: 40.729864, lng: -73.8977284 }]);

  //get seat information from API.
  const [seatLocation, setSeatLocation] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMapData();
      setSeatLocation(data);
    }

    fetchData();
  }, []);


  let currentPosition: MapPosition;


  const onLoad = React.useCallback(async function callback(map) {

    userLocation = await getUserLocation() || {
      lat: 40.729864,
      lng: -73.8977284
    };
    // setCurrentLocation(userLocation);
    console.log(userLocation);
    // currentLocation.then((currentLocation)=> new window.google.maps.LatLngBounds(currentLocation))
    const bounds = new window.google.maps.LatLngBounds(userLocation);

    map.fitBounds(bounds);
    map.setZoom(zoom);

    setMap(map)
  }, [])


  async function getUserLocation() {
    // Try HTML5 geolocation.

    if (navigator.geolocation) {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      return {
        lng: pos.coords.longitude,
        lat: pos.coords.latitude,
      };

    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };


  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <>
      <div className="grid grid-cols-10 mx-16 lg:mx-36 xl:mx-40">
        <div className="col-span-3">
          <Benches currentLocation={userLocation}/>
        </div>
        <div className='w-full col-span-7'>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={17}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {seatLocation.map((position: any) =>
              <MarkerF
                position={{ lat: parseFloat(position.latitude), lng: parseFloat(position.longitude) }} />
            )}
          </GoogleMap>
        </div>

      </div>

    </>

  ) : <></>
}
