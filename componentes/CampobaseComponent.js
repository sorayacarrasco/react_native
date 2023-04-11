import React, { Component } from 'react';
import Constants from 'expo-constants';
import Calendario from './CalendarioComponent';
import DetalleExcursion from './DetalleExcursionComponent';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './HomeComponent';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function HomeNavegador() {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{
            headerMode: 'screen',
            headerTintColor: '#fff',
            headerStyle: { backgroundColor: '#015afc' }, headerTitleStyle: { color: '#fff' },
        }} >
            <Stack.Screen
                name="Etxea"
                component={Home}
                options={{
                    title: 'Campo Base',
                }}
            />
        </Stack.Navigator>
    );
}

function DrawerNavegador() {
    return (
        <Drawer.Navigator initialRouteName=" Drawer" screenOptions={{
            headerShown: false,
            drawerStyle: {
                backgroundColor: '#c2d3da',
            },
        }} >
            <Drawer.Screen name="Home" component={HomeNavegador} />
            <Drawer.Screen name="Calendario" component={CalendarioNavegador} />
        </Drawer.Navigator>
    );
}


function CalendarioNavegador() {
  return (
    <Stack.Navigator
        initialRouteName="Calendario"
        headerMode="float"
        screenOptions={{
            headerTintColor: '#fff',
            headerStyle: { backgroundColor: '#015afc' },
            headerTitleStyle: { color: '#fff' },
        }}
    >
        <Stack.Screen
            name="Calendario"
            component={Calendario}
            options={{
                title: 'Calendario Gaztaroa',
            }}
        />
        <Stack.Screen
            name="DetalleExcursion"
            component={DetalleExcursion}
            options={{
                title: 'Detalle Excursión',
            }}
        />
    </Stack.Navigator>
  );
}

class Campobase extends Component {
render() {
    return (
        <NavigationContainer>
            <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
                <DrawerNavegador />
            </View>
        </NavigationContainer>
    );
  }
}

export default Campobase;