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
  ScrollView,
  FlatList,
  Dimensions
} from 'react-native';
import Post from './src/components/Post';

const screenWidth = Dimensions.get('screen').width;

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      fotos: []
    }
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
            <Post foto={item}></Post>
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