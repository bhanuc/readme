import React from 'react';
import * as XanoApi from '../apis/XanoApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import { Button, ScreenContainer, Spacer, withTheme } from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { Text, View, useWindowDimensions } from 'react-native';

const HomeScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const { theme } = props;
  const { navigation } = props;

  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        const response = await XanoApi.authMeGET(Constants);
        const email = response?.email;
        if (email) {
          return;
        }
        setGlobalVariableValue({
          key: 'auth_header',
          value: '',
        });
        setGlobalVariableValue({
          key: 'user_id',
          value: '',
        });
        setGlobalVariableValue({
          key: 'user_name',
          value: '',
        });
        setGlobalVariableValue({
          key: 'user_email',
          value: '',
        });
        navigation.navigate('LoginScreen');
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

  return (
    <ScreenContainer hasTopSafeArea={true}>
      <View
        style={StyleSheet.applyWidth(
          {
            paddingBottom: 24,
            paddingLeft: 24,
            paddingRight: 24,
            paddingTop: 24,
          },
          dimensions.width
        )}
      >
        {/* Greeting */}
        <Text
          style={StyleSheet.applyWidth(
            {
              color: theme.colors.strong,
              fontFamily: 'System',
              fontSize: 24,
              fontWeight: '700',
            },
            dimensions.width
          )}
        >
          {'Hey '}
          {Constants['user_name']}
          {'!'}
        </Text>
        <Spacer top={8} right={8} bottom={8} left={8} />
        <Text
          style={StyleSheet.applyWidth(
            { color: theme.colors.strong },
            dimensions.width
          )}
        >
          {'Your user ID is '}
          {Constants['user_id']}
          {' and your email address is '}
          {Constants['user_email']}
        </Text>
      </View>

      <View
        style={StyleSheet.applyWidth(
          {
            paddingBottom: 24,
            paddingLeft: 24,
            paddingRight: 24,
            paddingTop: 24,
          },
          dimensions.width
        )}
      >
        {/* Sign Out Button */}
        <Button
          onPress={() => {
            try {
              setGlobalVariableValue({
                key: 'is_loading',
                value: true,
              });
              setGlobalVariableValue({
                key: 'auth_header',
                value: '',
              });
              setGlobalVariableValue({
                key: 'user_id',
                value: '',
              });
              setGlobalVariableValue({
                key: 'user_name',
                value: '',
              });
              setGlobalVariableValue({
                key: 'user_email',
                value: '',
              });
              setGlobalVariableValue({
                key: 'is_loading',
                value: false,
              });
              navigation.navigate('LoginScreen');
            } catch (err) {
              console.error(err);
            }
          }}
          style={StyleSheet.applyWidth(
            {
              backgroundColor: theme.colors.error,
              borderRadius: 8,
              fontFamily: 'System',
              fontWeight: '700',
              paddingBottom: 16,
              paddingLeft: 16,
              paddingRight: 16,
              paddingTop: 16,
              textAlign: 'center',
            },
            dimensions.width
          )}
          title={'Sign out'}
        />
      </View>
    </ScreenContainer>
  );
};

export default withTheme(HomeScreen);
