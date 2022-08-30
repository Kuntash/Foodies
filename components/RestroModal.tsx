import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import React, { useContext, useEffect } from 'react';
import { MotiView } from 'moti';
import { Position, Restaurant, RestroModalProp } from '../types';
import Animated, {
  Extrapolation,
  FadeIn,
  FadeOut,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons/';
import {
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import { theme } from '../theme';
import { ThemeContext } from '../contexts/ThemeProvider';
import DishItem from './DishItem';
import { useModalAnimation } from '../hooks/useModalAnimation';

const FULL_HEIGHT = Dimensions.get('screen').height;
const FULL_WIDTH = Dimensions.get('window').width;

type IProps = {
  position: Position;
  restaurant: Restaurant;
  closeRestro: () => void;
};
const ANIMATION_DURATION = 500;
const RestroModal = ({ restaurant, position, closeRestro }: IProps) => {
  const { colorMode } = useContext(ThemeContext);
  /* Custom hook for modal animation */
  const [
    modalAnimatedStyle,
    mainImageAnimatedStyle,
    initializeModal,
    handleBeginTap,
    handleOnMenuScroll,
  ] = useModalAnimation(position, ANIMATION_DURATION);

  useEffect(() => {
    initializeModal();
  }, []);
  return (
    <Animated.View
      style={[
        { backgroundColor: theme[colorMode].pageBackground },
        styles.container,
        modalAnimatedStyle,
      ]}
    >
      <Animated.Image
        source={restaurant.source}
        style={[styles.mainImage, mainImageAnimatedStyle]}
        resizeMode="cover"
      />
      <TapGestureHandler
        onBegan={handleBeginTap}
        onEnded={(event) => {
          setTimeout(() => {
            closeRestro();
          }, ANIMATION_DURATION + 1);
        }}
      >
        <Animated.View
          style={[styles.closeButtonContainer]}
          entering={FadeIn.duration(ANIMATION_DURATION)}
        >
          <Ionicons name="close" size={24} color="black" />
        </Animated.View>
      </TapGestureHandler>
      <Animated.ScrollView
        onScroll={handleOnMenuScroll}
        scrollEventThrottle={16}
      >
        <Animated.View style={{ padding: 20 }}>
          {restaurant.dishes.map((dish, index) => (
            <DishItem key={dish.id} dish={dish} />
          ))}
        </Animated.View>
      </Animated.ScrollView>
    </Animated.View>
  );
};

export default RestroModal;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    position: 'absolute',
  },
  mainImage: {
    borderRadius: 20,
    // position: 'absolute',
    width: '100%',
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
