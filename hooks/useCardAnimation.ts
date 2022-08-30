import Animated, {
  OnGestureEvent,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  LongPressGestureHandlerGestureEvent,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
export const useCardAnimation = (
  restroCardRef: React.MutableRefObject<Animated.View>
): [
  {
    transform: {
      scale: 1 | 0.9;
    }[];
  },
  OnGestureEvent<LongPressGestureHandlerGestureEvent>,
  OnGestureEvent<TapGestureHandlerGestureEvent>
] => {
  const cardPressed = useSharedValue(0);
  const handleLongPressGesture =
    useAnimatedGestureHandler<LongPressGestureHandlerGestureEvent>({
      onStart: () => {
        cardPressed.value = 1;
      },
      onActive() {
        cardPressed.value = 1;
      },
      onFinish() {
        cardPressed.value = 0;
      },
    });

  const handleTapGesture =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
      onStart: () => {
        cardPressed.value = 1;
      },
      onActive() {
        cardPressed.value = 1;
      },
      onFinish() {
        cardPressed.value = 0;
      },
    });

  const cardAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: cardPressed.value == 1 ? withSpring(0.9) : withSpring(1) },
      ],
    };
  }, [cardPressed]);

  return [cardAnimationStyle, handleLongPressGesture, handleTapGesture];
};
