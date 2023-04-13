import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';
import { Card } from '@rneui/themed';
import axios from 'axios';
import { baseUrl } from '../comun/comun';
import { colorTitulo } from '../comun/comun';


function RenderItem(props) {
    
        const item = props.item;
        
        if (item != null) {
            return(
                <Card>
                    <Card.Title style={styles.title}>{item.nombre}</Card.Title>
                    <Card.Image source={{ uri: baseUrl + item.imagen }}></Card.Image>
                    <Text style={{margin: 20}}>
                        {item.descripcion}
                    </Text>
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
          excursiones: [],
          cabeceras: [],
          actividades: []
        };

        const requestExcursiones = axios.get(baseUrl+'excursiones');
        const requestActividades = axios.get(baseUrl+'actividades');
        const requestCabeceras = axios.get(baseUrl+'cabeceras');


        axios.all([requestExcursiones, requestActividades, requestCabeceras])
            .then(axios.spread((requestExcursiones, requestActividades, requestCabeceras) => {
                this.setState({
                    excursiones: requestExcursiones.data,
                    actividades: requestActividades.data,
                    cabeceras: requestCabeceras.data,
                });
            }))
            .catch(error => {
                console.log(error);
            });
}

    render() {
        
        return(
            <ScrollView>
                <RenderItem item={this.state.cabeceras.filter((cabecera) => cabecera.destacado)[0]} />
                <RenderItem item={this.state.excursiones.filter((excursion) => excursion.destacado)[0]} />
                <RenderItem item={this.state.actividades.filter((actividad) => actividad.destacado)[0]} />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: colorTitulo,
        fontSize: 24,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: 50,
        zIndex: 1
    },
  });

export default Home;