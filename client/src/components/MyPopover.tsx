import React from 'react';
import { IonItem, IonList, IonListHeader, IonPopover, IonLabel } from '@ionic/react';
import './MyPopover.css';
import { closeCircle } from 'ionicons/icons';

interface PopoverProps {
  isAuthed: boolean;
  popoverState: {showPopover: boolean, event: any};
  setPopover(state: {showPopover: boolean, event: any}): void;
}

const MyPopover:React.FC<PopoverProps> = (props) => {

  const lineStyle = "none"

  return (
    <IonPopover
      event={props.popoverState.event}
      isOpen={props.popoverState.showPopover}
      onDidDismiss={() => props.setPopover({ showPopover: false, event: undefined })}
    >
      <IonList>
        <IonListHeader>
          <h3 style={{fontWeight: "bold"}}>Options</h3>
        </IonListHeader>
          {props.isAuthed ? (
            <IonItem lines={lineStyle} href="/">
              <IonLabel>Profile</IonLabel>
            </IonItem>
          ) : (
            <IonItem lines={lineStyle} href="/">
              <IonLabel>Log In / Sign Up</IonLabel>
            </IonItem>
          )}
        <IonItem lines={lineStyle} href="/">
          <IonLabel>How It Works</IonLabel>
        </IonItem>
        <IonItem lines={lineStyle} href="/">
          <IonLabel>Settings</IonLabel>
        </IonItem>
        <IonItem lines={lineStyle} href="/">
          <IonLabel id="donate-pop-label">Donate!</IonLabel>
        </IonItem>
      </IonList>
    </IonPopover>
  );
}

export default MyPopover;