import React, { Component } from 'react';
import Historia from './Historia';
import { ACTIVIDADES } from '../comun/actividades';
import { ScrollView, FlatList } from 'react-native';
import { ListItem, Avatar } from '@rneui/themed';
import { Card } from '@rneui/themed';




class QuienesSomos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actividades: ACTIVIDADES
        };
    }

    render(){
        const renderActividad = ({item, index}) => {
            return (
                <ListItem
                key={index}
                bottomDivider>
                    <Avatar source={require('./imagenes/40Años.png')} />
                    <ListItem.Content>
                        <ListItem.Title>{item.nombre}</ListItem.Title>
                        <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem> 
            );
        };
    
        return(

            <ScrollView>
                <Historia></Historia>
                <Card>
                    <Card.Title>Actividades y recursos</Card.Title>
                    <Card.Divider/>
                    <FlatList scrollEnabled={false}
                        data={this.state.actividades}
                        renderItem={renderActividad}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>
                
            </ScrollView>
        );
        
    }
}

export default QuienesSomos;