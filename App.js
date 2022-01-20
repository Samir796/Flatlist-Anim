import React, {useRef} from 'react';
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Easing,
  SafeAreaViewBase,
  SafeAreaView,
} from 'react-native';
const {width, height} = Dimensions.get('screen');

const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    image:
      'https://avatars.mds.yandex.net/i?id=d7e415a4599462bab42c434a05a72762-5578507-images-thumbs&n=13',
    name: 'Heyderov Murad',
    jobTitle: 'Marketing manager',
    email: 'S@gmail.com',
  };
});

const BG_IMG =
  'https://cdn.steemitimages.com/DQmPyV1J9QQGTdPPLLg1wsA56UkmPxcPgSxZznA1H4YkFxs/Amazing%20Abstract%203D%20background%201366%20x%20768%20HDTV.jpeg';

const SPACING = 20;
const AVATAR_SIZE = 70;

export default () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef();

  const renderView = (item, index) => {
    console.log('index>>>', index);
    const inputRange = [
      (index - 1) * height,
      index * height,
      (index + 1) * height,
    ];

    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [0.6, 1, 0.6],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={{
          flexDirection: 'row',
          padding: SPACING,
          marginBottom: SPACING,
          backgroundColor: 'rgba(255,255,255,0.8)',
          borderRadius: 12,
          borderWidth: 1,
          // transform: [{opacity}],
          opacity,
        }}>
        <Image
          source={{uri: item.image}}
          style={{
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
            borderRadius: AVATAR_SIZE,
            marginRight: SPACING / 2,
          }}
        />
        <View>
          <Text style={{fontSize: 22, fontWeight: '700'}}>{item.name}</Text>
          <Text style={{fontSize: 18, opacity: 0.7, fontWeight: '500'}}>
            {item.jobTitle}
          </Text>
          <Text style={{fontSize: 14, opacity: 0.8, color: '#0099cc'}}>
            {item.email}
          </Text>
        </View>
      </Animated.View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Image
        source={{uri: BG_IMG}}
        style={StyleSheet.absoluteFillObject}
        blurRadius={10}
      />
      <Animated.FlatList
        ref={flatListRef}
        data={DATA}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        contentContainerStyle={{
          padding: SPACING,
        }}
        scrollEventThrottle={32}
        keyExtractor={item => item.key}
        renderItem={({item, index}) => renderView(item, index)}
      />
    </View>
  );
};
