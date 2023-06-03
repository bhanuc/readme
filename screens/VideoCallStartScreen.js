import React from 'react';
import { StatusBar } from 'expo-status-bar'
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import { Camera } from 'expo-camera'
import { ImageEditor } from "expo-image-editor";
import MlkitOcr from 'react-native-mlkit-ocr';
import {
  Circle,
  Icon,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import {
  Image,
  ImageBackground,
  Text,
  View,
  useWindowDimensions,
  TouchableOpacity
} from 'react-native';
import { useEffect, useState } from 'react';
import useLayout from '../useLayout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const BoundingBoxImage = ({ source, boxes, onImageLayout, imgSize, imgLayout, dimensions }) => {
  console.log(dimensions, "dimensions");
  const heightRatio = dimensions.height / imgSize.height;
  const widthRatio = dimensions.width / imgSize.width;
  return (
    <View style={{
      backgroundColor: 'white',
      flex: 1,
      width: '100%',
      height: '100%'
    }}>
      {/* <ImageBackground
      resizeMode="contain"
        source={{ uri: source }}
        style={{
          flex: 1
        }}
        onLayout={onImageLayout}
      > */}
      {/* <Image source={source} style={{ width: '100%', height: '100%' }} /> */}

      {boxes && boxes.map((box, index) => {
        console.log(box.bounding, heightRatio, widthRatio);
        return <View
          key={index}
          style={{
            borderWidth: 2,
            borderColor: 'red',
            position: 'absolute',
            top: box.bounding.top * heightRatio,
            left: box.bounding.left * widthRatio,
            width: box.bounding.width * widthRatio,
            height: box.bounding.height * heightRatio,
          }}
        >
          <Text>{box.text}</Text>
        </View>
      })}
      {/* </ImageBackground> */}
      <View
        style={{
          alignSelf: 'center',
          flex: 1,
          alignItems: 'center',
          position: 'absolute',
          bottom: 50,
        }}
      >
        <Touchable activeOpacity={0.8} disabledOpacity={0.8} onPress={() => props.navigation.navigate('ProfileScreen')}>
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                height: 48,
                justifyContent: 'center',
                width: 48,
              },
              dimensions.width
            )}
          >
            <Icon
              size={24}
              name={'AntDesign/play'}
    
            />
          </View>
        </Touchable>
      </View>
    </View>
  );
};

const CameraPreview = ({ photo, retakePicture, savePhoto, showResults }) => {
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%'
      }}
    >
      <ImageEditor
        visible={true}
        onCloseEditor={async (result) => {
          console.log("onCloseEditor");
          // const resultFromFile = await MlkitOcr.detectFromFile(result.uri);
          // console.log(result);
          // console.log(resultFromFile);
          // setImageData(result);
        }}
        imageUri={photo && photo.uri}
        fixedCropAspectRatio={16 / 9}
        lockAspectRatio={true}
        minimumCropDimensions={{
          width: 100,
          height: 100,
        }}
        onEditingComplete={(result) => {
          console.log("onEditingComplete");
          console.log(result.uri);
          Image.getSize(result.uri, (width, height) => {
            MlkitOcr.detectFromFile(result.uri).then((res) => {
              showResults(res, result.uri, { height, width });
            });
          });


          // console.log(result);
          // console.log(resultFromFile);
          // setImageData(result);
        }}
        mode="full"
      />
      {/* <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            padding: 15,
            justifyContent: 'flex-end'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <TouchableOpacity
              onPress={retakePicture}
              style={{
                width: 130,
                height: 40,

                alignItems: 'center',
                borderRadius: 4
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20
                }}
              >
                Re-take
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={savePhoto}
              style={{
                width: 130,
                height: 40,

                alignItems: 'center',
                borderRadius: 4
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20
                }}
              >
                save photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground> */}
    </View>
  )
}

