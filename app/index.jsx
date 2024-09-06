import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { router } from "expo-router";
import { onboardingSwiperData } from "../constants/constants";

export default function WelcomeIntroScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = React.useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex =
        currentIndex === onboardingSwiperData.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(nextIndex);

      if (sliderRef.current) {
        sliderRef.current.goToSlide(nextIndex);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderItem = ({ item }) => (
    <View className="flex-1 justify-center items-center mt-20 px-4">
      <Image source={item.image} className="mb-8 self-center" />
      <Text className="text-xl font-bold text-center">{item.title}</Text>
      <View className="mt-4">
        <Text className="text-lg text-gray-600 text-center">{item.description}</Text>
        <Text className="text-lg text-gray-600 text-center">{item.sortDescrition}</Text>
        {item.sortDescrition2 && (
          <Text className="text-lg text-gray-600 text-center">{item.sortDescrition2}</Text>
        )}
      </View>
    </View>
  );

  return (
    <AppIntroSlider
      ref={sliderRef}
      renderItem={renderItem}
      data={onboardingSwiperData}
      onDone={() => {
        router.push("/sign-in");
      }}
      onSkip={() => {
        router.push("/sign-in");
      }}
      renderNextButton={() => (
        <View className="bg-blue-600 w-11/12 h-14 self-center justify-center items-center rounded-md">
          <Text className="text-white text-center">Next</Text>
        </View>
      )}
      renderDoneButton={() => (
        <View className="bg-blue-600 w-11/12 h-14 self-center justify-center items-center rounded-md">
          <Text className="text-white text-center">Get Started</Text>
        </View>
      )}
      renderSkipButton={() => (
        <View className="w-11/12 h-14 self-center justify-center items-center">
          <Text className="text-black text-center">Skip</Text>
        </View>
      )}
      showSkipButton={true}
      dotStyle={{ backgroundColor: "#C6C7CC", width: 10, height: 10, borderRadius: 5 }}
      bottomButton={true}
      activeDotStyle={{ backgroundColor: "#2467EC", width: 10, height: 10, borderRadius: 5 }}
    />
  );
}
