import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonContent, IonRouterOutlet, IonTabBar, IonTabs } from '@ionic/react';

import { IonCard, IonCardHeader, IonCardContent, 
  IonCardTitle, IonCardSubtitle } from '@ionic/react';

import {IonSplitPane, IonMenu, IonHeader, IonToolbar,
  IonTitle, IonPage, IonMenuButton, IonButtons, IonButton, IonIcon} from '@ionic/react';

import { IonTabButton, IonLabel } from '@ionic/react';

import { person, camera, search } from 'ionicons/icons';
  
import { IonReactRouter } from '@ionic/react-router';

import FindsViewer from './FindsViewer';
import Profile from './Profile';
import NewFind from './NewFind';
import Welcome from './Welcome';

const Home: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/home/finds"><FindsViewer /></Route>
        <Route exact path="/home/new"><NewFind /></Route>
        <Route exact path="/home/profile"><Profile /></Route>
        <Route path="/home" render={() => <Redirect to="/home/finds" />} exact={true} />
      </IonRouterOutlet>

      <IonTabBar slot="bottom" color = "primary">
        <IonTabButton tab="finds" href="/home/finds">
          <IonIcon icon={search} />
          <IonLabel>Look Around</IonLabel>
        </IonTabButton>
        <IonTabButton tab="new" href="/home/new">
          <IonIcon icon={camera} />
          <IonLabel>New Find</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/home/profile">
          <IonIcon icon={person}/>
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Home;
