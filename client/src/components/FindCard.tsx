import React from 'react';
import { IonCard, IonCardContent, IonCardTitle, IonCardSubtitle,
  IonImg, IonIcon } from '@ionic/react';
import { timerOutline, star } from 'ionicons/icons';

import './FindCard.css';

interface ContainerProps { }

const FindCard: React.FC<ContainerProps> = () => {

  //randomize img for testing
  const choice = Math.floor(Math.random() * 4) + 1;
  let path:string = "";
  let desc:string = ""
  switch(choice) {
    case 1:
      path = "/assets/test_imgs/chairs1.jpg";
      desc = "Chairs and Bar Stools";
      break;
    case 2:
      path = "/assets/test_imgs/couch1.jpg";
      desc = "Couch - Blue";
      break;
    case 3:
      path = "/assets/test_imgs/couch2b.png";
      desc = "Couch - Green"
      break;
    case 4:
      path = "/assets/test_imgs/drawer1.jpg";
      desc = "Drawer - Brown and White";
      break;
  }

  let isNew = Math.random() > 0.25 ? true : false;

  return (
    <IonCard className="find-card">

      {isNew && (
        <div className="new-find">
          <IonIcon icon={star}/>
          <span className="text">Just Up!</span>
        </div>
      )}
      
      <div className="img-holder">
        <IonImg src={path}></IonImg>
      </div>
      <IonCardContent>
        <div className="title-holder">
          <IonCardTitle>{desc}</IonCardTitle>
          <IonCardTitle>
            <span className="text">{Math.floor(Math.random() * 4) + 1}</span>
            <IonIcon icon={timerOutline}/>
          </IonCardTitle>
        </div>
        <IonCardSubtitle>4th Ave and 84th Street</IonCardSubtitle>
      </IonCardContent>
    </IonCard>
  );
};

export default FindCard;
