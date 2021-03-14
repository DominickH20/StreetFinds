import React from 'react';
import { IonGrid, IonRow, IonCol, IonContent } from '@ionic/react';

import { StreetFind } from '../types/StreetFind'
import FindCard from '../components/FindCard';
import './ListView.css';

interface ListProps {
  isOneCol: boolean;
  itemList: StreetFind[]; 
  userLocation: { 
    lat: number; 
    lng: number;
  };
}

const ListView: React.FC<ListProps> = (props) => {
  return (
    <IonContent>
      {(props.itemList.length > 0) ? (
        <IonGrid>
          <IonRow>
            {props.itemList.map((streetfind, index) => (
              <IonCol 
                sizeXs={props.isOneCol ? "12" : "6"} 
                key={index}
              >
                <FindCard streetfind={streetfind} userLocation={props.userLocation}/>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        ) : (
          <div>No finds Found here!</div>
        )
      }
    </IonContent>
  );
};

export default ListView;
