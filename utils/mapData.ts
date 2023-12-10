export async function getMapData(){
    const response = await fetch('https://data.cityofnewyork.us/resource/esmy-s8q5.json');
    const data = await response.json();
    return data;
}