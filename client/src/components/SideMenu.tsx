import React from 'react';
import { IonContent, IonFooter, IonHeader, IonMenu, 
  IonTitle, IonToolbar, IonThumbnail, IonImg } from '@ionic/react';
import { cube } from 'ionicons/icons';

import TempContainer from './TempContainer';

import './SideMenu.css';

const SideMenu: React.FC = () => {
  return (
    <IonMenu className="filter-menu" contentId="main" side="start" type="overlay">
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <div className="hcs">
              StreetFinds
              <IonThumbnail className="thumbnail-size">
                <IonImg src={cube}/>
              </IonThumbnail>
            </div>
          </IonTitle>
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
