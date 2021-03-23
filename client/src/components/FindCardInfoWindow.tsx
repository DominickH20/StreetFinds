import React from 'react';
import { IonCard, IonCardContent, IonCardTitle,
  IonImg, IonIcon } from '@ionic/react';
import { timerOutline, star } from 'ionicons/icons';

import { getDistLatLngMi } from '../hooks/locationAPI';
import { StreetFind } from '../types/StreetFind';
import './FindCardInfoWindow.css';

interface ItemProps {
  streetfind: StreetFind;
  userLocation: { 
    lat: number; 
    lng: number;
  };
}

const FindCardInfoWindow: React.FC<ItemProps> = (props) => {


  const distToUser = Math.round((
    getDistLatLngMi(
      props.userLocation.lat, props.userLocation.lng, 
      props.streetfind.lat, props.streetfind.lng
    ) + Number.EPSILON
  ) * 100) / 100;

  const cardTitle = (
    props.streetfind.category[0] + 
    " - " + " (" + distToUser + " mi)"
  );


  const hoursSincePosting = Math.ceil(
    (new Date().getTime() - props.streetfind.timestamp)/1000/60/60
  );

  return (
    <IonCard className="find-card-info-window">

      {(hoursSincePosting <= 2) && (
        <div className="new-find">
          <IonIcon icon={star}/>
          <span className="text">Just Up!</span>
        </div>
      )}
      
      <div className="img-holder">
        <IonImg 
          src={props.streetfind.imageURL}
          key={props.streetfind.imageURL}
        />
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
      </IonCardContent>
    </IonCard>
  );
};

export default FindCardInfoWindow;
