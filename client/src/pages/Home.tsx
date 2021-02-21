import React, { useState, useEffect } from 'react';

import {IonSplitPane, IonPage } from '@ionic/react';

import SideMenu from '../components/SideMenu';
import HomeHeader from '../components/HomeHeader';
import MyFab from '../components/MyFab';
import ListView from '../views/ListView';
import MapView from '../views/MapView';

import './Home.css';

interface myLocation {
  lat: number;
  lng: number;
}

const Home: React.FC = () => {
  const [isSplit, setSplit] = useState(window.innerWidth > 992);
  const [isOneCol, setOneCol] = useState(window.innerWidth <= 500);
  const [isListView, setListView] = useState(true);
  const [zoom, setZoom] = useState(14);
  const [location, setLocation] = useState<myLocation>(
    { lat: 40.760142, lng: -73.974469 }
  );

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const updateMedia = () => {
    setSplit(window.innerWidth > 992);
    setOneCol(isSplit ? 0.6*window.innerWidth <= 500 : window.innerWidth <= 500);
  };

  const toggleView = () => {
    return (isListView ? setListView(false) : setListView(true));
  }

  const updateLocation = (loc: myLocation) => {
    setLocation(loc);
  }

  const updateZoom = (zm: number) => {
    setZoom(zm);
  }

  return (
    <IonPage>
      <IonSplitPane contentId="main" className="main-split-pane" when="false">
        <SideMenu/>
        <IonPage id="main">
          <HomeHeader isSplit={isSplit}/>
            <MyFab 
              isSplit={isSplit} 
              isListView={isListView} 
              toggleView={toggleView} 
            />
            {isSplit ? (
              <div className="finds-view-container">
                <div className="list-view">
                  <ListView isOneCol={isOneCol}/>
                </div>
                <div className="map-view">
                  <MapView 
                    mapCenter={location}
                    updateLocation={updateLocation}
                    zoom={zoom}
                    updateZoom={updateZoom}
                  />
                </div>
              </div>
            ) : (
              <div className="finds-view-container">
                {isListView ? (
                  <ListView isOneCol={isOneCol}/>
                ) : (
                  <MapView
                    mapCenter={location} 
                    updateLocation={updateLocation}
                    zoom={zoom}
                    updateZoom={updateZoom}
                  />
                )}
              </div>
            )}
        </IonPage>
      </IonSplitPane>
    </IonPage>
  );
};

export default Home;
