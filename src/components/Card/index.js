import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';

//
const perspective = 450;
const z = 0;
//

const {height: wHeight, width} = Dimensions.get('window');
const MARGIN = 50;
const height = wHeight - 64;

const ratio = 228 / 362;
export const CARD_WIDTH = width * 0.8;
export const ORIGINAL_CARD_HEIGHT = CARD_WIDTH * ratio;
const CARD_HEIGHT = ORIGINAL_CARD_HEIGHT - MARGIN;

const Card = ({item: cardData, y, index}) => {
  const position = Animated.subtract(index * CARD_HEIGHT, y);
  const isDisappearing = -CARD_HEIGHT;
  const isTop = 0;
  const isBottom = height - CARD_HEIGHT;
  const isAppearing = height;

  const translateY = Animated.add(
    y,
    y.interpolate({
      inputRange: [0, 0.000001 + index * CARD_HEIGHT],
      outputRange: [0, -index * CARD_HEIGHT],
      extrapolateRight: 'clamp',
    }),
  );
  const scale = position.interpolate({
    inputRange: [isDisappearing, isTop],
    outputRange: [0.6, 1],
    extrapolate: 'clamp',
  });
  const rotateX = position.interpolate({
    inputRange: [isTop, isBottom],
    outputRange: ['0deg', '-90deg'],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        {
          transform: [
            //
            {translateY},
            {perspective},
            {rotateX},
            {scale},
          ],
        },
      ]}>
      {cardData.title ? (
        <ImageBackground
          source={{
            uri: cardData.imageURL,
          }}
          style={styles.image}>
          <Text style={styles.text}>{cardData.title}</Text>
        </ImageBackground>
      ) : (
        <View style={{height: 0, opacity: 0}} />
      )}
    </Animated.View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    // backgroundColor: '#FFF',
    height: ORIGINAL_CARD_HEIGHT,
    // margin: 4,
    borderRadius: 20,
    marginBottom: -MARGIN,
    resizeMode: 'cover',
    shadowColor: '#000',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#FFF',
  },
  text: {
    color: '#FFF',
    padding: 24,
    fontSize: 24,
    fontWeight: 'bold',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});

function traslateZ(value) {
  return perspective / (perspective - value);
}
