import React from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle,
    IonButton, IonButtons, IonIcon} from '@ionic/react';

import { navigateCircle } from 'ionicons/icons';

import FindContainer from '../components/FindContainer';
import './NewFind.css';

//STUB COMPONENT TODO
const NewFind: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <FindContainer />
      </IonContent>
    </IonPage>
  );
};

export default NewFind;
