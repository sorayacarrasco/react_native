import React, { Component } from 'react';
import Historia from './Historia';
import { ScrollView, FlatList } from 'react-native';
import { ListItem, Avatar } from '@rneui/themed';
import { Card } from '@rneui/themed';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';

const mapStateToProps = state => { 
    console.log(state.actividades);
    return {
        actividades: state.actividades    
    }
}

class QuienesSomos extends Component {

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
                        data={this.props.actividades.actividades}
                        renderItem={renderActividad}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>
                
            </ScrollView>
        );
        
    }
}

export default connect(mapStateToProps)(QuienesSomos);