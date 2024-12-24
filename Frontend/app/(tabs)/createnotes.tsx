import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Alert, KeyboardAvoidingView, ScrollView, Button } from 'react-native';
import CustomButton from '@/components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';

const CreateNotes = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [userToken, setToken] = useState<string | null>('');

    const fetchtoken = async () => {
        const token = await AsyncStorage.getItem('token');
        console.log(token);
        if (token == null) {
            router.replace('/sign-in');
        }
        setToken(token || '');
    };

    useEffect(() => {
        fetchtoken();
    }, []);

    const handleSaveNote = async () => {
        if (!title || !content) {
            Alert.alert('Error', 'Both fields are required!');
            return;
        }
        const response = await axios.post(
            'https://9992-49-43-33-39.ngrok-free.app/notes/createNotes',
            {
                title,
                content,
                tags,
            },
            {
                headers: {
                    authorization: userToken,
                },
            }
        );
        console.log(response.data);
        Alert.alert('Success', 'Note saved successfully!');
        console.log({ title, content });
        setTitle('');
        setContent('');
    };

    return (
        <KeyboardAvoidingView className="flex-1 bg-[#f0faff] px-6 pt-8" behavior="padding">
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                {/* Header */}
                <Text className="text-4xl font-extrabold text-black mb-6 font-pbold text-center shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                    Create a New Note
                </Text>

                {/* Title Input */}
                <TextInput
                    className="w-full bg-white border-4 border-black rounded-lg p-4 mb-4 shadow-[4px_4px_0px_rgba(0,0,0,1)] text-black font-bold text-base"
                    placeholder="Note Title"
                    placeholderTextColor="#9CA3AF"
                    value={title}
                    onChangeText={setTitle}
                />

                {/* Content Input */}
                <TextInput
                    className="w-full bg-white border-4 border-black rounded-lg p-4 mb-6 shadow-[4px_4px_0px_rgba(0,0,0,1)] text-black font-bold text-base"
                    placeholder="Write your note here..."
                    placeholderTextColor="#9CA3AF"
                    multiline
                    numberOfLines={6}
                    textAlignVertical="top"
                    value={content}
                    onChangeText={setContent}
                />

                {/* Tags Input */}
                <TextInput
                    className="w-full bg-white border-4 border-black rounded-lg p-4 mb-6 shadow-[4px_4px_0px_rgba(0,0,0,1)] text-black font-bold text-base"
                    placeholder="Add a Tag"
                    placeholderTextColor="#9CA3AF"
                    value={tags}
                    onChangeText={setTags}
                />

                {/* Save Button */}
                <CustomButton
                    title="Save Note"
                    handlepress={handleSaveNote}
                    containerStyles="w-full bg-[#ffcc00] py-4 rounded-lg border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                    textStyles="text-black font-extrabold text-lg uppercase"
                    isLoading={false}
                />
                <Button title="View Notes" onPress={() => {AsyncStorage.removeItem('token')}} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default CreateNotes;
