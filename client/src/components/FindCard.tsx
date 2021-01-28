import React from 'react';
import { IonCard, IonCardContent, IonCardTitle, IonCardSubtitle,
  IonImg, IonCardHeader, IonItem, IonButton, IonIcon} from '@ionic/react';

import './FindCard.css';

interface ContainerProps { }

const FindCard: React.FC<ContainerProps> = () => {
  return (
    <IonCard>
      <IonImg src="/assets/myImg.png"></IonImg>
      <IonCardContent>
        <IonCardHeader>
          <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
          <IonCardTitle>Card Title</IonCardTitle>
        </IonCardHeader>
        <p>Here’s a small text description for the card component. 
          Nothing more, nothing less.
        </p>
        <IonItem>
          <IonButton fill="solid">Action</IonButton>
          <IonIcon name="heart" slot="end"></IonIcon>
          <IonIcon name="share" slot="end"></IonIcon>
        </IonItem>
      </IonCardContent>
    </IonCard>
  );
};

export default FindCard;
