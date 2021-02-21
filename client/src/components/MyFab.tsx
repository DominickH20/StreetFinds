import React from 'react';
import { IonFab, IonFabButton, IonFabList, IonIcon, IonText } from '@ionic/react';
import { chevronUpCircleOutline, camera, mapOutline, listOutline } from 'ionicons/icons';
import './MyFab.css';

interface fabProps {
  isSplit: boolean;
  isListView: boolean;
  toggleView(): void;
}

const MyFab: React.FC<fabProps> = (props) => {

  return (
    <>
      {!props.isSplit && (
        <IonFab>
          <IonFabButton 
            className="middle-fab"
            // color="dark"
            onClick={()=>props.toggleView()}
          >
            <IonIcon icon={props.isListView ? mapOutline : listOutline} />
            <IonText className="fab-text">
              {props.isListView ? "Map View" : "List View"}
            </IonText>
          </IonFabButton>
        </IonFab>
      )}

      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton 
          className="lower-fab"
          // color="dark"
          onClick={()=>{}}
        >
          <IonIcon icon={camera} />
        </IonFabButton>
      </IonFab>
    </>
  );
};

export default MyFab;