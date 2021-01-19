import React from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle,
  IonButton, IonButtons, IonIcon, IonLabel, IonInput, IonItem} from '@ionic/react';

import { cube } from 'ionicons/icons';


import './Welcome.css';

const Welcome: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="welcome-screen">
          <IonIcon className="welcome-logo"icon={cube}/>
          <br/>
          <IonLabel className="title"><strong>StreetFinds</strong></IonLabel>
          <br/>
          <IonButton className="start-button" href="/home/finds">Get Started</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};
  
export default Welcome;