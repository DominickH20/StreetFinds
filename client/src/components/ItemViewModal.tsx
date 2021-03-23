import React from 'react';
import { IonModal, IonPage, IonToolbar, IonHeader, IonTitle,
  IonButtons, IonButton, IonFabButton, IonIcon } from '@ionic/react';

import { arrowBackOutline } from 'ionicons/icons';

import FindCard from './FindCard';

import { StreetFind } from '../types/StreetFind'
import './ItemViewModal.css';

interface ItemModalProps {
  streetfind: StreetFind;
  userLocation: { 
    lat: number; 
    lng: number;
  };
  showModal: boolean;
  setModal(state: boolean): void;
}

const ItemViewModal: React.FC<ItemModalProps> = (props) => {

  const didDismiss = () => {
    resetState();
  };

  const resetState = () => {
    props.setModal(false);
  }

  return (
    <IonModal 
      cssClass="item-view-modal"
      isOpen = {props.showModal}
      onDidDismiss={()=>{didDismiss()}}
    >
      <IonPage>
        <IonFabButton
          color="light"
          className="back-fab"
          onClick={()=>props.setModal(false)} 
        >
          <IonIcon 
            className="back-icon"
            icon={arrowBackOutline}
          />
        </IonFabButton>
        <FindCard 
          streetfind={props.streetfind} 
          userLocation={props.userLocation}
          showModal={props.showModal}
          setModal={props.setModal}
          updateModalItem={(item: StreetFind) => {}}
        />
      </IonPage>
    </IonModal>
  );
}

export default ItemViewModal;