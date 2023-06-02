import React from 'react';
import * as XanoApi from '../apis/XanoApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import { Button, Link, ScreenContainer, Spacer, withTheme } from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { Text, TextInput, View, useWindowDimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const RegisterScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const { theme } = props;
  const { navigation } = props;

  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      if (!Constants['auth_header']) {
        return;
      }
      navigation.navigate('HomeScreen');
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  const [emailValue, setEmailValue] = React.useState('');
  const [nameValue, setNameValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');

  return (
    <ScreenContainer hasSafeArea={true}>
      <KeyboardAwareScrollView
        contentContainerStyle={StyleSheet.applyWidth(
          { flex: 1, justifyContent: 'center', paddingTop: 30 },
          dimensions.width
        )}
      >
        {/* Header */}
        <View>
          {/* Title */}
          <Text
            style={StyleSheet.applyWidth(
              {
                fontFamily: 'System',
                fontSize: 36,
                fontWeight: '600',
                textAlign: 'center',
              },
              dimensions.width
            )}
          >
            {'Welcome!'}
          </Text>
          {/* Subtitle */}
          <Text
            style={StyleSheet.applyWidth(
              {
                color: theme.colors.strong,
                fontFamily: 'System',
                fontWeight: '400',
                marginTop: 4,
                textAlign: 'center',
              },
              dimensions.width
            )}
          >
            {'Create an account to get started'}
          </Text>
        </View>
        {/* Register Form */}
        <View
          style={StyleSheet.applyWidth(
            { marginTop: 24, paddingLeft: 36, paddingRight: 36 },
            dimensions.width
          )}
        >
          {/* Error Message */}
          <>
            {!Constants['error_message'] ? null : (
              <Text
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.error,
                    fontSize: 12,
                    marginBottom: 16,
                    textAlign: 'center',
                  },
                  dimensions.width
                )}
              >
                {Constants['error_message']}
              </Text>
            )}
          </>
          {/* Name Input */}
          <TextInput
            onChangeText={newNameInputValue => {
              try {
                setNameValue(newNameInputValue);
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth(
              {
                borderBottomWidth: 1,
                borderColor: theme.colors.divider,
                borderLeftWidth: 1,
                borderRadius: 8,
                borderRightWidth: 1,
                borderTopWidth: 1,
                paddingBottom: 16,
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 16,
              },
              dimensions.width
            )}
            value={nameValue}
            placeholder={'Name'}
            autoCapitalize={'words'}
          />
          <Spacer right={8} left={8} top={12} bottom={12} />
          {/* Email Input */}
          <TextInput
            onChangeText={newEmailInputValue => {
              try {
                setEmailValue(newEmailInputValue);
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth(
              {
                borderBottomWidth: 1,
                borderColor: theme.colors.divider,
                borderLeftWidth: 1,
                borderRadius: 8,
                borderRightWidth: 1,
                borderTopWidth: 1,
                paddingBottom: 16,
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 16,
              },
              dimensions.width
            )}
            value={emailValue}
            autoCapitalize={'none'}
            keyboardType={'email-address'}
            textContentType={'emailAddress'}
            placeholder={'Email'}
          />
          <Spacer right={8} bottom={8} left={8} top={12} />
          {/* Password Input */}
          <TextInput
            onChangeText={newPasswordInputValue => {
              try {
                setPasswordValue(newPasswordInputValue);
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth(
              {
                borderBottomWidth: 1,
                borderColor: theme.colors.divider,
                borderLeftWidth: 1,
                borderRadius: 8,
                borderRightWidth: 1,
                borderTopWidth: 1,
                paddingBottom: 16,
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 16,
              },
              dimensions.width
            )}
            value={passwordValue}
            autoCapitalize={'none'}
            textContentType={'password'}
            placeholder={'Password'}
            secureTextEntry={true}
          />
          <Spacer right={8} left={8} top={24} bottom={24} />
          {/* Sign Up Button */}
          <>
            {Constants['is_loading'] ? null : (
              <Button
                onPress={() => {
                  const handler = async () => {
                    try {
                      setGlobalVariableValue({
                        key: 'is_loading',
                        value: true,
                      });
                      const response = await XanoApi.signUpPOST(Constants, {
                        email: emailValue,
                        name: nameValue,
                        password: passwordValue,
                      });
                      const authToken = response?.authToken;
                      const message = response?.message;
                      setGlobalVariableValue({
                        key: 'error_message',
                        value: message,
                      });
                      setGlobalVariableValue({
                        key: 'is_loading',
                        value: false,
                      });
                      if (!authToken) {
                        return;
                      }
                      const id = response?.id;
                      const name = response?.name;
                      const email = response?.email;
                      setGlobalVariableValue({
                        key: 'auth_header',
                        value: 'Bearer ' + authToken,
                      });
                      setGlobalVariableValue({
                        key: 'user_id',
                        value: id,
                      });
                      setGlobalVariableValue({
                        key: 'user_name',
                        value: name,
                      });
                      setGlobalVariableValue({
                        key: 'user_email',
                        value: email,
                      });
                      setEmailValue('');
                      setNameValue('');
                      setPasswordValue('');
                      navigation.navigate('HomeScreen');
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: theme.colors.primary,
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
                title={'Sign up'}
              >
                {'Sign Up'}
              </Button>
            )}
          </>
          {/* Sign Up Button Loading */}
          <>
            {!Constants['is_loading'] ? null : (
              <Button
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: theme.colors.primary,
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
                disabled={true}
                loading={true}
                title={''}
              >
                {'Sign Up'}
              </Button>
            )}
          </>
          <Spacer right={8} left={8} top={16} bottom={16} />
          <View
            style={StyleSheet.applyWidth(
              { flexDirection: 'row', justifyContent: 'center' },
              dimensions.width
            )}
          >
            <Text
              style={StyleSheet.applyWidth(
                { color: theme.colors.strong, marginRight: 2 },
                dimensions.width
              )}
            >
              {'Have an account?'}
            </Text>
            <Spacer top={8} bottom={8} left={2} right={2} />
            {/* Sign In Link */}
            <Link
              onPress={() => {
                try {
                  navigation.navigate('LoginScreen');
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth(
                { color: theme.colors.primary },
                dimensions.width
              )}
              title={'Sign in.'}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default withTheme(RegisterScreen);
