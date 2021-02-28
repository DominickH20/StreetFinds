import React from 'react';
import { IonFab, IonFabButton, IonIcon, IonText } from '@ionic/react';
import { cameraOutline, mapOutline, listOutline } from 'ionicons/icons';
import './MyFab.css';

interface FabProps {
  isSplit: boolean;
  isListView: boolean;
  toggleView(): void;
  showModal: boolean;
  setModal(state: boolean): void;
}

const MyFab: React.FC<FabProps> = (props) => {

  return (
    <>
      {!props.isSplit && (
        <IonFab>
          <IonFabButton 
            className="middle-fab"
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
          disabled={props.showModal ? true : false}
          className="lower-fab"
          onClick={()=>{props.setModal(true)}}
        >
          <IonIcon icon={cameraOutline} />
        </IonFabButton>
      </IonFab>
    </>
  );
};

export default MyFab;