import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;

export function locationAPI() {

  const currentPos = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    return coordinates;
  };

  return {
    currentPos
  };

};

function toRadians(deg: number):number {
  return deg * (Math.PI/180)
}

// Could optimize this
export function getDistLatLngKm(lat1: number, lng1: number, 
  lat2: number, lng2: number): number {
  
  var R = 6371; // Radius of the earth in km
  var dLat = toRadians(lat2-lat1);
  var dLon = toRadians(lng2-lng1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var dist = R * c; // Distance in km
  return dist;
}

// Could optimize this
export function getDistLatLngMi(lat1: number, lng1: number, 
  lat2: number, lng2: number): number {
  
  var R = 3958.8; // Radius of the earth in mi
  var dLat = toRadians(lat2-lat1);
  var dLon = toRadians(lng2-lng1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var dist = R * c; // Distance in mi
  return dist;
}
