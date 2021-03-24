import React from 'react';
import { IonModal, IonPage, IonFabButton, IonIcon, IonImg, 
  IonList, IonItem, IonContent, IonListHeader, IonLabel } from '@ionic/react';

import { arrowBackOutline } from 'ionicons/icons';

import { getDistLatLngMi } from '../hooks/locationAPI';
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

  const itemTitle = (
    props.streetfind.category[0] + 
    (props.streetfind.category.length > 1 ? ", "+props.streetfind.category[1] : "") +
    (props.streetfind.category.length > 2 ? ", ..." : "")
  );

  const itemSubtitle = (
    props.streetfind.color[0] + 
    (props.streetfind.color.length > 1 ? ", "+props.streetfind.color[1] : "") +
    (props.streetfind.color.length > 2 ? ", ..." : "")
  );

  const distToUser = Math.round((
    getDistLatLngMi(
      props.userLocation.lat, props.userLocation.lng, 
      props.streetfind.lat, props.streetfind.lng
    ) + Number.EPSILON
  ) * 100) / 100;

  const itemAddress = (
    props.streetfind.address.houseNumber + " " + 
    props.streetfind.address.streetName + ", " +
    props.streetfind.address.city + " " +
    props.streetfind.address.state + " (" +
    distToUser + " mi)"
  );

  return (
    <IonModal 
      cssClass="item-view-modal"
      isOpen = {props.showModal}
      onDidDismiss={()=>{didDismiss()}}
    >
      <IonPage>
        <IonContent>
          <IonFabButton className="back-fab" onClick={()=>props.setModal(false)}>
            <IonIcon className="back-icon" icon={arrowBackOutline}/>
          </IonFabButton>
          <div className="img-holder">
            <IonImg src={props.streetfind.imageURL}/>
          </div>
          <IonList lines="none">
            <IonListHeader>
              <div className="title-holder">
                <div className="titles">
                  <h3>{itemTitle}</h3>
                  <h4>{itemSubtitle}</h4>
                </div>
                <div className="icons">
                  <div>TIMER</div>
                  <div>Quality</div>
                </div>
              </div>
              
            </IonListHeader>
            <IonItem>
              <div className="list-item">
                <div className="title-label">Address:</div>
                <div className="label-content">{itemAddress}</div>
              </div>
            </IonItem>
            <IonItem>
              <div className="list-item">
                <div className="title-label">Material:</div>
                <div className="label-content">{props.streetfind.material}</div>
              </div>
            </IonItem>
            <IonItem>
              {(props.streetfind.description === "" ? (
                <div className="list-item"/>
              ) : (
                <div className="list-item">
                  <div className="title-label">Description:</div>
                  <div className="label-content">info here</div>
                </div>
              ))}
            </IonItem>
            <IonItem>Donation</IonItem>
          </IonList>
        </IonContent>
      </IonPage>
    </IonModal>
  );
}

export default ItemViewModal;