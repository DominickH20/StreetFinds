import React, { useState } from 'react';

import { IonModal, IonButton, IonHeader, IonToolbar, IonTitle, 
  IonButtons, IonPage, IonContent, IonImg, IonItem, IonLabel, 
  IonSelect, IonSelectOption, IonList, IonIcon, IonFabButton, 
  IonRange, IonTextarea} from '@ionic/react';

import { photoAPI } from "../hooks/photoAPI";
import { locationAPI } from "../hooks/locationAPI";

import './UploadModal.css';
import { add, happyOutline, sadOutline } from 'ionicons/icons';

interface ModalProps {
  showModal: boolean;
  setModal(state: boolean): void;
}

const UploadModal: React.FC<ModalProps> = (props) => {

  const { takePhoto } = photoAPI();
  const { currentPos } = locationAPI();
  const [ photoPath, setPhotoPath ] = useState("/assets/images/placeholder.png");

  const submitPost = () => {
    console.log("Post Submitted!");
    resetState();
  };

  const didDismiss = () => {
    resetState();
  };

  const handlePhoto = async () => {
    //fix later
    //const coords = await currentPos();
    const photo = await takePhoto();
    if (photo!==undefined && photo.webPath!==undefined){
      setPhotoPath(photo.webPath);
      //console.log(coords);
    } else {
      console.log("Photo or WebPath is Undefined");
    }
  };

  const resetState = () => {
    props.setModal(false);
    setPhotoPath("/assets/images/placeholder.png");
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
            <IonImg src={photoPath}></IonImg>
            <IonFabButton onClick={handlePhoto}>
              <IonIcon icon={add}/>
            </IonFabButton>
          </div>
          <IonList lines="full">
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


//useful reference
// import { useState, useEffect } from "react";
// import { useCamera } from "@ionic/react-hooks/camera";
// import { useFilesystem, base64FromPath } from "@ionic/react-hooks/filesystem";
// import { useStorage } from "@ionic/react-hooks/storage";
// import { isPlatform } from "@ionic/react";
// import { CameraResultType, CameraSource, CameraPhoto, 
//     Capacitor, FilesystemDirectory } from "@capacitor/core";
// import { baseball, remove } from "ionicons/icons";


// export interface Photo {
//     filepath: string;
//     webviewPath?: string;
// }

// const PHOTO_STORAGE = "photos";

// export function usePhotoGallery() {

//     const { deleteFile, getUri, readFile, writeFile } = useFilesystem();

//     const { get, set } = useStorage();

//     const savePicture = async (photo: CameraPhoto, 
//                             fileName: string): Promise<Photo> => {
//         let base64Data: string;

//         if(isPlatform("hybrid")){
//             const file = await readFile({
//                 path: photo.path!
//             });
//             base64Data = file.data;
//         } else {
//             base64Data = await base64FromPath(photo.webPath!);
//         }

//         const savedFile = await writeFile({
//             path: fileName,
//             data: base64Data,
//             directory: FilesystemDirectory.Data
//         });

//         if(isPlatform("hybrid")){
//             return {
//                 filepath: savedFile.uri,
//                 webviewPath: Capacitor.convertFileSrc(savedFile.uri)
//             };
//         } else {
//             //using webpath to display image because already loaded in memory
//             return {
//                 filepath: fileName,
//                 webviewPath: photo.webPath
//             };
//         }
//     };

//     const { getPhoto } = useCamera();
//     const [photos, setPhotos] = useState<Photo[]>([]);


//     useEffect(() => {
//         const loadSaved = async () => {
//             const photosString = await get(PHOTO_STORAGE);
//             const photos = (
//                 photosString ? JSON.parse(photosString) : []
//             ) as Photo[];
            
//             if(!isPlatform("hybrid")){
//                 for(let photo of photos) {
//                     const file = await readFile({
//                         path: photo.filepath,
//                         directory: FilesystemDirectory.Data
//                     });
//                     photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
//                 }
//             }
//             setPhotos(photos);
//         };
//         loadSaved();
//     }, [get, readFile]);


//     const takePhoto = async () => {
//         const cameraPhoto = await getPhoto({
//             resultType: CameraResultType.Uri,
//             source: CameraSource.Camera,
//             quality: 100
//         });

//         const fileName = new Date().getTime() + ".jpeg";
//         const savedFileImage = await savePicture(cameraPhoto, fileName);
//         const newPhotos = [savedFileImage, ...photos];
//         setPhotos(newPhotos);
//         set(PHOTO_STORAGE, JSON.stringify(newPhotos));
//     };

//     return { 
//         photos,
//         takePhoto 
//     };

// }