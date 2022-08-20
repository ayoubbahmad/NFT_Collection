/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  Animated,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Card from './src/components/Card';
import {fakeData} from './constants';
import LinearGradient from 'react-native-linear-gradient';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const App: () => Node = () => {
  const y = new Animated.Value(0);
  const onScroll = Animated.event([{nativeEvent: {contentOffset: {y}}}], {
    useNativeDriver: true,
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.header} />
        <View style={{flex: 1}}>
          <AnimatedFlatList
            data={fakeData}
            contentContainerStyle={styles.contentContainer}
            renderItem={({item, index}) => <Card {...{item, index, y}} />}
            keyExtractor={(item, index) => (item.imageURL || index).toString()}
            scrollEventThrottle={16}
            bounces={false}
            {...{onScroll}}
            showsVerticalScrollIndicator={false}
            style={{height: 100}}
          />
          <LinearGradient
            colors={['#283142', 'transparent']}
            // locations={[]}
            end={{x: 0, y: 0}}
            start={{x: 0, y: 1}}
            style={styles.linearGradient}
            pointerEvents="none"
          />
        </View>
        <View style={styles.footer} />
      </SafeAreaView>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#283142',
    flex: 1,
  },
  header: {height: 200},
  contentContainer: {paddingHorizontal: 20},
  footer: {height: 200},
  linearGradient: {
    flex: 1,
    position: 'absolute',
    height: 200,
    bottom: 0,
    width: '100%',
  },
});
