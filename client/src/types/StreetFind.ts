interface address {
    houseNumber: number;
    streetName: string;
    city: string;
    state: string;
    zip: number;
    country: string;
}

export interface StreetFind {
    imageURL: string;
    lat: number;
    lng: number;
    address: address;
    category: string[];
    color: string[];
    material: string[];
    quality: number;
    description: string;
    timestamp: number;
    user: string;
}