import React, { Component } from 'react';
import { ListItem, Avatar } from '@rneui/themed';
import { SafeAreaView, FlatList } from 'react-native';
import { baseUrl } from '../comun/comun';
import axios from 'axios';


class Calendario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            excursiones: '',
        };

        const request = axios.get(baseUrl+'excursiones');

        axios.all([request])
            .then(axios.spread((response) => {
                this.setState({
                    excursiones: response.data,
                });
            }))
            .catch(error => {
                console.log(error);
            });
    }

    render(){

    const { navigate } = this.props.navigation;    

    const renderCalendarioItem = ({item, index}) => {
        return (
            <ListItem
            key={index}
            onPress={() => navigate('DetalleExcursion', { excursionId: item.id })}
            bottomDivider>
                
                <Avatar source={{ uri: baseUrl + item.imagen }} />
                <ListItem.Content>
                    <ListItem.Title>{item.nombre}</ListItem.Title>
                    <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem> 
        );
    };

    return (
        <SafeAreaView>
            <FlatList 
                data={this.state.excursiones}
                renderItem={renderCalendarioItem}
                keyExtractor={item => item.id.toString()}
            />
        </SafeAreaView>
    );
    }
}

export default Calendario;
