import React from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle,
  IonButton, IonButtons, IonIcon, IonLabel, IonInput, IonItem,
  IonTabs} from '@ionic/react';

import { location } from 'ionicons/icons';

import FindCard from '../components/FindCard';
import './FindCard.css';

//STUB COMPONENT TODO
const FindsViewer: React.FC = () => {
  return (
    <IonPage>
      <IonHeader color ="primary">
        <IonToolbar color ="primary">
          <IonItem color ="primary">
            <IonButtons slot="start">
              <IonIcon className="location-bar"icon={location}/>
            </IonButtons>
            <IonLabel position="floating">Location</IonLabel>
            <IonInput></IonInput>
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <FindCard />
      </IonContent>
    </IonPage>
  );
};

export default FindsViewer;
