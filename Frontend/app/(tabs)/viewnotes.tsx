import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const ViewNotes = () => {
    const handleNotesFetch = async () => {
        const token = await AsyncStorage.getItem('token')
        const response = await axios.get('https://9992-49-43-33-39.ngrok-free.app/notes/readNotes', {
            headers: {
                "authorization": token
            }
        })
        console.log(response.data)
    }
    useEffect(()=>{
        handleNotesFetch()
    },[])
    return (
    <View>
        <Text>View Notes</Text>
    </View>
  )
}

export default ViewNotes