const VideoCallStartScreen = props => {
  const dimensions = useWindowDimensions();
  let camera = null;
  const { theme } = props;
  const { navigation } = props;
  const [resultBoxes, setResultBoxes] = useState([]);
  const [resultSrc, setResultSrc] = useState("");
  const [imgLayout, onImageLayout] = useLayout();
  const [imgSize, setImageSize] = useState({ width: 0, height: 0 });

  const [resultVisible, setResultVisible] = useState(false);

  const [startCamera, setStartCamera] = React.useState(false);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [capturedImage, setCapturedImage] = React.useState(null);
  const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = React.useState('off');


  const isHermes = () => !!global.HermesInternal;
  console.log("isHermes", isHermes());

  const __showResults = async (result, source, { height, width }) => {
    setImageSize({ height, width });
    setResultBoxes(result);
    setResultSrc(source);
    setResultVisible(true);

    setStartCamera(false);
  }

  const __startCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync()
    if (status === 'granted') {
      setStartCamera(true)
    } else {
      Alert.alert('Access denied')
    }
  }
  const __takePicture = async () => {
    const photo = await camera.takePictureAsync()
    console.log(photo)
    setPreviewVisible(true)
    //setStartCamera(false)
    setCapturedImage(photo)
  }
  const __savePhoto = () => { }
  const __retakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
    __startCamera()
  }
  const __handleFlashMode = () => {
    if (flashMode === 'on') {
      setFlashMode('off')
    } else if (flashMode === 'off') {
      setFlashMode('on')
    } else {
      setFlashMode('auto')
    }
  }
  const __switchCamera = () => {
    if (cameraType === 'back') {
      setCameraType('front')
    } else {
      setCameraType('back')
    }
  }


  useEffect(() => {
    __startCamera();
  }, [])

  React.useEffect(() => {
    console.log("resultVisible", resultVisible);
    console.log("imgLayout", imgLayout);
    // if (!imgDimensions.width || !imgDimensions.height) {
    //   console.log('Image dimensions not loaded yet');
    // } else {
    //   const { width: originalWidth, height: originalHeight } = imgDimensions;
    //   console.log(imgDimensions);
    //   const { width: containerWidth, height: containerHeight } = imgLayout;
    //   const imgAspectRatio = originalWidth / originalHeight;
    //   // find image dimension closest to container dimension
    //   const widthDiff = Math.abs(originalWidth - containerWidth);
    //   const heightDiff = Math.abs(originalHeight - containerHeight);
    //   let imgWidth, imgHeight;
    //   // if width is closest then  scale imgHeight to containerWidth
    //   if (widthDiff < heightDiff) {
    //     imgWidth = containerWidth;
    //     imgHeight = imgWidth * imgAspectRatio;
    //   }
    //   // if height is closest scale imgWidth to containerWidth
    //   else {
    //     imgHeight = containerHeight;
    //     imgWidth = imgHeight * imgAspectRatio;
    //   }
    //   setBoundingBox({
    //     x: imgLayout.left || imgLayout.x,
    //     y: imgLayout.top || imgLayout.y,
    //     width: imgWidth,
    //     height: imgHeight,
    //   });
    // }
  }, [imgLayout]);

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      hasTopSafeArea={false}
    >
      <View style={styles.container}>
        {startCamera && (
          <View
            style={{
              flex: 1,
              width: '100%'
            }}
          >
            {previewVisible && capturedImage ? (
              <CameraPreview photo={capturedImage} savePhoto={__savePhoto} retakePicture={__retakePicture} showResults={__showResults} />
            ) : (
              <Camera
                type={cameraType}
                flashMode={flashMode}
                style={{ flex: 1 }}
                ref={(r) => {
                  camera = r
                }}
              >
                <View
                  style={{
                    flex: 1,
                    width: '100%',
                    backgroundColor: 'transparent',
                    flexDirection: 'row'
                  }}
                >
                  <View
                    style={{
                      position: 'absolute',
                      left: '5%',
                      top: '10%',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <TouchableOpacity
                      onPress={__handleFlashMode}
                      style={{
                        backgroundColor: flashMode === 'off' ? '#000' : '#fff',
                        borderRadius: 50,
                        height: 25,
                        width: 25
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20
                        }}
                      >
                        ⚡️
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={__switchCamera}
                      style={{
                        marginTop: 20,
                        borderRadius: 50,
                        height: 25,
                        width: 25
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20
                        }}
                      >
                        {cameraType === 'front' ? '🤳' : '📷'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      flexDirection: 'row',
                      flex: 1,
                      width: '100%',
                      padding: 20,
                      justifyContent: 'space-between'
                    }}
                  >
                    <View
                      style={{
                        alignSelf: 'center',
                        flex: 1,
                        alignItems: 'center'
                      }}
                    >
                      <TouchableOpacity
                        onPress={__takePicture}
                        style={{
                          width: 70,
                          height: 70,
                          bottom: 0,
                          borderRadius: 50,
                          backgroundColor: '#fff'
                        }}
                      />
                    </View>
                  </View>
                </View>
              </Camera>
            )}
          </View>
        )}
        {!startCamera && !resultVisible && (
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <TouchableOpacity
              onPress={__startCamera}
              style={{
                width: 130,
                borderRadius: 4,
                backgroundColor: '#14274e',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 40
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}
              >
                Take picture
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {resultVisible && (

          <BoundingBoxImage
            source={resultSrc}
            boxes={resultBoxes}
            imgSize={imgSize}
            imgLayout={imgLayout}
            onImageLayout={onImageLayout}
            dimensions={dimensions}
          />
        )}

        <StatusBar style="auto" />
      </View>
    </ScreenContainer>
  );
};

export default withTheme(VideoCallStartScreen);
