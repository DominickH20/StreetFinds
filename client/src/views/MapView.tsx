import React from 'react';
import { Loader } from "@googlemaps/js-api-loader";
import axios from 'axios'
import mapTheme from '../theme/mapTheme'
import './MapView.css';

interface MapProps { }

const MapView: React.FC<MapProps> = (props) => {

  //function to prepare map, called after key retrieved
  const initMap = (key:string) => {
    
    let map: google.maps.Map;
    const loader = new Loader({
      apiKey: key,
      version: "weekly",
    }); 

    loader.load().then(() => {
      map = new google.maps.Map(document.getElementById("map")!, 
        { //map options
          center: { lat: 40.760142, lng: -73.974469 },
          zoom: 14,
          zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM
          },
          streetViewControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM
          }
        }
      );
  
      map.mapTypes.set(
        "styled_map", 
        new google.maps.StyledMapType(mapTheme as any, {name: "Styled Map"})
      );
      map.setMapTypeId("styled_map");
  
      map.addListener("dragend", () => {
        console.log(map.getCenter().toString());
      });
    });

  }

  //retrieve key and build map
  axios.get('/maps/key')
  .then((res) => {
    initMap(res.data);
  })
  .catch((err) => {console.log(err);});

  //return placeholder component
  return (
    <div id="map"></div>
  );
}

export default MapView;