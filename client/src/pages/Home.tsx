import React, { useState, useEffect } from 'react';

import {IonSplitPane, IonPage, IonContent } from '@ionic/react';

import { StreetFind } from '../types/StreetFind';

import SideMenu from '../components/SideMenu';
import HomeHeader from '../components/HomeHeader';
import MyFab from '../components/MyFab';
import UploadModal from '../components/UploadModal';
import ItemViewModal from '../components/ItemViewModal';
import ListView from '../views/ListView';
import MapView from '../views/MapView';

import './Home.css';

interface myLocation {
  lat: number;
  lng: number;
}

const Home: React.FC = () => {

  const itemList:StreetFind[] = [
    {
      imageURL: "/assets/test_imgs/drawer1.jpg",
      lat: 40.755178,
      lng: -73.97759,
      address: {
        houseNumber: 373, 
        streetName: "Madison Ave", 
        city: "New York", 
        state: "NY", 
        zip: 10017, 
        country: "USA"
      },
      category: ["Drawer"],
      color: ["White", "Brown"],
      material: ["Wood"],
      quality: 4,
      description: "Near the brick building with rose tree",
      timestamp: new Date().getTime(),
      user: "N/A"
    },
    {
      imageURL: "/assets/test_imgs/chairs1.jpg",
      lat: 40.746832,
      lng: -73.989895,
      address: {
        houseNumber: 839, 
        streetName: "6th Ave", 
        city: "New York", 
        state: "NY", 
        zip: 10001, 
        country: "USA"
      },
      category: ["Chair", "Couch", "Other"],
      color: ["White", "Beige"],
      material: ["Plastic", "Cloth"],
      quality: 2,
      description: "",
      timestamp: new Date().getTime() - 1000*60*60*26,
      user: "N/A"
    },
    {
      imageURL: "/assets/test_imgs/couch1.jpg",
      lat: 40.762548,
      lng: -73.969024,
      address: {
        houseNumber: 114, 
        streetName: "E 57th St", 
        city: "New York", 
        state: "NY", 
        zip: 10022, 
        country: "USA"
      },
      category: ["Couch"],
      color: ["Blue"],
      material: ["Velvet"],
      quality: 5,
      description: "",
      timestamp: new Date().getTime() - 1000*60*60*5,
      user: "N/A"
    },
    {
      imageURL: "/assets/test_imgs/couch2b.png",
      lat: 40.753885,
      lng: -73.981946,
      address: {
        houseNumber: 20, 
        streetName: "W 42nd St", 
        city: "New York", 
        state: "NY", 
        zip: 10018, 
        country: "USA"
      },
      category: ["Couch"],
      color: ["Green"],
      material: ["Cloth"],
      quality: 3,
      description: "",
      timestamp: new Date().getTime() - 1000*60*60*32,
      user: "N/A"
    }
  ];

  //app states
  const [isAuthed, setAuthed] = useState(false);

  //view states
  const [isSplit, setSplit] = useState(window.innerWidth > 992);
  const [isOneCol, setOneCol] = useState(window.innerWidth <= 500);
  const [isListView, setListView] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showItemViewModal, setShowItemViewModal] = useState(false);
  const [modalItem, setModalItem] = useState(itemList[0]);

  //map states
  const [zoom, setZoom] = useState(14);
  const [location, setLocation] = useState<myLocation>(
    { lat: 40.760142, lng: -73.974469 }
  );

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const updateMedia = () => {
    setSplit(window.innerWidth > 992);
    setOneCol(isSplit ? 0.6*window.innerWidth <= 500 : window.innerWidth <= 500);
  };

  const toggleView = () => {
    return (isListView ? setListView(false) : setListView(true));
  }

  const updateLocation = (loc: myLocation) => {
    setLocation(loc);
  }

  const updateZoom = (zm: number) => {
    setZoom(zm);
  }

  const setUploadModal = (state: boolean) => {
    setShowUploadModal(state);
  }

  const setItemViewModal = (state: boolean) => {
    setShowItemViewModal(state);
  }

  const updateModalItem = (item: StreetFind) => {
    setModalItem(item);
  }

  
  return (
    <IonPage>
      <IonSplitPane contentId="main" className="main-split-pane" when="false">
        <SideMenu/>
        <IonPage id="main">
          <HomeHeader isSplit={isSplit} isAuthed={isAuthed}/>
          <IonContent>
            <MyFab 
              isSplit={isSplit} 
              isListView={isListView} 
              toggleView={toggleView}
              showModal={showUploadModal}
              setModal={setUploadModal}
            />
            <UploadModal 
              showModal={showUploadModal}
              setModal={setUploadModal}
            />

            <ItemViewModal 
              showModal={showItemViewModal}
              setModal={setItemViewModal}
              streetfind={modalItem}
              userLocation={location}
              key={modalItem.imageURL}
              isOneCol={isOneCol}
            />

            <div className="finds-view-container">
              <div className="list-view"
                style={isSplit ? {width: "60%"} : 
                  (isListView ? {width: "100%"} : {display: "none"})
                }
              >
                <ListView 
                  isOneCol={isOneCol} 
                  itemList={itemList}
                  userLocation={location}
                  showModal={showItemViewModal}
                  setModal={setItemViewModal}
                  updateModalItem={updateModalItem}
                />
              </div>
              <div className="map-view"
                style={isSplit ? {width: "40%"} : 
                  (isListView ? {display: "none"} : {width: "100%"})
                }
              >
                <MapView 
                  mapCenter={location}
                  updateLocation={updateLocation}
                  zoom={zoom}
                  updateZoom={updateZoom}
                  itemList={itemList}
                  showModal={showItemViewModal}
                  setModal={setItemViewModal}
                  updateModalItem={updateModalItem}
                />
              </div>
            </div>
          </IonContent>
        </IonPage>
      </IonSplitPane>
    </IonPage>
  );
};

export default Home;
