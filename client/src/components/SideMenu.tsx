import React from 'react';
import { IonContent, IonFooter, IonHeader, IonMenu, 
  IonToolbar, IonThumbnail, IonImg } from '@ionic/react';
import { cube } from 'ionicons/icons';

import TempContainer from './TempContainer';

import './SideMenu.css';

const SideMenu: React.FC = () => {
  return (
    <IonMenu className="filter-menu" contentId="main" side="start" type="overlay">
      <IonHeader>
        <IonToolbar>
        <div className="title-logo">
            StreetFinds
            <IonThumbnail className="thumbnail-size">
              <IonImg src={cube}/>
            </IonThumbnail>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <TempContainer text="Filters Go Here"/>
      </IonContent>
      <IonFooter/>
    </IonMenu>
  );
};

export default SideMenu;
