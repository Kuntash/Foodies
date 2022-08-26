import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  ImageSourcePropType,
  SafeAreaView,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { MotiView } from 'moti';
import Animated from 'react-native-reanimated';
import { theme } from '../theme';
import { ThemeContext } from '../contexts/ThemeProvider';
import RestroCard from '../components/RestroCard';
import { Position, Restaurant, RestroModalProp } from '../types';
import { format } from 'date-fns';
import RestroModal from '../components/RestroModal';
import { restaurants } from '../dummy-data';

const HomeScreen = () => {
  const { colorMode } = useContext(ThemeContext);
  const [modal, setModal] = useState<RestroModalProp | null>(null);

  const openRestro = (restaurant: Restaurant, position: Position) => {
    setModal({ restaurant, position });
  };

  const closeRestro = () => {
    setModal(null);
  };
  return (
    <>
      <Animated.View
        style={{ backgroundColor: theme[colorMode].pageBackground, flex: 1 }}
      >
        <SafeAreaView />

        <Animated.ScrollView
          style={{ padding: 20 }}
          contentContainerStyle={styles.scrollContainer}
        >
          <Animated.Text
            style={[
              {
                color: theme[colorMode].body,
                textTransform: 'uppercase',
                fontSize: 14,
                fontWeight: '700',
                alignSelf: 'flex-start',
              },
            ]}
          >
            {format(new Date(), 'EEEE dd MMMM')}
          </Animated.Text>
          <Animated.Text
            style={[
              {
                color: theme[colorMode].heading,
                fontSize: 36,
                fontWeight: '800',
                alignSelf: 'flex-start',
                marginBottom: 20,
              },
            ]}
          >
            Today
          </Animated.Text>
          {restaurants.map((restaurant, index) => (
            <RestroCard
              key={restaurant.id}
              restaurant={restaurant}
              openRestro={openRestro}
            />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      {modal !== null && <RestroModal {...modal} closeRestro={closeRestro} />}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: 'center',
    width: '100%',
  },
});
