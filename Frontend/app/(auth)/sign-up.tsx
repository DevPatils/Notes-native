import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    if (!username || !email || !password) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }
    Alert.alert('Success', 'Signup successful!');
    console.log({ username, email, password });
  };

  return (
    <View className="flex-1 bg-green-300 justify-center items-center px-5">
      {/* Header */}
      <Text className="text-4xl font-bold text-black mb-6 font-pbold">Sign Up</Text>

      {/* Username Input */}
      <TextInput
        className="w-80 border-black border-2 p-3 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#FFA6F6] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] mb-4"
        placeholder="Username"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
      />

      {/* Email Input */}
      <TextInput
        className="w-80 border-black border-2 p-3 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#FFA6F6] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] mb-4"
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <TextInput
        className="w-80 border-black border-2 p-3 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#FFA6F6] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] mb-6"
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Signup Button */}
      <TouchableOpacity
        className="w-80 bg-green-500 py-4 rounded-md items-center border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
        onPress={handleSignup}
      >
        <Text className="text-white font-bold text-lg uppercase">Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;
