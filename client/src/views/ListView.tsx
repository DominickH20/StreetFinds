import React from 'react';
import { IonGrid, IonRow, IonCol, IonContent } from '@ionic/react';

import FindCard from '../components/FindCard';
import './ListView.css';

interface ListProps {
  isOneCol: boolean;
}

const ListView: React.FC<ListProps> = (props) => {
  return (
    <IonContent>
    <IonGrid>
      <IonRow>
        <IonCol sizeXs={props.isOneCol ? "12" : "6"}>
          <FindCard/>
        </IonCol>
        <IonCol sizeXs={props.isOneCol ? "12" : "6"}>
          <FindCard/>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol sizeXs={props.isOneCol ? "12" : "6"}>
          <FindCard/>
        </IonCol>
        <IonCol sizeXs={props.isOneCol ? "12" : "6"}>
          <FindCard/>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol sizeXs={props.isOneCol ? "12" : "6"}>
          <FindCard/>
        </IonCol>
        <IonCol sizeXs={props.isOneCol ? "12" : "6"}>
          <FindCard/>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol sizeXs={props.isOneCol ? "12" : "6"}>
          <FindCard/>
        </IonCol>
        <IonCol sizeXs={props.isOneCol ? "12" : "6"}>
          <FindCard/>
        </IonCol>
      </IonRow>
    </IonGrid>
    </IonContent>
  );
};

export default ListView;
