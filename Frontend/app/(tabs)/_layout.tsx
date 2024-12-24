import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
// import icons  from '../../constants/icons'
import {bookmark} from '../../assets/icons/bookmark.png'
import {home} from '../../assets/icons/home.png'
import {profile} from '../../assets/icons/profile.png'
const TabIcon = ({ icon, color, name, focused }: any) => {
    return (
        <View className='item-center justify-center gap-2'>
            <Image
                source={icon}
                resizeMode='contain'
                tintColor={color}
                className='w-6 h-6 m-auto mt-8'
            />
            <Text
                className={`w-20 text-center ${focused ? ' font-pmedium' : 'font-pregular'} text-xs text-white`}
            >{name}</Text>
        </View>
    )
}
const TabLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: "#FFA001",
                    tabBarInactiveTintColor: "#cdcdE0",
                    tabBarStyle: {
                        backgroundColor: "#161622",
                        borderTopWidth: 1,
                        borderTopColor: "#232533",
                        height: 84
                    }
                }}>

                <Tabs.Screen name='createnotes'
                    options={{
                        title: "Create Notes",
                        headerShown:false,
                        tabBarIcon:({color,focused})=>(
                            <TabIcon
                            icons={home}
                            color={color}
                            name='Create Notes'
                            />
                        )
                    }}
                />
                <Tabs.Screen name='viewnotes'
                    options={{
                        title: "View Notes",
                        headerShown:false,
                        tabBarIcon:({color,focused})=>(
                            <TabIcon
                            icons={bookmark}
                            color={color}
                            name='View Notes'
                            />
                        )
                    }}
                />
                <Tabs.Screen name='profile'
                    options={{
                        title: "Profile",
                        headerShown:false,
                        tabBarIcon:({color,focused})=>(
                            <TabIcon
                            icons={profile}
                            color={color}
                            name='Profile Page'
                            />
                        )
                    }}
                />
            </Tabs>
        </>
    )
}

export default TabLayout