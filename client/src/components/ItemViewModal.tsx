import React from 'react';
import { IonModal, IonPage, IonFabButton, IonIcon, IonImg, 
  IonList, IonItem, IonContent, IonListHeader, IonLabel } from '@ionic/react';

import { arrowBackOutline, timerOutline, star } from 'ionicons/icons';

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
  isOneCol: boolean;
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

  const hoursSincePosting = Math.ceil(
    (new Date().getTime() - props.streetfind.timestamp)/1000/60/60
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
            <img src={props.streetfind.imageURL} key={props.streetfind.imageURL}/>
          </div>
          <IonList lines="none">
            <IonListHeader>
              <div className="title-holder">
                <div className="titles">
                  <h3>{itemTitle}</h3>
                  <h4>{itemSubtitle}</h4>
                </div>
                <div className="icons">
                  <div className="hours">
                    <span className="text">
                      {hoursSincePosting}
                    </span>
                    <IonIcon className="hour-timer" icon={timerOutline}/>
                  </div>
                  <div className="stars">
                    {[...Array(props.streetfind.quality)]
                      .map((value: undefined, index: number) => {
                        return <IonIcon className="star" icon={star} key={index}/>
                      })
                    }
                  </div>
                </div>
              </div>
              
            </IonListHeader>
            <IonItem>
              <div className="list-item">
                <div className="title-label1">Address:</div>
                <div className="label-content1">{itemAddress}</div>
              </div>
            </IonItem>
            <IonItem>
              <div className="list-item">
                <div className="title-label1">Material:</div>
                <div className="label-content1">{props.streetfind.material.join(", ")}</div>
              </div>
            </IonItem>
            <IonItem lines="full">
              {(props.streetfind.description === "" ? (
                <div className="list-item"/>
              ) : (
                <div className="list-item">
                  <div className={props.isOneCol ? "title-label2" : "title-label1"}>Description:</div>
                  <div className={props.isOneCol ? "label-content2" : "label-content1"}>{props.streetfind.description}</div>
                </div>
              ))}
            </IonItem>
            <IonItem>
              <div className="list-item donate-item">
                <div className="donate-text">
                  <span>The average {props.streetfind.category[0].toLowerCase()} costs $50... </span>
                  <span>Support the stoopers!</span>
                </div>
                <div className="donate-button">
                  <IonFabButton className="donate-fab">
                    $1
                  </IonFabButton>
                  <IonFabButton className="donate-fab">
                    $3
                  </IonFabButton>
                  <IonFabButton className="donate-fab">
                    $5
                  </IonFabButton>
                </div>
              </div>
            </IonItem>
          </IonList>
        </IonContent>
      </IonPage>
    </IonModal>
  );
}

export default ItemViewModal;