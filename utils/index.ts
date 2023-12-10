export async function fetchSeat(){


     //The fetch method in Javascript is used to request data from a server.
     const response = await fetch("https://data.cityofnewyork.us/resource/esmy-s8q5.json");
     // response.json()?
     const seat = await response.json();
     console.log(seat)

     return seat;
}