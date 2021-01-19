import { IonContent, IonFooter, IonHeader, IonMenu, IonNote, IonTitle, IonToolbar,
  IonButtons, IonButton, IonIcon, IonItem, IonThumbnail, IonImg, IonMenuButton, IonMenuToggle } from '@ionic/react';

import { options, ellipsisVertical, cube } from 'ionicons/icons';

import React from 'react';
import './HomeHeader.css';

const HomeHeader: React.FC = () => {

  // const toggleMenu = () => {
  //   const splitPane = document.querySelector('ion-split-pane');
  //   const windowWidth = window.innerWidth;
  //   const splitPaneShownAt = 768;
  //   const when = `(min-width: ${splitPaneShownAt}px)`;
  //   if (windowWidth >= splitPaneShownAt) {
  //     // split pane view is visible
  //     const open = splitPane!.when === when;
  //     splitPane!.when = open ? false : when;
  //   } else {
  //     // split pane view is not visible
  //     const menu = splitPane!.querySelector<HTMLIonMenuElement>(
  //       "ion-menu.filter-menu"
  //     );
  //     // toggle menu open
  //     return menu!.toggle(true);
  //   } 
  // }

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
        <IonTitle className="app-title">
          <div className="hcs">
            StreetFinds
            <IonThumbnail className="thumbnail-size">
              <IonImg src={cube}/>
            </IonThumbnail>
          </div>
        </IonTitle>
        <IonButtons slot="end">
          <IonButton>
            <IonIcon icon={ellipsisVertical} slot="icon-only" />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default HomeHeader;
