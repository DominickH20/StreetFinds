import React from 'react';
import { IonContent, IonFooter, IonHeader, IonMenu, 
  IonToolbar, IonThumbnail, IonImg, IonList, IonListHeader, 
  IonItem, IonLabel, IonRange, IonSelect, IonSelectOption, 
  IonIcon, 
  IonText,
  IonItemDivider} from '@ionic/react';

import { happyOutline, sadOutline } from 'ionicons/icons'; 

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
            <div className="title">StreetFinds</div>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonList lines="full">
        <IonListHeader>
          <h3 style={{fontWeight: "bold"}}>Filters</h3>
        </IonListHeader>
        <IonItem>
          <IonLabel position="stacked">
            Distance
          </IonLabel>
          <IonRange 
            snaps={true} ticks={true} step={5}
            min={0} max={30}
            value={10} pin={true}
          >
            <IonText slot="start">0 mi</IonText>
            <IonText slot="end">30 mi</IonText>
          </IonRange>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Item</IonLabel>
          <IonSelect multiple={true}>
            <IonSelectOption value="couch">Couch</IonSelectOption>
            <IonSelectOption value="chair">Chair</IonSelectOption>
            <IonSelectOption value="table">Table</IonSelectOption>
            <IonSelectOption value="desk">Desk</IonSelectOption>
            <IonSelectOption value="dresser">Dresser</IonSelectOption>
            <IonSelectOption value="mirror">Mirror</IonSelectOption>
            <IonSelectOption value="plant">Plant</IonSelectOption>
            <IonSelectOption value="shelf">Shelf</IonSelectOption>
            <IonSelectOption value="lamp">Lamp</IonSelectOption>
            <IonSelectOption value="art">Art</IonSelectOption>
            <IonSelectOption value="">Other</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          {/** add color icons to select options? */}
          <IonLabel position="floating">Color</IonLabel>
          <IonSelect multiple={true}>
            <IonSelectOption value="white">White</IonSelectOption>
            <IonSelectOption value="black">Black</IonSelectOption>
            <IonSelectOption value="gray">Gray</IonSelectOption>
            <IonSelectOption value="brown">Brown</IonSelectOption>
            <IonSelectOption value="beige">Beige</IonSelectOption>
            <IonSelectOption value="red">Red</IonSelectOption>
            <IonSelectOption value="orange">Orange</IonSelectOption>
            <IonSelectOption value="yellow">Yellow</IonSelectOption>
            <IonSelectOption value="green">Green</IonSelectOption>
            <IonSelectOption value="blue">Blue</IonSelectOption>
            <IonSelectOption value="purple">Purple</IonSelectOption>
            <IonSelectOption value="pink">Pink</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Material</IonLabel>
          <IonSelect multiple={true}>
            <IonSelectOption value="wood">Wood</IonSelectOption>
            <IonSelectOption value="leather">Leather</IonSelectOption>
            <IonSelectOption value="cloth">Cloth</IonSelectOption>
            <IonSelectOption value="velvet">Velvet</IonSelectOption>
            <IonSelectOption value="glass">Glass</IonSelectOption>
            <IonSelectOption value="metal">Metal</IonSelectOption>
            <IonSelectOption value="plastic">Plastic</IonSelectOption>
            <IonSelectOption value="marble">Marble</IonSelectOption>
            <IonSelectOption value="na">N/A</IonSelectOption>
            <IonSelectOption value="other">Other</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">
            Quality
          </IonLabel>
          <IonRange 
            snaps={true} ticks={true} step={1}
            min={0} max={10}
            value={5}
          >
            <IonIcon slot="start" icon={sadOutline}/>
            <IonIcon slot = "end" icon={happyOutline}/>
          </IonRange>
        </IonItem>
        </IonList>
      </IonContent>
      <IonFooter/>
    </IonMenu>
  );
};

export default SideMenu;
