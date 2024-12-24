import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Note {
    _id: string;
    title: string;
    content: string;
    category?: string;
    date: string;
}

const ViewNotes = () => {
    const [notes, setNotes] = useState<Note[]>([]);

    const handleNotesFetch = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get('https://9992-49-43-33-39.ngrok-free.app/notes/readNotes', {
                headers: {
                    authorization: token,
                },
            });
            console.log(response.data);
            setNotes(response.data.notes || []);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    useEffect(() => {
        handleNotesFetch();
    }, []);

    return (
        <SafeAreaView className="bg-blue-300 h-full">
            <ScrollView className="flex-1 bg-[#f0faff] p-6">
                {/* Header */}
                <Text className="text-4xl font-extrabold text-black mb-6 font-plight text-center shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                    Your Notes
                </Text>

                {/* Notes List */}
                {notes.length > 0 ? (
                    notes.map((note) => (
                        <View
                            key={note._id}
                            className="relative w-full bg-[#FFFD82] border-2 border-black rounded-lg p-4 mb-6 shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                            style={{
                                transform: [
                                    { rotate: `${Math.random() * 6 - 3}deg` }, // Slight random rotation for a "scattered" effect
                                ],
                            }}
                        >
                            {/* Sticky Note Pin */}
                            <View
                                className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-4 h-4 bg-[#DC2626] rounded-full border-2 border-black"
                            />
                            <Text className="text-2xl font-bold text-black mb-2">
                                {note.title}
                            </Text>
                            <Text className="text-base font-medium text-gray-800 mb-2">
                                {note.content}
                            </Text>
                            <Text className="text-sm font-medium text-gray-600">
                                Category: {note.category || 'General'}
                            </Text>
                            <Text className="text-sm font-medium text-gray-600">
                                Date: {new Date(note.date).toLocaleDateString()}
                            </Text>
                        </View>
                    ))
                ) : (
                    <Text className="text-lg font-medium text-gray-700 text-center">
                        No notes available. Create a new one!
                    </Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default ViewNotes;
