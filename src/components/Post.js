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
    Dimensions,
    TouchableOpacity,
    TextInput
} from 'react-native';

const screenWidth = Dimensions.get('screen').width;

export default class Post extends Component {

    constructor(props) {
        super(props)
        this.state = {
            foto: { ...this.props.foto, likers: [{}] },
            valorComentario: ''
        }
    }

    carregaIcone(likeada) {
        return likeada ? require('../../resources/img/s2-checked.png') : require('../../resources/img/s2.png');
    }

    like() {
        const { foto } = this.state;
        const meuUsuario = 'Matheus Cruz';
        let novaLista = [];
        if (!foto.likeada) {
            novaLista = [
                ...foto.likers,
                { login: meuUsuario }
            ];
        } else {
            novaLista = foto.likers.filter(liker => {
                return liker.login !== meuUsuario;
            });
        }

        const fotoAtualizada = {
            ...foto,
            likeada: !foto.likeada,
            likers: novaLista
        }
        this.setState({ foto: fotoAtualizada });
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

    adicionaComentario() {
        if (this.state.valorComentario === '') {
            return;
        }

        const meuUsuario = 'Matheus Cruz';

        const novaListaDeComentario = [
            ...this.state.foto.comentarios,
            {
                id: this.state.valorComentario,
                login: meuUsuario,
                texto: this.state.valorComentario
            }
        ];

        const fotoAtualizada = {
            ...this.state.foto,
            comentarios: novaListaDeComentario
        };

        this.setState({ foto: fotoAtualizada, valorComentario: '' });
        this.inputComentario.clear();
    }

    render() {
        return (
            <View>
                <View style={styles.cabecalho}>
                    <Image source={{ uri: this.state.foto.urlPerfil }} style={styles.fotoPerfil}></Image>
                    <Text style={styles.white}>{this.state.foto.loginUsuario}</Text>
                </View>
                <Image source={{ uri: this.state.foto.urlFoto }} style={styles.foto}></Image>
                <View style={styles.rodape}>
                    <TouchableOpacity style={{ margin: 0, height: 40, width: 40 }} onPress={this.like.bind(this)} >
                        <Image source={this.carregaIcone(this.state.foto.likeada)} style={styles.botaoDeLike}>
                        </Image>
                    </TouchableOpacity>
                    {this.exibeLikers(this.state.foto.likers)}
                    {this.exibeComentario(this.state.foto)}
                    {this.state.foto.comentarios.map(comentario =>
                        <View key={comentario.id} style={styles.comentario}>
                            <Text style={styles.tituloComentario}>{comentario.login}</Text>
                            <Text>{comentario.texto}</Text>
                        </View>
                    )}
                    <View style={styles.novoComentario}>
                        <TextInput
                            ref={ref => this.inputComentario = ref}
                            style={styles.input}
                            placeholder="Adicione um comentário"
                            underlineColorAndroid="transparent"
                            onChangeText={texto => this.setState({ valorComentario: texto })}></TextInput>
                        <TouchableOpacity onPress={this.adicionaComentario.bind(this)}>
                            <Image source={require('../../resources/img/send.png')} style={styles.icone}></Image>
                        </TouchableOpacity>
                    </View>
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