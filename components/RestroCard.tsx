import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useContext, useRef } from 'react';
import { ThemeContext } from '../contexts/ThemeProvider';
import { theme } from '../theme';
import Animated from 'react-native-reanimated';
import {
  LongPressGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import { Position, Restaurant } from '../types';
import { useCardAnimation } from '../hooks/useCardAnimation';

type IProps = {
  restaurant: Restaurant;
  openRestro: (restaurant: Restaurant, position: Position) => void;
};
const RestroCard = ({ restaurant, openRestro }: IProps) => {
  const { colorMode } = useContext(ThemeContext);
  const restroCardRef = useRef<Animated.View | null>(null);

  /* Custom hook for shared transition animation */
  const [cardAnimationStyle, handleLongPressGesture, handleTapGesture] =
    useCardAnimation(restroCardRef);

  const handleOnGestureEnd = () => {
    restroCardRef.current.measure((x, y, width, height, pageX, pageY) => {
      const position = { x, y, width, height, pageX, pageY };
      openRestro(restaurant, position);
    });
  };
  return (
    <LongPressGestureHandler
      onGestureEvent={handleLongPressGesture}
      shouldCancelWhenOutside
      minDurationMs={50}
      maxDist={1}
      onEnded={handleOnGestureEnd}
    >
      <Animated.View
        ref={restroCardRef}
        style={[
          { backgroundColor: theme[colorMode].cardBackground },
          styles.container,
          cardAnimationStyle,
        ]}
      >
        <TapGestureHandler
          onGestureEvent={handleTapGesture}
          onEnded={handleOnGestureEnd}
        >
          <Animated.View>
            <Image source={restaurant.source} style={styles.image} />
            <Animated.View style={styles.imageOverlay} />
            <Animated.View style={styles.textContainer}>
              <Animated.Text
                style={[{ color: theme.common.heading }, styles.heading]}
              >
                {restaurant.title}
              </Animated.Text>
              <Animated.Text
                style={[{ color: theme.common.subHeading }, styles.body]}
              >
                {restaurant.subtitle}
              </Animated.Text>
            </Animated.View>
          </Animated.View>
        </TapGestureHandler>
      </Animated.View>
    </LongPressGestureHandler>
  );
};
export default RestroCard;

const styles = StyleSheet.create({
  touchable: {
    position: 'relative',
  },
  container: {
    height: 400,
    borderRadius: 20,
    width: '100%',
    marginBottom: 50,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  imageOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  textContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 14,
    fontWeight: '700',
  },
});
