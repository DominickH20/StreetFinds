import React, { useState } from 'react';
import { IonFab, IonFabButton, IonFabList, IonIcon } from '@ionic/react';
import { chevronUpCircleOutline, camera, mapOutline, listOutline } from 'ionicons/icons';
import './MyFab.css';

interface fabProps {
  isDesktop: boolean;
  isListView: boolean;
  toggleView(): void;
}

const MyFab: React.FC<fabProps> = (props) => {

  return (
    <IonFab vertical="bottom" horizontal="end" slot="fixed">
      <IonFabButton>
        <IonIcon icon={chevronUpCircleOutline} />
      </IonFabButton>
      <IonFabList side="top">
        <IonFabButton><IonIcon icon={camera} /></IonFabButton>
        {!props.isDesktop && (
          <IonFabButton onClick={()=>props.toggleView()}>
            {(props.isListView) ? (
              <IonIcon icon={mapOutline} />
            ) : (
              <IonIcon icon={listOutline} />
            )}
          </IonFabButton>              
        )}

      </IonFabList>
    </IonFab>
  );
};

export default MyFab;
