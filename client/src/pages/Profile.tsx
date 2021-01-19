import React from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle} from '@ionic/react';
import FindContainer from '../components/FindContainer';
import './Profile.css';

//STUB COMPONENT TODO
const Profile: React.FC = () => {
  return (
  <IonPage>
    <IonHeader>
      <IonToolbar color="primary">
      <IonTitle size="large">Profile</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>

    <FindContainer />
    </IonContent>
  </IonPage>
  );
};

export default Profile;
