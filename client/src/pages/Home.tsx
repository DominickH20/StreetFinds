import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonContent, IonFab, IonFabButton, IonRouterOutlet, 
  IonTabBar, IonTabs, IonFabList } from '@ionic/react';

import { IonCard, IonCardHeader, IonCardContent, 
  IonCardTitle, IonCardSubtitle } from '@ionic/react';

import {IonSplitPane, IonMenu, IonHeader, IonToolbar,
  IonTitle, IonPage, IonMenuButton, IonButtons, IonButton, IonIcon} from '@ionic/react';

import { IonTabButton, IonLabel } from '@ionic/react';

import { person, camera, search, options, settings, 
  chevronUpCircleOutline, listOutline, mapOutline } from 'ionicons/icons';
  
import { IonReactRouter } from '@ionic/react-router';

import Welcome from './Welcome';
import SideMenu from '../components/SideMenu';
import HomeHeader from '../components/HomeHeader';
import TempContainer from '../components/TempContainer';
import MyFab from '../components/MyFab';
import ListView from '../views/ListView';

import './Home.css';
import { getLeadingCommentRanges } from 'typescript';


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
                    <TempContainer text="This is the map view"/>
                  </div>
                </div>
              ) : (
                <div className="finds-view-container">
                  {isListView ? (
                    <ListView isOneCol={isOneCol}/>
                  ) : (
                    <TempContainer text="This is the map view"/>
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
