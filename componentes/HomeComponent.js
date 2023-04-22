import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';
import { Card } from '@rneui/themed';
import { baseUrl } from '../comun/comun';
import { colorTitulo } from '../comun/comun';
import { connect } from 'react-redux';
import { IndicadorActividad } from './IndicadorActividadComponent';

const mapStateToProps = state => { 
    return {
        excursiones: state.excursiones, 
        cabeceras: state.cabeceras,
        actividades: state.actividades   
    }
}

function RenderItem(props) {
        const item = props.item;

        if(props.isLoading){
            return(
                <IndicadorActividad></IndicadorActividad>
            );
        }
        else if(props.errMess){
            return(
                <View>
                    <Text>{ props.errMess }</Text>
                </View>
            );
        }
        else{
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
}

class Home extends Component {

    render() {
        
        return(
            <ScrollView>
                <RenderItem item={this.props.cabeceras.cabeceras.filter((cabecera) => cabecera.destacado)[0]} isLoading={this.props.cabeceras.isLoading} errMess={this.props.cabeceras.errMess} />
                <RenderItem item={this.props.excursiones.excursiones.filter((excursion) => excursion.destacado)[0]} isLoading={this.props.excursiones.isLoading} errMess={this.props.excursiones.errMess} />
                <RenderItem item={this.props.actividades.actividades.filter((actividad) => actividad.destacado)[0]} isLoading={this.props.actividades.isLoading} errMess={this.props.actividades.errMess} />
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

export default connect(mapStateToProps)(Home);