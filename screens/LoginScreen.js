import React from 'react';
import * as XanoApi from '../apis/XanoApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import { Button, Link, ScreenContainer, Spacer, withTheme } from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { Text, TextInput, View, useWindowDimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const LoginScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const myFunctionName = response => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules
    console.log(JSON.stringify(response));
  };

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
  const [passwordValue, setPasswordValue] = React.useState('');

  return (
    <ScreenContainer
      hasBottomSafeArea={true}
      hasSafeArea={true}
      hasTopSafeArea={true}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={StyleSheet.applyWidth(
          { flex: 1, justifyContent: 'center', paddingTop: 30 },
          dimensions.width
        )}
      >
        {/* Header */}
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'center' },
            dimensions.width
          )}
        >
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
            {'Welcome Back!'}
          </Text>
          {/* Subtitle */}
          <Text
            style={StyleSheet.applyWidth(
              {
                fontFamily: 'System',
                fontSize: 14,
                fontWeight: '400',
                marginTop: 4,
              },
              dimensions.width
            )}
          >
            {'Sign in to your account to continue'}
          </Text>
        </View>
        {/* Login Form */}
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
                fontFamily: 'System',
                fontWeight: '400',
                paddingBottom: 16,
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 16,
              },
              dimensions.width
            )}
            value={emailValue}
            keyboardType={'email-address'}
            textContentType={'emailAddress'}
            autoCapitalize={'none'}
            placeholder={'Email'}
          />
          <Spacer right={8} left={8} top={12} bottom={12} />
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
                fontFamily: 'System',
                fontWeight: '400',
                paddingBottom: 16,
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 16,
              },
              dimensions.width
            )}
            value={passwordValue}
            placeholder={'Password'}
            secureTextEntry={true}
          />
          <Spacer right={8} left={8} top={24} bottom={24} />
          {/* Sign In Button */}
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
                      const response = await XanoApi.loginPOST(Constants, {
                        email: emailValue,
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
                      setPasswordValue('');
                      setGlobalVariableValue({
                        key: 'error_message',
                        value: '',
                      });
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
                    paddingTop: 16,
                    textAlign: 'center',
                  },
                  dimensions.width
                )}
                title={'Sign in'}
              >
                {'Sign Up'}
              </Button>
            )}
          </>
          {/* Sign In Button Loading */}
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
              {
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 12,
              },
              dimensions.width
            )}
          >
            <Text>{'New User?'}</Text>
            <Spacer top={8} bottom={8} left={2} right={2} />
            {/* Sign Up Link */}
            <Link
              onPress={() => {
                try {
                  navigation.navigate('RegisterScreen');
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth(
                { color: theme.colors.primary },
                dimensions.width
              )}
              title={'Sign up!'}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default withTheme(LoginScreen);
