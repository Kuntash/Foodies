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
  const modalHeight = useSharedValue(position.height);
  const modalWidth = useSharedValue(position.width);
  const modalX = useSharedValue(position.pageX);
  const modalY = useSharedValue(position.pageY);
  const buttonOpacity = useSharedValue(0);
  const modalAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: modalWidth.value,
      height: modalHeight.value,
      top: modalY.value,
      left: modalX.value,
    };
  }, [modalHeight, modalWidth, modalY, modalX]);
  const mainImageHeight = useSharedValue(100);
  const mainImageAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: `${mainImageHeight.value}%`,
    };
  }, [mainImageHeight]);
  useEffect(() => {
    modalHeight.value = withTiming(FULL_HEIGHT, {
      duration: ANIMATION_DURATION,
    });
    modalWidth.value = withTiming(FULL_WIDTH, { duration: ANIMATION_DURATION });
    modalX.value = withTiming(0, { duration: ANIMATION_DURATION });
    modalY.value = withTiming(0, { duration: ANIMATION_DURATION });
    buttonOpacity.value = withTiming(1, { duration: ANIMATION_DURATION });
    mainImageHeight.value = withTiming(50, { duration: ANIMATION_DURATION });
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
      <SafeAreaView />
      <TapGestureHandler
        onBegan={(event) => {
          modalHeight.value = withTiming(position.height, {
            duration: ANIMATION_DURATION,
          });
          modalWidth.value = withTiming(position.width, {
            duration: ANIMATION_DURATION,
          });
          modalX.value = withTiming(position.pageX, {
            duration: ANIMATION_DURATION,
          });
          modalY.value = withTiming(position.pageY, {
            duration: ANIMATION_DURATION,
          });
          buttonOpacity.value = withTiming(0, {
            duration: ANIMATION_DURATION,
          });
          mainImageHeight.value = withTiming(100, {
            duration: ANIMATION_DURATION,
          });
        }}
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
      <Animated.ScrollView contentContainerStyle={{ padding: 20 }}>
        {restaurant.dishes.map((dish, index) => (
          <DishItem key={dish.id} dish={dish} />
        ))}
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
