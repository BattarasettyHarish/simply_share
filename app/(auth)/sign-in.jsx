import React, { useState } from 'react';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, Dimensions, Image, StyleSheet } from 'react-native';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';

const SignIn = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const submit = () => {
    // if (form.email === "" || form.password === "") {
    //   Alert.alert("Error", "Please fill in all fields");
    //   return;
    // }

    // Navigate to /home after validation
    router.push("/instagram");
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Image
            source={images.logoSmall}
            resizeMode="contain"
            style={styles.logo}
          />

          <Text style={styles.headerText}>
            Log in to Simple Share
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles={styles.formField}
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={styles.formField}
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles={styles.button}
            isLoading={isSubmitting}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don't have an account?
            </Text>
            <Link href="/sign-up" style={styles.link}>
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#FFFFFF', // White background for the whole screen
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
    minHeight: Dimensions.get('window').height - 100,
  },
  logo: {
    width: 135,
    height: 34,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600', 
    color: '#000000', // Black color for text
    marginTop: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#007BFF', 
    borderRadius: 8, 
    paddingVertical: 12, 
    paddingHorizontal: 24, 
    width: '100%', 
    alignItems: 'center', 
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  },
  footerText: {
    fontSize: 18,
    color: '#000000', // Black color for text
  },
  link: {
    fontSize: 16,
    color: '#007BFF', // Blue color for link
    fontWeight: '600',
    marginLeft: 4,
  },
});

export default SignIn;
