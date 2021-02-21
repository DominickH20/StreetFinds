import React, { useState } from 'react';

import { IonHeader, IonToolbar, IonButtons, 
  IonButton, IonIcon, IonThumbnail, IonImg, IonItem, 
  IonInput } from '@ionic/react';

import { options, ellipsisVertical, search, 
  personCircle } from 'ionicons/icons';

import MyPopover from './MyPopover';
import './HomeHeader.css';

interface HeaderProps {
  isSplit: boolean;
  isAuthed: boolean;
}

const HomeHeader: React.FC<HeaderProps> = (props) => {

  const [popoverState, setShowPopover] = useState({ 
    showPopover: false, event: undefined 
  });

  const setPopover = (state: {showPopover: boolean, event: any}) => {
    setShowPopover(state);
  }

  const toggleMenu = () => {
    const menu = document.querySelector<HTMLIonMenuElement>(
      "ion-menu.filter-menu"
    );
    return menu!.toggle(true); 
  }

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton onClick={() => toggleMenu()}>
            <IonIcon icon={options} slot="icon-only" />
          </IonButton>
        </IonButtons>

        <div className={props.isSplit ? "navbar" : "navbar-sm"}>
          {props.isSplit ? (
            <div className="title-logo">
              <div className="logo">
                <IonThumbnail className="thumbnail-size">
                  <IonImg 
                    src={process.env.PUBLIC_URL + "/assets/icon/streetfinds_logo.png"}
                  />
                </IonThumbnail>
              </div>
              <div className="title">StreetFinds</div> {/*Matterdi Bold */}
            </div>
          ) : (
            <div className="logo">
              <IonThumbnail className="thumbnail-size">
                <IonImg 
                  src={process.env.PUBLIC_URL + "/assets/icon/streetfinds_logo.png"}
                />
              </IonThumbnail>
            </div>
          )}
          <IonItem 
            className={
              props.isSplit ? "location-container-wide" : "location-container-small"
            }
            lines={props.isSplit ? "inset" : "none"}
          >
            <IonIcon icon={search} slot="start" size="small"/>
            <IonInput
              placeholder="Location">
            </IonInput>
          </IonItem>
        </div>

        {props.isSplit ? (
          <IonButtons slot="end">
            <IonButton fill="clear">How it Works</IonButton>
            <IonButton fill="clear">Settings</IonButton>
            <IonButton className="donate" fill="clear">Donate!</IonButton>
            <IonButton className="account">
              <IonIcon icon={personCircle} slot="icon-only" size="large"/> {/*change size of icon!*/ }
            </IonButton>
          </IonButtons>
        ) : (
          <>
            <IonButtons slot="end">
              <IonButton onClick={(e: any) => {
                  e.persist();
                  setPopover({ showPopover: true, event: e });
              }}>
                <IonIcon icon={ellipsisVertical} slot="icon-only" />
              </IonButton>
            </IonButtons>
            <MyPopover 
              popoverState={popoverState} 
              setPopover={setPopover}
              isAuthed={props.isAuthed}
            />
          </>
        )}
      </IonToolbar>
    </IonHeader>
  );
};

export default HomeHeader;
