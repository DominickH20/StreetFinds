import React from 'react';

import { IonHeader, IonToolbar, IonButtons, 
  IonButton, IonIcon, IonThumbnail, IonImg, IonItem, 
  IonInput } from '@ionic/react';

import { options, ellipsisVertical, search, 
  personCircle } from 'ionicons/icons';

import './HomeHeader.css';

interface HeaderProps {
  isSplit: boolean;
}

const HomeHeader: React.FC<HeaderProps> = (props) => {

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
          {props.isSplit && (
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
          )}
          <IonItem className={
            props.isSplit ? "location-container-wide" : "location-container-small"
          }>
            <IonIcon icon={search} slot="start" />
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
              <IonIcon icon={personCircle} slot="icon-only" /> {/*change size of icon!*/ }
            </IonButton>
          </IonButtons>
        ) : (
          <IonButtons slot="end">
            <IonButton>
              <IonIcon icon={ellipsisVertical} slot="icon-only" />
            </IonButton>
          </IonButtons>
        )}
      </IonToolbar>
    </IonHeader>
  );
};

export default HomeHeader;
