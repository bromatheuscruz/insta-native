import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';

export default class inputValue extends Component {
    constructor(props) {
        super(props);

        this.state = {
            commentValue: ''
        }
    }

    render() {
        const { aoComentarCallback, fotoId } = this.props;
        return (
            <View style={styles.container}>
                <TextInput
                    ref={ref => this.inputValue = ref}
                    style={styles.input}
                    placeholder="Adicione um comentário"
                    underlineColorAndroid="transparent"
                    onChangeText={text => this.setState({ commentValue: text })}></TextInput>
                <TouchableOpacity onPress={() => {
                    aoComentarCallback(this.state.commentValue, this.inputValue, fotoId);
                    this.setState({commentValue: ''});
                }
                }>
                    <Image source={require('../../resources/img/send.png')} style={styles.inputIcon}></Image>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputIcon: {
        height: 30,
        width: 30
    },
    container: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        height: 40
    }
});