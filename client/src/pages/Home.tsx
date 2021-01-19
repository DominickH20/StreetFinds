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

import FindsViewer from './FindsViewer';
import Profile from './Profile';
import NewFind from './NewFind';
import Welcome from './Welcome';
import SideMenu from '../components/SideMenu';
import HomeHeader from '../components/HomeHeader';
import FindContainer from '../components/FindContainer';
import TempContainer from '../components/TempContainer';
import MyFab from '../components/MyFab';

import './Home.css';
import { getLeadingCommentRanges } from 'typescript';

const Home: React.FC = () => {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 768);
  const [isListView, setListView] = useState(true);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 768);
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
            <MyFab isDesktop={isDesktop} isListView={isListView} toggleView={toggleView} />
              {isDesktop ? (
                <div className="finds-view-container">
                  <div className="list-view">
                    <TempContainer text="This is the list view"/>
                  </div>
                  <div className="map-view">
                    <TempContainer text="This is the map view"/>
                  </div>
                </div>
              ) : (
                <div className="finds-view-container">
                  {isListView ? (
                    <TempContainer text="This is the list view"/>
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

//OLD MENU LAYOUT
{/* <IonPage>
<HomeHeader/>
<IonContent>
  <IonFab vertical="bottom" horizontal="end" slot="fixed">
    <IonFabButton>
      <IonIcon icon={chevronUpCircleOutline} />
    </IonFabButton>
    <IonFabList side="top">
      <IonFabButton><IonIcon icon={camera} /></IonFabButton>
      {!isDesktop && (
        <IonFabButton onClick={()=>toggleView()}>
          {(view==="list") ? (
            <IonIcon icon={mapOutline} />
          ) : (
            <IonIcon icon={listOutline} />
          )}
        </IonFabButton>              
      )}

    </IonFabList>
  </IonFab>
  <IonSplitPane contentId="main" className="main-split-pane">
    <SideMenu/>
    <IonPage id="main">
      {isDesktop ? (
        <div className="finds-view-container">
          <div className="list-view">
            <TempContainer text="This is the list view"/>
          </div>
          <div className="map-view">
            <TempContainer text="This is the map view"/>
          </div>
        </div>
      ) : (
        <div className="finds-view-container">
          {view==="list" ? (
            <TempContainer text="This is the list view"/>
          ) : (
            <TempContainer text="This is the map view"/>
          )}
        </div>
      )}
    </IonPage>
  </IonSplitPane>
</IonContent>
</IonPage> */}