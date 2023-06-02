import React from 'react';
import Images from '../config/Images';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
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
} from 'react-native';

const VideoCallStartScreen = props => {
  const dimensions = useWindowDimensions();

  const { theme } = props;
  const { navigation } = props;

  const [Ongoing, setOngoing] = React.useState(false);
  const [Ringing, setRinging] = React.useState(true);
  const [mute, setMute] = React.useState(false);
  const [speaker, setSpeaker] = React.useState(false);

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      hasTopSafeArea={false}
    >
      {/* Ringing */}
      <>
        {!Ringing ? null : (
          <ImageBackground
            style={StyleSheet.applyWidth(
              { height: '100%', justifyContent: 'flex-end', width: '100%' },
              dimensions.width
            )}
            resizeMode={'cover'}
            source={Images.Rectangle}
          >
            {/* Ringing */}
            <View
              style={StyleSheet.applyWidth({ flex: 0.4 }, dimensions.width)}
            >
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center', flex: 1 },
                  dimensions.width
                )}
              >
                {/* Name */}
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors['Custom Color_4'],
                      fontFamily: 'Poppins_600SemiBold',
                      fontSize: 22,
                    },
                    dimensions.width
                  )}
                >
                  {'Kyara Moana'}
                </Text>
                {/* Video Call */}
                <Text
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors['Custom Color_4'],
                      fontFamily: 'Poppins_400Regular',
                      fontSize: 15,
                      marginTop: 6,
                    },
                    dimensions.width
                  )}
                >
                  {'Video Call'}
                </Text>
              </View>
              {/* Clicks */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  },
                  dimensions.width
                )}
              >
                {/* Decline */}
                <Touchable
                  onPress={() => {
                    try {
                      navigation.goBack();
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        height: 83,
                        paddingLeft: 2,
                        paddingRight: 2,
                      },
                      dimensions.width
                    )}
                  >
                    <Circle size={50} bgColor={theme.colors['Custom Color_5']}>
                      <Icon
                        size={24}
                        color={theme.colors['Custom Color_4']}
                        name={'MaterialIcons/call-end'}
                      />
                    </Circle>

                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors['Custom Color_4'],
                          fontFamily: 'Poppins_400Regular',
                          fontSize: 13,
                          marginTop: 8,
                          textAlign: 'center',
                        },
                        dimensions.width
                      )}
                    >
                      {'Decline'}
                    </Text>
                  </View>
                </Touchable>
                {/* Accept */}
                <Touchable
                  onPress={() => {
                    try {
                      setOngoing(true);
                      setRinging(false);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        height: 83,
                        paddingLeft: 2,
                        paddingRight: 2,
                      },
                      dimensions.width
                    )}
                  >
                    <Circle size={50} bgColor={theme.colors['Custom Color_12']}>
                      <Icon
                        size={24}
                        color={theme.colors['Custom Color_4']}
                        name={'MaterialIcons/video-call'}
                      />
                    </Circle>

                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors['Custom Color_4'],
                          fontFamily: 'Poppins_400Regular',
                          fontSize: 13,
                          marginTop: 8,
                          textAlign: 'center',
                        },
                        dimensions.width
                      )}
                    >
                      {'Accept'}
                    </Text>
                  </View>
                </Touchable>
              </View>
            </View>
          </ImageBackground>
        )}
      </>
      {/* Ongoing */}
      <>
        {!Ongoing ? null : (
          <ImageBackground
            style={StyleSheet.applyWidth(
              { height: '100%', justifyContent: 'flex-end', width: '100%' },
              dimensions.width
            )}
            resizeMode={'cover'}
            source={Images.User}
          >
            {/* Ongoing */}
            <View
              style={StyleSheet.applyWidth({ flex: 0.4 }, dimensions.width)}
            >
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'flex-end', flex: 1, paddingRight: 30 },
                  dimensions.width
                )}
              >
                <Image
                  style={StyleSheet.applyWidth(
                    { borderRadius: 5, height: 120, width: 90 },
                    dimensions.width
                  )}
                  resizeMode={'cover'}
                  source={Images.Rectangle}
                />
              </View>
              {/* Clicks */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    flex: 0.75,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  },
                  dimensions.width
                )}
              >
                {/* Mute */}
                <View>
                  {/* disabled */}
                  <>
                    {mute ? null : (
                      <Touchable
                        onPress={() => {
                          try {
                            setMute(true);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              height: 83,
                              paddingLeft: 2,
                              paddingRight: 2,
                            },
                            dimensions.width
                          )}
                        >
                          <Circle size={50} bgColor={theme.colors['BG Gray']}>
                            <Icon
                              size={24}
                              color={theme.colors['Custom Color_4']}
                              name={'Ionicons/mic-sharp'}
                            />
                          </Circle>

                          <Text
                            style={StyleSheet.applyWidth(
                              {
                                color: theme.colors['Custom Color_4'],
                                fontFamily: 'Poppins_400Regular',
                                fontSize: 13,
                                marginTop: 8,
                              },
                              dimensions.width
                            )}
                          >
                            {'Mute'}
                          </Text>
                        </View>
                      </Touchable>
                    )}
                  </>
                  {/* Enabled */}
                  <>
                    {!mute ? null : (
                      <Touchable
                        onPress={() => {
                          try {
                            setMute(false);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              height: 83,
                              paddingLeft: 2,
                              paddingRight: 2,
                            },
                            dimensions.width
                          )}
                        >
                          <Circle size={50} bgColor={theme.colors['Light']}>
                            <Icon
                              size={24}
                              color={theme.colors['Custom Color_4']}
                              name={'Ionicons/mic-sharp'}
                            />
                          </Circle>

                          <Text
                            style={StyleSheet.applyWidth(
                              {
                                color: theme.colors['Custom Color_4'],
                                fontFamily: 'Poppins_400Regular',
                                fontSize: 13,
                                marginTop: 8,
                              },
                              dimensions.width
                            )}
                          >
                            {'Mute'}
                          </Text>
                        </View>
                      </Touchable>
                    )}
                  </>
                </View>
                {/* End Call */}
                <Touchable
                  onPress={() => {
                    try {
                      navigation.goBack();
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        height: 83,
                        paddingLeft: 2,
                        paddingRight: 2,
                      },
                      dimensions.width
                    )}
                  >
                    <Circle size={50} bgColor={theme.colors['Custom Color_5']}>
                      <Icon
                        size={24}
                        color={theme.colors['Custom Color_4']}
                        name={'MaterialIcons/call-end'}
                      />
                    </Circle>

                    <Text
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors['Custom Color_4'],
                          fontFamily: 'Poppins_400Regular',
                          fontSize: 13,
                          marginTop: 8,
                          textAlign: 'center',
                        },
                        dimensions.width
                      )}
                    >
                      {'Decline'}
                    </Text>
                  </View>
                </Touchable>
                {/* Speaker */}
                <View>
                  {/* Disabled */}
                  <>
                    {speaker ? null : (
                      <Touchable
                        onPress={() => {
                          try {
                            setSpeaker(true);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              height: 83,
                              paddingLeft: 2,
                              paddingRight: 2,
                            },
                            dimensions.width
                          )}
                        >
                          <Circle size={50} bgColor={theme.colors['BG Gray']}>
                            <Icon
                              size={24}
                              color={theme.colors['Custom Color_4']}
                              name={'Ionicons/volume-high'}
                            />
                          </Circle>

                          <Text
                            style={StyleSheet.applyWidth(
                              {
                                color: theme.colors['Custom Color_4'],
                                fontFamily: 'Poppins_400Regular',
                                fontSize: 13,
                                marginTop: 8,
                                textAlign: 'center',
                              },
                              dimensions.width
                            )}
                          >
                            {'Volume'}
                          </Text>
                        </View>
                      </Touchable>
                    )}
                  </>
                  {/* Enabled */}
                  <>
                    {!speaker ? null : (
                      <Touchable
                        onPress={() => {
                          try {
                            setSpeaker(false);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              height: 83,
                              paddingLeft: 2,
                              paddingRight: 2,
                            },
                            dimensions.width
                          )}
                        >
                          <Circle size={50} bgColor={theme.colors['Light']}>
                            <Icon
                              size={24}
                              color={theme.colors['Custom Color_4']}
                              name={'Ionicons/volume-high'}
                            />
                          </Circle>

                          <Text
                            style={StyleSheet.applyWidth(
                              {
                                color: theme.colors['Custom Color_4'],
                                fontFamily: 'Poppins_400Regular',
                                fontSize: 13,
                                marginTop: 8,
                                textAlign: 'center',
                              },
                              dimensions.width
                            )}
                          >
                            {'Volume'}
                          </Text>
                        </View>
                      </Touchable>
                    )}
                  </>
                </View>
              </View>
            </View>
          </ImageBackground>
        )}
      </>
    </ScreenContainer>
  );
};

export default withTheme(VideoCallStartScreen);
