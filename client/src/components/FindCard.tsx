import React from 'react';
import { IonCard, IonCardContent, IonCardTitle, IonCardSubtitle,
  IonImg, IonIcon } from '@ionic/react';
import { timerOutline, star } from 'ionicons/icons';

import { getDistLatLngMi } from '../hooks/locationAPI';
import { StreetFind } from '../types/StreetFind';
import './FindCard.css';

interface ItemProps {
  streetfind: StreetFind;
  userLocation: { 
    lat: number; 
    lng: number;
  };
  showModal: boolean;
  setModal(state: boolean): void;
  updateModalItem(item: StreetFind): void;
}

const FindCard: React.FC<ItemProps> = (props) => {

  const cardTitle = (
    props.streetfind.category[0] + " - " +
    props.streetfind.color[0] + ", " +
    props.streetfind.material[0]
  );

  const distToUser = Math.round((
    getDistLatLngMi(
      props.userLocation.lat, props.userLocation.lng, 
      props.streetfind.lat, props.streetfind.lng
    ) + Number.EPSILON
  ) * 100) / 100;

  const cardAddress = (
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
    <IonCard 
      className="find-card" 
      button={true} 
      onClick={() => {
        props.setModal(true);
        props.updateModalItem(props.streetfind);
      }}
    >

      {(hoursSincePosting <= 2) && (
        <div className="new-find">
          <IonIcon icon={star}/>
          <span className="text">Just Up!</span>
        </div>
      )}
      
      <div className="img-holder">
        <IonImg src={props.streetfind.imageURL}></IonImg>
      </div>
      <IonCardContent>
        <div className="title-holder">
          <IonCardTitle>{cardTitle}</IonCardTitle>
          <IonCardTitle>
            <span className="text">
              {hoursSincePosting}
            </span>
            <IonIcon icon={timerOutline}/>
          </IonCardTitle>
        </div>
        <IonCardSubtitle>{cardAddress}</IonCardSubtitle>
      </IonCardContent>
    </IonCard>
  );
};

export default FindCard;
