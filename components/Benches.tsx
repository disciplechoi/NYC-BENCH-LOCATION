'use client'

import React, { useState, useEffect } from 'react';
import { getMapData } from '@/utils/mapData';

const Benches = ({ currentLocation }) => {
    const [seatLocation, setSeatLocation] = useState([]);
    const [userLocation, setUserLocation] = useState(currentLocation);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getMapData();
            setSeatLocation(data);
        }

        fetchData();
    }, [])

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in kilometers

        return distance;
    };

    useEffect(() => {
        setUserLocation(currentLocation);

        const updatedSeatLocation = seatLocation.map((bench: any) => ({
            ...bench,
            distance: calculateDistance(userLocation.lat, userLocation.lng, bench.latitude, bench.longitude)
        }))

        setSeatLocation(updatedSeatLocation);
        // setSeatLocation(seatLocation.slice().sort((a,b)=> b.distance - a.distance))

        const sortedSeatLocation = updatedSeatLocation.slice().sort((a, b) => a.distance - b.distance);

        setSeatLocation(sortedSeatLocation);

        

    }, [currentLocation])


    // const filterBenchByDistance = () => {
    //     // Assuming 'latitude' and 'longitude' are the correct property names
    //     return seatLocation.filter(bench => {
    //         const distance = calculateDistance(userLocation.lat, userLocation.lng, bench.latitude, bench.longitude);
    //         // You can set a threshold distance and filter accordingly
    //         return distance < 5; // Filter benches within 5 kilometers
    //     });
    // };

    // const filteredBenches = filterBenchByDistance();

    return (
        <>
            {/* <h1 className="mt-3 mb-3">Bench Location Around You</h1> */}
            {/* <div className="fixed top-0 w-full bg-white z-10"> */}
       
    {/* </div> */}
            <div className="overflow-auto h-screen">
            <h1 className="mt-3 mb-3">Bench Location Around You</h1>
                {seatLocation?.map((bench: any) => (
                    <>
                        <article className="mb-3 rounded-lg shadow-white transition hover:shadow-lg">
                            <img
                                alt="Office"
                                src="https://gothamist.com/attachments/arts_jen/php4CTB4kAM.jpg"
                                className="h-56 w-full object-cover"
                            />

                            <div className="bg-white p-4 sm:p-6">
                                <p className="block text-xs text-gray-500">distance : {bench.distance} K</p>

                                <a href="#">
                                    <h3 className="mt-0.5 text-lg text-gray-900">{bench.latitude}</h3>
                                </a>

                            </div>
                        </article>
                    </>

                ))}
            </div>
        </>
    )
}

export default Benches