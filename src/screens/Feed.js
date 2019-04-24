import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions
} from 'react-native';
import Post from './../components/Post';

const screenWidth = Dimensions.get('screen').width;

export default class Feed extends Component {
  constructor() {
    super();
    this.state = {
      fotos: []
    }
  }

  buscarFotoPorId(id) {
    return this.state.fotos.find(foto => foto.id === id);
  }

  listaDeFotosAtualizada(fotoAtualizada) {
    return this.state.fotos.map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto);
  }

  adicionaComentario(valorComentario, inputComentario, fotoId) {

    const foto = this.buscarFotoPorId(fotoId);
    if (valorComentario === '') {
      return;
    }

    const meuUsuario = 'Matheus Cruz';

    const novaListaDeComentarios = [
      ...foto.comentarios,
      {
        id: valorComentario,
        login: meuUsuario,
        texto: valorComentario
      }
    ];

    const fotoAtualizada = {
      ...foto,
      comentarios: novaListaDeComentarios
    };

    const fotos = this.listaDeFotosAtualizada(fotoAtualizada);
    this.setState({ fotos }); 
    inputComentario.clear();
  }

  like(fotoId) {

    const foto = this.buscarFotoPorId(fotoId);

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

    const fotos = this.listaDeFotosAtualizada(fotoAtualizada);
    this.setState({ fotos });
  }

  componentDidMount() {
    fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
      .then(response => response.json())
      .then(json => this.setState({ fotos: json }));
  }

  render() {

    return (
      < ScrollView style={styles.container}>
        <FlatList
          data={this.state.fotos}
          keyExtractor={item => item.id}
          renderItem={({ item }) =>
            <Post
              foto={item}
              likeCallback={this.like.bind(this)}
              aoComentarCallback={this.adicionaComentario.bind(this)}>
            </Post>
          }
        />
      </ScrollView >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: 'white'
  },
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
  }
});