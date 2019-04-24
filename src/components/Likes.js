import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    StyleSheet,
    Text
} from 'react-native';

export default class Likes extends Component {
    constructor(props) {
        super(props);
    }

    exibeLikers(likers) {
        return (
            <Text style={styles.likes}>
                {likers.length} {likers.length > 1 ? 'curtidas' : 'curtida'}
            </Text>
        );
    }

    carregaIcone(likeada) {
        return likeada ? require('../../resources/img/s2-checked.png') : require('../../resources/img/s2.png');
    }

    render() {
        const { foto, likeCallback } = this.props;
        return (
            <View>
                <TouchableOpacity style={styles.container} onPress={() => { likeCallback(foto.id); }}>
                    <Image source={this.carregaIcone(foto.likeada)} style={styles.container}>
                    </Image>
                </TouchableOpacity>
                {this.exibeLikers(foto.likers)}
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 0,
        height: 40,
        width: 40
    }
});