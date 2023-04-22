import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card, Icon } from '@rneui/themed';
import { ListItem } from 'react-native-elements';
import { ScrollView, FlatList } from 'react-native';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { postFavorito } from '../redux/ActionCreators';


const mapStateToProps = state => { 
    return {
        excursiones: state.excursiones, 
        comentarios: state.comentarios,
        favoritos: state.favoritos   
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorito: (excursionId) => dispatch(postFavorito(excursionId))
    })

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
      
        marcarFavorito(excursionId) {
            this.props.postFavorito(excursionId);
        }

        render(){
            const {excursionId} = this.props.route.params;
            return(
                <ScrollView>
                    <RenderExcursion excursion={this.props.excursiones.excursiones[+excursionId]} 
                    favorita={this.props.favoritos.favoritos.some(el => el === excursionId)}
                    onPress={() => this.marcarFavorito(excursionId)} />
                    <SeccionComentarios comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}/>
                </ScrollView>
            );
        }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);