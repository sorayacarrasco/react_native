import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import {Rating} from 'react-native-ratings';
import { Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { postComentario } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        comentarios: state.comentarios,
    }
}

const mapDispatchToProps = dispatch => ({
    postComentario: (comentario) => dispatch(postComentario(comentario))
})

const ModalFormComponent = (props) => {
    const visible = props.modalVisible;
    const resetForm = props.resetForm;
    const excursionId = props.excursionId;
    const [rating, setRating] = useState(3);
    const [Autor, setAutor] = useState('');
    const [Texto, setTexto] = useState('');

    const handleSubmit = () => {
        const fecha = new Date().toISOString();
        const comentario = {excursionId: excursionId, valoracion: rating, autor: Autor, comentario: Texto, dia: fecha};
        postComentario(comentario);
        resetForm();
        setRating(3);
        setAutor("");
        setTexto("");
    }

    const handleRatingChange = (newRating) => {
        setRating(newRating);
      };
    
    const handleAutorChange = (text) => {
        setAutor(text);
    };

    const handleTextoChange = (text) => {
        setTexto(text);
    };


    const postComentario = (comentario) => {
        props.postComentario(comentario);
    }

    return(
        <View>
            <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={() => {
                resetForm();
                setRating(3);
                setAutor("");
                setTexto("");
            }}
            >
            <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Rating style={{ marginBottom:50 }}
                type="star"
                ratingCount={5}
                imageSize={40}
                showRating
                onFinishRating={handleRatingChange}
                />

                <Input 
                    placeholder='Autor'
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={handleAutorChange}
                    value={Autor}
                />
                <Input
                    placeholder='Comentario'
                    leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                    onChangeText={handleTextoChange}
                    value={Texto}
                />

                <TouchableOpacity onPress={handleSubmit} style={{marginBottom:30, marginTop:30}}>
                <Text style={{ color: 'blue' }}>ENVIAR</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    resetForm();
                    setRating(3);
                    setAutor("");
                    setTexto("");
                }}>
                <Text style={{ color: 'red' }}>CANCELAR</Text>
                </TouchableOpacity>
            </SafeAreaView>
            </Modal>
        </View>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalFormComponent);