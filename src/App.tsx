import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, IonContent, IonRouterOutlet, IonTabBar, IonTabs } from '@ionic/react';

import { IonCard, IonCardHeader, IonCardContent, 
  IonCardTitle, IonCardSubtitle } from '@ionic/react';

import {IonSplitPane, IonMenu, IonHeader, IonToolbar,
  IonTitle, IonPage, IonMenuButton, IonButtons, IonButton, IonIcon} from '@ionic/react';

import { IonTabButton, IonLabel } from '@ionic/react';

import { person, camera, search } from 'ionicons/icons';
  
import { IonReactRouter } from '@ionic/react-router';

import Welcome from './pages/Welcome';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/streetfinds.css';
import { OutliningSpanKind } from 'typescript';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <Switch> {/*MUST USE SWITCH HERE - WHY?*/}
        <Route exact path="/welcome"><Welcome /></Route>
        <Route path="/home"><Home /></Route> {/*CANNOT USE EXACT HERE - WHY?*/}
        <Redirect exact path="/" to="/welcome" />
      </Switch>
    </IonReactRouter>
  </IonApp>
);

export default App;
