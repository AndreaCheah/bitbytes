import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useRef, useState } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function UploadScreen() {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [photoUri, setPhotoUri] = useState(null);
    const cameraRef = useRef(null);

    if (!permission) {  // camera permissions are still loading
        return <View />
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    async function takePicture() {
        if (cameraRef) {
            const picture = await cameraRef.current.takePictureAsync();
            console.log(picture); // TODO: handle the taken photo
            setPhotoUri(picture.uri);
        }
    }

    function discardPicture() {
        setPhotoUri(null);
    }

    function confirmPicture() {
        console.log("Confirmed picture.")
    }

  return (
    <View style={styles.container}>
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
            <View style={styles.flipCameraButtonContainer}>
                <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                    <MaterialCommunityIcons name={"camera-flip-outline"} color={"#FFFFFF"} size={40} />
                </TouchableOpacity>
            </View>
            <View style={styles.takePictureButtonContainer}>
                <TouchableOpacity style={styles.button} onPress={takePicture}>
                    <MaterialCommunityIcons name={"circle-slice-8"} color={"#FFFFFF"} size={80} />
                </TouchableOpacity>
            </View>
        </CameraView>
        {photoUri && (
            <View style={styles.previewContainer}>
                <Image source={{ uri: photoUri }} style={styles.previewImage} />
                <View style={styles.actionButtonsContainer}>
                    <TouchableOpacity style={styles.discardButton} onPress={discardPicture}>
                        <MaterialCommunityIcons name={"trash-can-outline"} color={"#FFFFFF"} size={40} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.confirmButton} onPress={confirmPicture}>
                        <MaterialCommunityIcons name={"check"} color={"#FFFFFF"} size={40} />
                    </TouchableOpacity>
                </View>
            </View>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    flipCameraButtonContainer: {
        position: 'absolute',
        top: 40,
        right: 0,
        margin: 20,
        backgroundColor: 'transparent',
    },
    takePictureButtonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    button: {
        flex: 1,
        alignSelf: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    previewContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    previewImage: {
        width: '100%',
        height: '100%',
    },
    actionButtonsContainer: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    discardButton: {
        backgroundColor: 'rgba(211, 211, 211, 0.5)', // Grey color with increased transparency
        padding: 10,
        borderRadius: 20,
        margin: 5,
    },
    confirmButton: {
        backgroundColor: 'rgba(76, 175, 80, 0.5)', // Green color with increased transparency
        padding: 10,
        borderRadius: 20,
        margin: 5,
    },
});
