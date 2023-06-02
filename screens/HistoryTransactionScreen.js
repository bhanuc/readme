import React from 'react';
import * as DraftbitExampleApi from '../apis/DraftbitExampleApi.js';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import { Icon, ScreenContainer, Touchable, withTheme } from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import {
  ActivityIndicator,
  Image,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { Fetch } from 'react-request';

const HistoryTransactionScreen = props => {
  const dimensions = useWindowDimensions();
  const { theme } = props;

  return (
    <ScreenContainer
      scrollable={false}
      hasSafeArea={false}
      hasTopSafeArea={true}
    >
      {/* Header */}
      <View
        style={StyleSheet.applyWidth(
          {
            height: 48,
            marginBottom: 10,
            marginTop: 12,
            paddingLeft: 20,
            paddingRight: 20,
          },
          dimensions.width
        )}
      >
        {/* Screen Heading */}
        <Text
          style={StyleSheet.applyWidth(
            {
              color: theme.colors.strong,
              fontFamily: 'Inter_500Medium',
              fontSize: 24,
            },
            dimensions.width
          )}
        >
          {'History Transaction'}
        </Text>
      </View>
      {/* Transactions */}
      <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
        <DraftbitExampleApi.FetchDoctorsListGET count={6}>
          {({ loading, error, data, refetchDoctorsList }) => {
            const fetchData = data;
            if (!fetchData || loading) {
              return <ActivityIndicator />;
            }

            if (error) {
              return (
                <Text style={{ textAlign: 'center' }}>
                  There was a problem fetching this data
                </Text>
              );
            }

            return (
              <FlashList
                data={fetchData}
                listKey={'1mbPHeD1'}
                keyExtractor={flashListData =>
                  flashListData?.id ||
                  flashListData?.uuid ||
                  JSON.stringify(flashListData)
                }
                renderItem={({ item }) => {
                  const flashListData = item;
                  return (
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'flex-start',
                          backgroundColor: theme.colors['Custom #ffffff'],
                          borderRadius: 12,
                          flexDirection: 'row',
                          marginBottom: 20,
                          marginLeft: 20,
                          marginRight: 20,
                          paddingBottom: 20,
                          paddingLeft: 20,
                          paddingRight: 20,
                          paddingTop: 20,
                        },
                        dimensions.width
                      )}
                    >
                      <Image
                        style={StyleSheet.applyWidth(
                          { borderRadius: 8, height: 64, width: 64 },
                          dimensions.width
                        )}
                        resizeMode={'cover'}
                        source={{ uri: 'https://picsum.photos/64' }}
                      />
                      <View
                        style={StyleSheet.applyWidth(
                          { flex: 1, marginLeft: 20 },
                          dimensions.width
                        )}
                      >
                        {/* Title */}
                        <Text
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors.strong,
                              fontFamily: 'Inter_500Medium',
                              fontSize: 16,
                            },
                            dimensions.width
                          )}
                        >
                          {'Buy 2 Medicine Woods Papermint'}
                        </Text>
                        {/* type  */}
                        <Text
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors.strong,
                              fontFamily: 'Inter_300Light',
                              fontSize: 12,
                              marginTop: 4,
                              opacity: 0.6,
                            },
                            dimensions.width
                          )}
                        >
                          {'Medicine • Monday, 4:19 PM'}
                        </Text>
                        {/* Status Tags */}
                        <View
                          style={StyleSheet.applyWidth(
                            { alignItems: 'flex-start' },
                            dimensions.width
                          )}
                        >
                          {/* Pending Payment */}
                          <>
                            {!(flashListData?.id === 1) ? null : (
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    backgroundColor:
                                      theme.colors['Custom Color_19'],
                                    borderRadius: 5,
                                    marginTop: 16,
                                  },
                                  dimensions.width
                                )}
                              >
                                <Text
                                  style={StyleSheet.applyWidth(
                                    {
                                      color: theme.colors['Custom Color_4'],
                                      fontFamily: 'Inter_400Regular',
                                      fontSize: 12,
                                      paddingBottom: 6,
                                      paddingLeft: 10,
                                      paddingRight: 10,
                                      paddingTop: 6,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {'Pending Payment'}
                                </Text>
                              </View>
                            )}
                          </>
                          {/* Not Confirmed Yet */}
                          <>
                            {!(flashListData?.id === 3) ? null : (
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    backgroundColor:
                                      theme.colors['Custom Color_7'],
                                    borderRadius: 5,
                                    marginTop: 16,
                                  },
                                  dimensions.width
                                )}
                              >
                                <Text
                                  style={StyleSheet.applyWidth(
                                    {
                                      color: theme.colors['Strong'],
                                      fontFamily: 'Inter_400Regular',
                                      fontSize: 12,
                                      paddingBottom: 6,
                                      paddingLeft: 10,
                                      paddingRight: 10,
                                      paddingTop: 6,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {'Not Confirmed Yet'}
                                </Text>
                              </View>
                            )}
                          </>
                          {/* Complete */}
                          <>
                            {!(flashListData?.id === 2) ? null : (
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    backgroundColor:
                                      theme.colors['Custom Color_21'],
                                    borderRadius: 5,
                                    marginTop: 16,
                                  },
                                  dimensions.width
                                )}
                              >
                                <Text
                                  style={StyleSheet.applyWidth(
                                    {
                                      color: theme.colors['Custom Color_20'],
                                      fontFamily: 'Inter_400Regular',
                                      fontSize: 12,
                                      paddingBottom: 6,
                                      paddingLeft: 10,
                                      paddingRight: 10,
                                      paddingTop: 6,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {'Complete'}
                                </Text>
                              </View>
                            )}
                          </>
                          {/* Confirm */}
                          <>
                            {!(flashListData?.id > 3) ? null : (
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    backgroundColor:
                                      theme.colors['Custom Color_21'],
                                    borderRadius: 5,
                                    marginTop: 16,
                                  },
                                  dimensions.width
                                )}
                              >
                                <Text
                                  style={StyleSheet.applyWidth(
                                    {
                                      color: theme.colors['Custom Color_20'],
                                      fontFamily: 'Inter_400Regular',
                                      fontSize: 12,
                                      paddingBottom: 6,
                                      paddingLeft: 10,
                                      paddingRight: 10,
                                      paddingTop: 6,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {'Confirm'}
                                </Text>
                              </View>
                            )}
                          </>
                        </View>
                      </View>
                    </View>
                  );
                }}
                estimatedItemSize={50}
                numColumns={1}
                onEndReachedThreshold={0.5}
              />
            );
          }}
        </DraftbitExampleApi.FetchDoctorsListGET>
      </View>
      {/* Bottom Tab */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            backgroundColor: theme.colors['Custom #ffffff'],
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            flexDirection: 'row',
            height: 117,
            justifyContent: 'space-between',
            paddingBottom: 20,
            paddingLeft: 30,
            paddingRight: 30,
          },
          dimensions.width
        )}
      >
        {/* Home */}
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
              name={'AntDesign/home'}
              color={theme.colors['Medium']}
            />
          </View>
        </Touchable>
        {/* History Transaction */}
        <Touchable activeOpacity={0.8} disabledOpacity={0.8}  onPress={() => props.navigation.navigate('VideoCallStartScreen')}>
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
              color={theme.colors['Primary']}
              name={'Ionicons/document-text'}
            />
          </View>
        </Touchable>
        {/* Messages */}
        <Touchable activeOpacity={0.8} disabledOpacity={0.8}  onPress={() => props.navigation.navigate('VideoCallStartScreen')}>
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
              name={'Ionicons/chatbox-outline'}
              color={theme.colors['Medium']}
            />
          </View>
        </Touchable>
        {/* Profile */}
        <Touchable disabledOpacity={0.8} activeOpacity={0.8}  onPress={() => props.navigation.navigate('HomeCopyScreen')}>
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
              name={'AntDesign/user'}
              color={theme.colors['Medium']}
            />
          </View>
        </Touchable>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(HistoryTransactionScreen);
