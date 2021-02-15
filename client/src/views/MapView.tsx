import React, { useEffect } from 'react';
import { Loader } from "@googlemaps/js-api-loader";
import axios from 'axios';
import mapTheme from '../theme/mapTheme';
import './MapView.css';

declare global {
  interface Window { map: any; }
}

interface MapProps {
  mapCenter: { lat: number; lng:number; };
  zoom: number;
  updateLocation(loc: { lat: number; lng:number; }): void;
  updateZoom(zm: number): void;
}

const MapView: React.FC<MapProps> = (props) => {

  //this is a hack to rerender only when component maps
  //consider memoizing map component
  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.version) {
      rerenderMap();
    }
  }, []);

  const constructMap = () => {
    window.map = new google.maps.Map(document.getElementById("map")!, 
      { //map options
        center: props.mapCenter,
        zoom: props.zoom,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_TOP
        },
        streetViewControlOptions: {
          position: google.maps.ControlPosition.LEFT_BOTTOM
        },
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true
      }
    );

    window.map.mapTypes.set(
      "styled_map", 
      new google.maps.StyledMapType(mapTheme as any, {name: "Styled Map"})
    );
    window.map.setMapTypeId("styled_map");

    //map holds center internally, but other 
    //componenents need to know about changes
    window.map.addListener("dragend", () => {
      let ctr = window.map.getCenter();
      props.updateLocation({
        lat: ctr.lat(),
        lng: ctr.lng()
      });
    });

    //also update when center or zoom changes
    window.map.addListener("zoom_changed", () => {
      let ctr = window.map.getCenter();
      props.updateLocation({
        lat: ctr.lat(),
        lng: ctr.lng()
      });
      props.updateZoom(window.map.getZoom());
    });
  }

  //function to prepare map, called after key retrieved
  const initMap = (key:string) => {
    const loader = new Loader({
      apiKey: key,
      version: "weekly",
    }); 

    loader.load().then(() => {
      constructMap();
    });
  }

  const rerenderMap = () => {
    constructMap();
  }

  //function to operate on map after initial load
  const updateMap = () => {
    new google.maps.Marker({
      position: props.mapCenter,
      map: window.map,
      title: "My Marker"
    });
    console.log("update called");
  }

  //check if map is already loaded
  if (window.google && window.google.maps && window.google.maps.version) {
    updateMap();//if so, don't reload
  } else {
    axios.get('/maps/key') //retrieve key and build map
    .then((res) => {
      console.log("reloaded");
      initMap(res.data);
    })
    .catch((err) => {console.log(err);});
  }

  //return placeholder component
  return (
    <div id="map"></div>
  );
}

export default MapView;