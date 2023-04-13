import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card, Icon } from '@rneui/themed';
import { ListItem } from 'react-native-elements';
import { ScrollView, FlatList } from 'react-native';
import axios from 'axios';
import { baseUrl } from '../comun/comun';

function RenderExcursion(props) {

    const excursion = props.excursion;
    
        if (excursion != null) {
            return(
            <Card>
              <Card.Title>{excursion.nombre}</Card.Title>
              <Card.Divider/>
              <Card.Image source={{uri: baseUrl + excursion.imagen}}></Card.Image>
              <Text style={{margin: 20}}>
                {excursion.descripcion}
              </Text>
              <Icon 
                raised
                reverse
                name={ props.favorita ? 'heart' : 'heart-o'} type='font-awesome'color='#f50'onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()} 
            />
            </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

function SeccionComentarios(props){
    const comentarios = props.comentarios;

    const renderComentario = ({item,index}) => {
        return(
            <ListItem
            key = {index}
            bottomDivider>
                <ListItem.Content>
                    <ListItem.Subtitle>
                        {item.comentario}
                    </ListItem.Subtitle>
                    <Text>{item.valoracion} Stars
                    {"\n"}{"\n"}
                    -- {item.autor}, {item.dia}</Text>
                </ListItem.Content>
            </ListItem>
        );
    }

    return(
        <Card>
            <Card.Title>Comentarios</Card.Title>
            <Card.Divider/>
            <FlatList scrollEnabled={false}
                data = {comentarios}
                renderItem={renderComentario}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

class DetalleExcursion extends Component {
        constructor(props) {
            super(props);
            this.state = {
                excursiones: [],
                comentarios: [],
                favoritos: []
            };

            const requestExcursiones = axios.get(baseUrl+'excursiones');
            const requestComentarios = axios.get(baseUrl+'comentarios');

            axios.all([requestExcursiones, requestComentarios])
                .then(axios.spread((requestExcursiones, requestComentarios) => {
                    this.setState({
                        excursiones: requestExcursiones.data,
                        comentarios: requestComentarios.data,
                        favoritos: [],
                    });
                }))
                .catch(error => {
                    console.log(error);
                });

        }
      
        marcarFavorito(excursionId) {
            this.setState({favoritos: this.state.favoritos.concat(excursionId)});
        }

        render(){
            const {excursionId} = this.props.route.params;
            return(
                <ScrollView>
                    <RenderExcursion excursion={this.state.excursiones[+excursionId]} favorita={this.state.favoritos.some(el => el === excursionId)}
                    onPress={() => this.marcarFavorito(excursionId)} />
                    <SeccionComentarios comentarios={this.state.comentarios.filter((comentario) => comentario.excursionId === excursionId)}/>
                </ScrollView>
            );
        }
}

export default DetalleExcursion;
