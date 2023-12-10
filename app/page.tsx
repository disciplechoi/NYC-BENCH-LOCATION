'use client'

//AIzaSyCV5DUqz-rq2PMXnnU278hGbz54cHHwgpU

import React, { useEffect } from 'react';

import { MapPosition } from '@/types';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import { getMapData } from '@/utils/mapData';

const containerStyle = {
  width: '850px',
  height: '500px'
};

const center = {
  lat: 40.729864,
  lng: -73.8977284
};

const zoom = 10;

export default function Home() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCV5DUqz-rq2PMXnnU278hGbz54cHHwgpU"
    
  })

  const [map, setMap] = React.useState(null);
  
  const [seatLocation, setSeatLocation] = React.useState([]);
  useEffect(()=>{
    const fetchData = async () =>{
      const data = await getMapData();
      // console.log(data.latitude)
      setSeatLocation(data); }

    fetchData();  
  },[]);

  
  let currentPosition : MapPosition;


  const onLoad = React.useCallback(async function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    
    const currentLocation = await getUserLocation();
    console.log(currentLocation);
    // currentLocation.then((currentLocation)=> new window.google.maps.LatLngBounds(currentLocation))
    const bounds = new window.google.maps.LatLngBounds(currentLocation);
    //map.fitBounds(bounds);
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
      // Browser doesn't support Geolocation
      alert("Geolocation is not supported by this browser.");
    }
  };


  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={17}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* <MarkerF
           position={center}/> */}
           {seatLocation.map((position: any) => 
            <MarkerF
              position = {{lat: parseFloat(position.latitude), lng: parseFloat(position.longitude)}}/>
           )}
      </GoogleMap>
  ) : <></>
}
