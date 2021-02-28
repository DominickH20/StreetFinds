import React, { useState, useEffect } from 'react';

import {IonSplitPane, IonPage } from '@ionic/react';

import SideMenu from '../components/SideMenu';
import HomeHeader from '../components/HomeHeader';
import MyFab from '../components/MyFab';
import UploadModal from '../components/UploadModal';
import ListView from '../views/ListView';
import MapView from '../views/MapView';

import './Home.css';

interface myLocation {
  lat: number;
  lng: number;
}

const Home: React.FC = () => {
  //app states
  const [isAuthed, setAuthed] = useState(false);

  //view states
  const [isSplit, setSplit] = useState(window.innerWidth > 992);
  const [isOneCol, setOneCol] = useState(window.innerWidth <= 500);
  const [isListView, setListView] = useState(true);
  const [showModal, setShowModal] = useState(false);

  //map states
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

  const setModal = (state: boolean) => {
    setShowModal(state);
  }

  return (
    <IonPage>
      <IonSplitPane contentId="main" className="main-split-pane" when="false">
        <SideMenu/>
        <IonPage id="main">
          <HomeHeader isSplit={isSplit} isAuthed={isAuthed}/>

            <MyFab 
              isSplit={isSplit} 
              isListView={isListView} 
              toggleView={toggleView}
              showModal={showModal}
              setModal={setModal}
            />
            <UploadModal 
              showModal={showModal}
              setModal={setModal}
            />

            <div className="finds-view-container">
              <div className="list-view"
                style={isSplit ? {width: "60%"} : 
                  (isListView ? {width: "100%"} : {display: "none"})
                }
              >
                <ListView isOneCol={isOneCol}/>
              </div>
              <div className="map-view"
                style={isSplit ? {width: "40%"} : 
                  (isListView ? {display: "none"} : {width: "100%"})
                }
              >
                <MapView 
                  mapCenter={location}
                  updateLocation={updateLocation}
                  zoom={zoom}
                  updateZoom={updateZoom}
                />
              </div>
            </div>
        </IonPage>
      </IonSplitPane>
    </IonPage>
  );
};

export default Home;
