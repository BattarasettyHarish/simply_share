import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { router } from "expo-router";
import { onboardingSwiperData } from "../constants/constants";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

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
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.description}>{item.sortDescrition}</Text>
        {item.sortDescrition2 && (
          <Text style={styles.description}>{item.sortDescrition2}</Text>
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
        <View style={styles.nextButton}>
          <Text style={styles.buttonText}>Next</Text>
        </View>
      )}
      renderDoneButton={() => (
        <View style={styles.doneButton}>
          <Text style={styles.buttonText}>Get Started</Text>
        </View>
      )}
      renderSkipButton={() => (
        <View style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </View>
      )}
      showSkipButton={false}
      dotStyle={styles.dotStyle}
      activeDotStyle={styles.activeDotStyle}
      bottomButton={true}
    />
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: hp("10%"),
    paddingHorizontal: wp("5%"),
  },
  image: {
    width: wp("80%"),
    height: hp("30%"),
    marginBottom: hp("5%"),
    resizeMode: "contain",
  },
  title: {
    fontSize: wp("6%"),
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: hp("2%"),
  },
  descriptionContainer: {
    marginTop: hp("2%"),
    paddingHorizontal: wp("5%"),
  },
  description: {
    fontSize: wp("4.5%"),
    textAlign: "center",
    color: "#666",
  },
  nextButton: {
    backgroundColor: "#2467EC",
    width: wp("90%"),
    height: hp("7%"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp("2%"),
  },
  doneButton: {
    backgroundColor: "#2467EC",
    width: wp("90%"),
    height: hp("7%"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp("2%"),
  },
  buttonText: {
    color: "white",
    fontSize: wp("5%"),
    textAlign: "center",
  },
  skipButton: {
    width: wp("90%"),
    height: hp("7%"),
    justifyContent: "center",
    alignItems: "center",
  },
  skipText: {
    color: "#000",
    fontSize: wp("4.5%"),
    textAlign: "center",
  },
  dotStyle: {
    backgroundColor: "#C6C7CC",
    width: wp("3%"),
    height: wp("3%"),
    borderRadius: wp("1.5%"),
    marginHorizontal: wp("1%"),
  },
  activeDotStyle: {
    backgroundColor: "#2467EC",
    width: wp("3%"),
    height: wp("3%"),
    borderRadius: wp("1.5%"),
    marginHorizontal: wp("1%"),
  },
});
