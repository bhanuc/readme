import React from 'react';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import { ScreenContainer, Spacer, withTheme } from '@draftbit/ui';
import { Text, useWindowDimensions } from 'react-native';

const STARTHEREScreen = props => {
  const dimensions = useWindowDimensions();

  const { theme } = props;

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth(
        {
          justifyContent: 'center',
          paddingBottom: 36,
          paddingLeft: 36,
          paddingRight: 36,
          paddingTop: 36,
        },
        dimensions.width
      )}
      hasTopSafeArea={true}
    >
      <Text
        style={StyleSheet.applyWidth(
          { color: theme.colors.strong, fontSize: 20 },
          dimensions.width
        )}
      >
        {'Welcome to the Xano Auth Starter App'}
      </Text>
      <Spacer top={8} right={8} bottom={8} left={8} />
      <Text
        style={StyleSheet.applyWidth(
          { color: theme.colors.strong, fontSize: 16 },
          dimensions.width
        )}
      >
        {'To get started, please go to the guide located at the address below'}
      </Text>
      <Spacer top={8} right={8} bottom={8} left={8} />
      <Text
        style={StyleSheet.applyWidth(
          { color: theme.colors.strong, fontSize: 16 },
          dimensions.width
        )}
      >
        {
          'https://community.draftbit.com/c/tutorials/xano-auth-starter-app-guide'
        }
      </Text>
    </ScreenContainer>
  );
};

export default withTheme(STARTHEREScreen);
