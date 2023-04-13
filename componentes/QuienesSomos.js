import React, { Component } from 'react';
import Historia from './Historia';
import { ScrollView, FlatList } from 'react-native';
import { ListItem, Avatar } from '@rneui/themed';
import { Card } from '@rneui/themed';
import { baseUrl } from '../comun/comun';
import axios from 'axios';


class QuienesSomos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actividades: ''
        };

        const request = axios.get(baseUrl+'actividades');

        axios.all([request])
            .then(axios.spread((response) => {
                this.setState({
                    actividades: response.data,
                });
            }))
            .catch(error => {
                console.log(error);
            });

    }

    render(){
        const renderActividad = ({item, index}) => {
            return (
                <ListItem
                key={index}
                bottomDivider>
                    <Avatar source={{ uri: baseUrl + item.imagen }} />
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