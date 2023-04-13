import React, { Component } from 'react';
import Constants from 'expo-constants';
import Calendario from './CalendarioComponent';
import DetalleExcursion from './DetalleExcursionComponent';
import Contacto from './Contacto';
import QuienesSomos from './QuienesSomos';
import { View, StyleSheet, Image, Text } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import Home from './HomeComponent';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Icon } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function HomeNavegador({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{
            headerMode: 'screen',
            headerTintColor: '#fff',
            headerStyle: { backgroundColor: '#015afc' }, headerTitleStyle: { color: '#fff' },
            headerLeft: () => (<Icon name="menu" size={28} color= 'white' onPress={ () => navigation.dispatch(DrawerActions.toggleDrawer()) }/>)
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

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
                <View style={styles.drawerHeader}>
                    <View style={{ flex: 1 }}>
                        <Image source={require('./imagenes/logo.png')} style={styles.drawerImage} />
                    </View>
                    <View style={{ flex: 2 }}>
                        <Text style={styles.drawerHeaderText}> Gaztaroa</Text>
                    </View>
                </View>
                <DrawerItemList {...props} />
            </SafeAreaView>
        </DrawerContentScrollView>);
}

function DrawerNavegador() {
    return (
        <Drawer.Navigator 
        initialRouteName=" Home" 
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
            headerShown: false,
            drawerStyle: {
                backgroundColor: '#c2d3da',
            },
        }} 
        >
            <Drawer.Screen name="Campo base" component={HomeNavegador} 
                options={{
                    drawerIcon: ({ tintColor}) => (
                      <Icon
                      name='home'
                      type='font-awesome'
                      size={24}
                      color={tintColor}
                      />
                    )
                }}
            />
            <Drawer.Screen name="Quienes somos" component={QuienesSomosNavegador} 
                options={{
                    drawerIcon: ({ tintColor}) => (
                    <Icon
                    name='info-circle'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                    />
                    )
                }}
            />
            <Drawer.Screen name="Calendario " component={CalendarioNavegador} 
                options={{
                    drawerIcon: ({ tintColor}) => (
                    <Icon
                    name='calendar'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                    />
                    )
                }}
            />
            <Drawer.Screen name="Contacto " component={ContactoNavegador} 
                options={{
                    drawerIcon: ({ tintColor}) => (
                    <Icon
                    name='address-card'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                    />
                    )
                }}
            />


        </Drawer.Navigator>
    );
}


function CalendarioNavegador({ navigation }) {
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
                headerLeft: () => (<Icon name="menu" size={28} color= 'white' onPress={ () => navigation.dispatch(DrawerActions.toggleDrawer()) }/>)
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

function ContactoNavegador({ navigation }) {
  return (
    <Stack.Navigator
        initialRouteName="Contacto"
        headerMode="float"
        screenOptions={{
            headerTintColor: '#fff',
            headerStyle: { backgroundColor: '#015afc' },
            headerTitleStyle: { color: '#fff' },
            headerLeft: () => (<Icon name="menu" size={28} color= 'white' onPress={ () => navigation.dispatch(DrawerActions.toggleDrawer()) }/>)
        }}
    >
        <Stack.Screen
            name="contacto"
            component={Contacto}
            options={{
                title: 'Contacto',
            }}
        />
    </Stack.Navigator>
  );
}

function QuienesSomosNavegador({ navigation }) {
  return (
    <Stack.Navigator
        initialRouteName="QuienesSomos"
        headerMode="float"
        screenOptions={{
            headerTintColor: '#fff',
            headerStyle: { backgroundColor: '#015afc' },
            headerTitleStyle: { color: '#fff' },
            headerLeft: () => (<Icon name="menu" size={28} color= 'white' onPress={ () => navigation.dispatch(DrawerActions.toggleDrawer()) }/>)
        }}
    >
        <Stack.Screen
            name="QuienesSomos"
            component={QuienesSomos}
            options={{
                title: 'Quiénes somos',
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


const styles = StyleSheet.create({ container: {
    flex: 1, },
    drawerHeader: { backgroundColor: '#015afc',
    height: 100,
    alignItems: 'center', justifyContent: 'center', flex: 1,
    flexDirection: 'row'
    },
    drawerHeaderText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold'
    },
    drawerImage: {
      margin: 10,
      width: 80,
    height: 60 }
});

export default Campobase;