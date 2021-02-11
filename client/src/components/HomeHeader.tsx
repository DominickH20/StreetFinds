import { IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, 
  IonIcon, IonThumbnail, IonImg } from '@ionic/react';

import { options, ellipsisVertical, cube } from 'ionicons/icons';

import React from 'react';
import './HomeHeader.css';

const HomeHeader: React.FC = () => {

  const toggleMenu = () => {
    const menu = document.querySelector<HTMLIonMenuElement>(
      "ion-menu.filter-menu"
    );
    return menu!.toggle(true); 
  }

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton onClick={() => toggleMenu()}>
            <IonIcon icon={options} slot="icon-only" />
          </IonButton>
        </IonButtons>
        <IonTitle className="app-title">
          <div className="hcs">
            StreetFinds
            <IonThumbnail className="thumbnail-size">
              <IonImg src={cube}/>
            </IonThumbnail>
          </div>
        </IonTitle>
        <IonButtons slot="end">
          <IonButton>
            <IonIcon icon={ellipsisVertical} slot="icon-only" />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default HomeHeader;
