import React from 'react';

import { IonModal, IonButton, IonHeader, IonToolbar, IonTitle, 
  IonButtons, IonPage, IonContent, IonImg, IonItem, IonLabel, 
  IonSelect, IonSelectOption, IonList, IonIcon, IonFabButton, 
  IonRange, 
  IonTextarea} from '@ionic/react';

import { photoAPI } from "../hooks/photoAPI";

import './UploadModal.css';
import { add, happyOutline, sadOutline } from 'ionicons/icons';

interface ModalProps {
  showModal: boolean;
  setModal(state: boolean): void;
}

const UploadModal: React.FC<ModalProps> = (props) => {

  const submitPost = () => {
    console.log("Post Submitted!");
    props.setModal(false);
  }

  const didDismiss = () => {
    props.setModal(false);
  }

  return (
    <IonModal 
      cssClass="upload-modal"
      isOpen = {props.showModal}
      onDidDismiss={()=>{didDismiss()}}
    >
      <IonPage>
        <IonHeader>
          <IonToolbar color="dark">
            <IonTitle className="upload-title">
              Upload New Find
            </IonTitle>
            <IonButtons slot="start">
              <IonButton onClick={()=>{props.setModal(false)}}>Cancel</IonButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton onClick={()=>{submitPost()}}>Post</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
        <div className="img-holder">
          <IonImg src={"/assets/test_imgs/drawer1.jpg"}></IonImg>
          <IonFabButton className="photo-add">
            <IonIcon icon={add}/>
          </IonFabButton>
        </div>
        <IonList lines="none">
          <IonItem>
            <IonLabel position="floating">What did you find?</IonLabel>
            <IonSelect multiple={true}>
              <IonSelectOption value="couch">Couch</IonSelectOption>
              <IonSelectOption value="chair">Chair</IonSelectOption>
              <IonSelectOption value="table">Table</IonSelectOption>
              <IonSelectOption value="desk">Desk</IonSelectOption>
              <IonSelectOption value="dresser">Dresser</IonSelectOption>
              <IonSelectOption value="mirror">Mirror</IonSelectOption>
              <IonSelectOption value="plant">Plant</IonSelectOption>
              <IonSelectOption value="shelf">Shelf</IonSelectOption>
              <IonSelectOption value="lamp">Lamp</IonSelectOption>
              <IonSelectOption value="art">Art</IonSelectOption>
              <IonSelectOption value="">Other</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            {/** add color icons to select options? */}
            <IonLabel position="floating">What color is it?</IonLabel>
            <IonSelect multiple={true}>
              <IonSelectOption value="white">White</IonSelectOption>
              <IonSelectOption value="black">Black</IonSelectOption>
              <IonSelectOption value="gray">Gray</IonSelectOption>
              <IonSelectOption value="brown">Brown</IonSelectOption>
              <IonSelectOption value="beige">Beige</IonSelectOption>
              <IonSelectOption value="red">Red</IonSelectOption>
              <IonSelectOption value="orange">Orange</IonSelectOption>
              <IonSelectOption value="yellow">Yellow</IonSelectOption>
              <IonSelectOption value="green">Green</IonSelectOption>
              <IonSelectOption value="blue">Blue</IonSelectOption>
              <IonSelectOption value="purple">Purple</IonSelectOption>
              <IonSelectOption value="pink">Pink</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">What is it made of?</IonLabel>
            <IonSelect multiple={true}>
              <IonSelectOption value="wood">Wood</IonSelectOption>
              <IonSelectOption value="leather">Leather</IonSelectOption>
              <IonSelectOption value="cloth">Cloth</IonSelectOption>
              <IonSelectOption value="velvet">Velvet</IonSelectOption>
              <IonSelectOption value="glass">Glass</IonSelectOption>
              <IonSelectOption value="metal">Metal</IonSelectOption>
              <IonSelectOption value="plastic">Plastic</IonSelectOption>
              <IonSelectOption value="marble">Marble</IonSelectOption>
              <IonSelectOption value="na">N/A</IonSelectOption>
              <IonSelectOption value="other">Other</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">
              Quality
            </IonLabel>
            <IonRange 
              snaps={true} ticks={true} step={1}
              min={0} max={10}
              value={5}
            >
              <IonIcon slot="start" icon={sadOutline}/>
              <IonIcon slot = "end" icon={happyOutline}/>
            </IonRange>
          </IonItem>
          <IonItem>
            <IonLabel className="stacked-text" position="stacked">
              Additional Description
            </IonLabel>
            <IonTextarea placeholder="Optional Comments"></IonTextarea>
          </IonItem>
        </IonList>
        

        </IonContent>
        <IonButton onClick={() => {props.setModal(false)}}>Post it!</IonButton>
      </IonPage>
    </IonModal>
  );
};

export default UploadModal;