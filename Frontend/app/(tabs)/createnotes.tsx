import React, { useState } from 'react';
import { View, Text, TextInput, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import CustomButton from '@/components/CustomButton';

const CreateNotes = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSaveNote = () => {
    if (!title || !content) {
      Alert.alert('Error', 'Both fields are required!');
      return;
    }
    Alert.alert('Success', 'Note saved successfully!');
    console.log({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <KeyboardAvoidingView className="flex-1 bg-[#F3F4F6] px-6 pt-8" behavior="padding">
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Header */}
        <Text className="text-3xl font-bold text-[#4B5563] mb-6 font-pbold text-center">
          Create a New Note
        </Text>

        {/* Title Input */}
        <TextInput
          className="w-full bg-white border border-[#D1D5DB] rounded-lg p-4 mb-4 shadow-md text-[#1F2937] font-medium text-base"
          placeholder="Note Title"
          placeholderTextColor="#9CA3AF"
          value={title}
          onChangeText={setTitle}
        />

        {/* Content Input */}
        <TextInput
          className="w-full bg-white border border-[#D1D5DB] rounded-lg p-4 mb-6 shadow-md text-[#1F2937] font-medium text-base"
          placeholder="Write your note here..."
          placeholderTextColor="#9CA3AF"
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          value={content}
          onChangeText={setContent}
        />

        {/* Save Button */}
        <CustomButton
          title="Save Note"
          handlepress={handleSaveNote}
          containerStyles="w-full bg-[#4CAF50] py-4 rounded-lg border-2 border-[#4B5563] shadow-lg"
          textStyles="text-white font-bold text-lg"
          isLoading={false}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateNotes;
