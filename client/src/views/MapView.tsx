import React, { useState } from 'react';
import { Loader } from "@googlemaps/js-api-loader";
import axios from 'axios';

import mapTheme from '../theme/mapTheme';
import { StreetFind } from '../types/StreetFind';
import './MapView.css';
import FindCardInfoWindow from '../components/FindCardInfoWindow';

declare global {
  interface Window { map: any; }
}

interface MapProps {
  mapCenter: { lat: number; lng:number; };
  zoom: number;
  updateLocation(loc: { lat: number; lng:number; }): void;
  updateZoom(zm: number): void;
  itemList: StreetFind[];
}

interface PopupProps {
  item: StreetFind;
}

const MapView: React.FC<MapProps> = (props) => {

  //pointer to current info window, links to marker pictures
  let clickedMarkerPtr: google.maps.Marker | null;
  const markerIconNormal = "/assets/icon/markerNormal.png";
  const markerIconHover = "/assets/icon/markerHover.png";

  const [popupProps, setPopupProps] = useState<PopupProps>({
    item: props.itemList[0]
  });

  const constructMap = () => {
    console.log("construct called");
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

    //define a popup class
    class Popup extends google.maps.OverlayView {
      position: google.maps.LatLng;
      containerDiv: HTMLDivElement;
  
      constructor(position: google.maps.LatLng, content: HTMLElement) {
        super();
        this.position = position;
    
        content.classList.add("popup-bubble");
        this.containerDiv = document.createElement("div");
        this.containerDiv.classList.add("popup-container");
        this.containerDiv.appendChild(content);

        Popup.preventMapHitsAndGesturesFrom(this.containerDiv);
      }

      setPosition(newPos: google.maps.LatLng) {
        this.position = newPos;
      }
  
      /** Called when the popup is added to the map. */
      onAdd() {
        //add popup
        this.getPanes()!.floatPane.appendChild(this.containerDiv);

        //get bounds of map
        const NE = this.getProjection().fromLatLngToDivPixel(
          window.map.getBounds().getNorthEast()
        );

        const SW = this.getProjection().fromLatLngToDivPixel(
          window.map.getBounds().getSouthWest()
        );

        const divPosition = this.getProjection().fromLatLngToDivPixel(
          this.position
        )!;

        //calculate whether popup is cut off at any point
        const cutOffTop = (divPosition["y"] - NE["y"]) < 200;
        const cutOffBottom = (SW["y"] - divPosition["y"]) < 100;
        const cutOffLeft = (divPosition["x"] - SW["x"]) < 100;
        const cutOffRight = (NE["x"] - divPosition["x"]) < 100;

        const popupBubble = document.getElementById("content")!;
        //adjust transform if cut off
        if (cutOffTop && cutOffLeft) {
          popupBubble.style.transform = "translate(-7%, 0%)";
        } else if (cutOffTop && cutOffRight) {
          popupBubble.style.transform = "translate(-95%, 0%)";
        } else if (cutOffBottom && cutOffRight) {
          popupBubble.style.transform = "translate(-95%, -115%)";
        } else if (cutOffBottom && cutOffLeft) {
          popupBubble.style.transform = "translate(-5%, -115%)";
        } else if (cutOffTop) {
          popupBubble.style.transform = "translate(-50%, 0%)";
        } else if (cutOffLeft) {
          popupBubble.style.transform = "translate(5%, -57%)";
        } else if (cutOffRight) {
          popupBubble.style.transform = "translate(-107%, -57%)";
        } else {
          popupBubble.style.transform = "translate(-50%, -115%)";
        }

      }
  
      /** Called when the popup is removed from the map. */
      onRemove() {
        if (this.containerDiv.parentElement) {
            this.containerDiv.parentElement.removeChild(this.containerDiv);
        }
      }
  
      /** Called each frame when the popup needs to draw itself. */
      draw() { 
        const divPosition = this.getProjection().fromLatLngToDivPixel(
          this.position
        )!;
  
        // Hide the popup when it is far out of view.
        const display =
            Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000
            ? "block"
            : "none";
    
        if (display === "block") {
            this.containerDiv.style.left = divPosition.x + "px";
            this.containerDiv.style.top = divPosition.y + "px";
        }
    
        if (this.containerDiv.style.display !== display) {
            this.containerDiv.style.display = display;
        }
      }
    }

    //point to the popup
    const popup = new Popup(
      new google.maps.LatLng(40.755178,-73.97759),
      document.getElementById("content") as HTMLElement
    );

    //add listener to map to close infowindows if click away
    window.map.addListener("click", () => {
      if (popup) { popup.setMap(null); }
      if (clickedMarkerPtr) {
        clickedMarkerPtr.setIcon(markerIconNormal);
        clickedMarkerPtr = null;
      }
    });

    //add items to map
    props.itemList.map((streetfind, index) => {
      //create marker
      const marker = new google.maps.Marker({
        position: {lat: streetfind.lat, lng: streetfind.lng},
        map: window.map,
        title: "Marker " + index,
        icon: markerIconNormal
      });

      //add listeners to change marker color when hover
      google.maps.event.addListener(marker, 'mouseover', () => {
        if(marker !== clickedMarkerPtr) {
          marker.setIcon(markerIconHover);
        }
      });
      google.maps.event.addListener(marker, 'mouseout', () => {
        if(marker !== clickedMarkerPtr) {
          marker.setIcon(markerIconNormal);
        }
      });     

      //show info window when clicked, hide prior window
      marker.addListener("click", () => {
        //clear old marker and popup
        if(clickedMarkerPtr) { clickedMarkerPtr.setIcon(markerIconNormal); }
        if (popup) { popup.setMap(null) }

        //add new marker and update popup state
        marker.setIcon(markerIconHover);
        setPopupProps({item: streetfind});
        popup.setPosition(new google.maps.LatLng(streetfind.lat, streetfind.lng));

        //make visible and set props for next update
        popup.setMap(window.map);
        clickedMarkerPtr = marker;
      });
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

  //function to operate on map after initial load
  const updateMap = () => {
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
    <>
      <div id="map"></div>
      <div id="content">
        <FindCardInfoWindow 
          streetfind={popupProps.item} 
          userLocation={props.mapCenter}
        />
      </div>
    </>
  );
}

export default MapView;