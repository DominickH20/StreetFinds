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