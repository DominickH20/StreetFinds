import { Plugins, CameraResultType, CameraSource,
    CameraPhoto, Capacitor } from '@capacitor/core';

const { Camera } = Plugins;

export function photoAPI() {

    const takePhoto = async () => {
        try{
            const cameraPhoto = await Camera.getPhoto({
                allowEditing: false,
                resultType: CameraResultType.Uri,
                source: CameraSource.Camera,
                quality: 100
            });

            return cameraPhoto;

        } catch (e) {
            console.log("No Photo (likely cancelled by user)");
        }
    }

    return {
        takePhoto
    }

};