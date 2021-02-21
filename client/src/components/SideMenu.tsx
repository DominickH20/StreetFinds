import React from 'react';
import { IonContent, IonFooter, IonHeader, IonMenu, 
  IonToolbar, IonThumbnail, IonImg, IonList, IonListHeader, IonCheckbox, IonItem, IonLabel, IonRange, IonSelect, IonSelectOption } from '@ionic/react';

import TempContainer from './TempContainer';

import './SideMenu.css';

const SideMenu: React.FC = () => {
  return (
    <IonMenu className="filter-menu" contentId="main" side="start" type="overlay">
      <IonHeader>
        <IonToolbar>
          <div className="title-logo">
            <div className="logo">
              <IonThumbnail className="thumbnail-size">
                <IonImg 
                  src={process.env.PUBLIC_URL + "/assets/icon/streetfinds_logo.png"}
                />
              </IonThumbnail>
            </div>
            <div className="title">StreetFinds</div> {/*Matterdi Bold */}
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* This is a placeholder list */}
        <IonList lines="none">
          <IonListHeader>
            <h3 style={{fontWeight: "bold"}}>Filters</h3>
          </IonListHeader>
          <IonItem>
            <IonLabel position="floating">Select</IonLabel>
            <IonSelect>
              <IonSelectOption value="">No Game Console</IonSelectOption>
              <IonSelectOption value="nes">NES</IonSelectOption>
              <IonSelectOption value="n64">Nintendo64</IonSelectOption>
              <IonSelectOption value="ps">PlayStation</IonSelectOption>
              <IonSelectOption value="genesis">Sega Genesis</IonSelectOption>
              <IonSelectOption value="saturn">Sega Saturn</IonSelectOption>
              <IonSelectOption value="snes">SNES</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>Checkbox</IonLabel>
            <IonCheckbox slot="start" />
          </IonItem>
          <IonItem>
            <IonLabel>Checkbox</IonLabel>
            <IonCheckbox slot="start" />
          </IonItem>
          <IonItem>
            <IonLabel>Checkbox</IonLabel>
            <IonCheckbox slot="start" />
          </IonItem>
          <IonItem>
            <IonLabel>Range</IonLabel>
            <IonRange></IonRange>
          </IonItem>
          <IonItem>
            <IonLabel>Range</IonLabel>
            <IonRange></IonRange>
          </IonItem>
          <IonItem>
            <IonLabel>Range</IonLabel>
            <IonRange></IonRange>
          </IonItem>
        </IonList>
      </IonContent>
      <IonFooter/>
    </IonMenu>
  );
};

export default SideMenu;
