import React, { useState, useEffect } from 'react';
import { IonContent } from '@ionic/react';

import {IonSplitPane, IonPage } from '@ionic/react';

import SideMenu from '../components/SideMenu';
import HomeHeader from '../components/HomeHeader';
import MyFab from '../components/MyFab';
import ListView from '../views/ListView';
import MapView from '../views/MapView';

import './Home.css';


const Home: React.FC = () => {
  const [isSplit, setSplit] = useState(window.innerWidth > 992);
  const [isOneCol, setOneCol] = useState(window.innerWidth <= 500);
  const [isListView, setListView] = useState(true);

  const updateMedia = () => {
    setSplit(window.innerWidth > 992);
    setOneCol(isSplit ? 0.6*window.innerWidth <= 500 : window.innerWidth <= 500);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const toggleView = () => {
    return (isListView ? setListView(false) : setListView(true));
  }

  return (
    <IonPage>
      <IonSplitPane contentId="main" className="main-split-pane" when="false">
        <SideMenu/>
        <IonPage id="main">
          <HomeHeader/>
          <IonContent>
            <MyFab isSplit={isSplit} isListView={isListView} toggleView={toggleView} />
              {isSplit ? (
                <div className="finds-view-container">
                  <div className="list-view">
                    <ListView isOneCol={isOneCol}/>
                  </div>
                  <div className="map-view">
                    <MapView />
                  </div>
                </div>
              ) : (
                <div className="finds-view-container">
                  {isListView ? (
                    <ListView isOneCol={isOneCol}/>
                  ) : (
                    <MapView />
                  )}
                </div>
              )}
          </IonContent>
        </IonPage>
      </IonSplitPane>
    </IonPage>
  );
};

export default Home;
