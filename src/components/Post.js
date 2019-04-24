/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Dimensions
} from 'react-native';
import InputComentario from './../components/InputComentario';
import Likes from './Likes';

const screenWidth = Dimensions.get('screen').width;

export default class Post extends Component {

    carregaIcone(likeada) {
        return likeada ? require('../../resources/img/s2-checked.png') : require('../../resources/img/s2.png');
    }

    exibeLikers(likers) {
        return (
            <Text style={styles.likes}>
                {likers.length} {likers.length > 1 ? 'curtidas' : 'curtida'}
            </Text>
        );
    }

    exibeComentario(foto) {
        if (foto.comentario) {
            return (
                <View style={styles.comentario}>
                    <Text style={styles.tituloComentario}>{foto.loginUsuario}</Text>
                    <Text>{foto.comentario}</Text>
                </View>
            )
        }
    }

    render() {
        const { likeCallback, foto, aoComentarCallback } = this.props;
        return (
            <View>
                <View style={styles.cabecalho}>
                    <Image source={{ uri: foto.urlPerfil }} style={styles.fotoPerfil}></Image>
                    <Text style={styles.white}>{foto.loginUsuario}</Text>
                </View>
                <Image source={{ uri: foto.urlFoto }} style={styles.foto}></Image>
                <View style={styles.rodape}>

                    <Likes likeCallback={likeCallback} foto={foto}></Likes>

                    {this.exibeComentario(foto)}

                    {foto.comentarios.map(comentario =>
                        <View key={comentario.id} style={styles.comentario}>
                            <Text style={styles.tituloComentario}>{comentario.login}</Text>
                            <Text>{comentario.texto}</Text>
                        </View>
                    )}

                    <InputComentario aoComentarCallback={aoComentarCallback} fotoId={foto.id}></InputComentario>

                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    white: {
        color: 'black'
    },
    cabecalho: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    fotoPerfil: {
        borderRadius: 50,
        margin: 10,
        width: 40,
        height: 40
    },
    foto: {
        width: screenWidth,
        height: screenWidth
    },
    botaoDeLike: {
        height: 40,
        width: 40,
        marginBottom: 10
    },
    rodape: {
        margin: 10
    },
    likes: {
        fontWeight: 'bold'
    },
    comentario: {
        flexDirection: 'row'
    },
    tituloComentario: {
        fontWeight: 'bold',
        marginRight: 5

    },
    input: {
        flex: 1,
        height: 40
    },
    icone: {
        height: 30,
        width: 30
    },
    novoComentario: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        alignItems: 'center'
    }
});