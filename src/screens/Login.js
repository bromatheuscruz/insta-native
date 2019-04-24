import React, { Component } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Text,
    Dimensions,
    Button,
    AsyncStorage
} from 'react-native';
import { isTSExpressionWithTypeArguments } from '@babel/types';

const { width, height } = Dimensions.get('window');

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            senha: ''
        }
    }

    efetuarLogin() {

        const login = this.state.login;
        const senha = this.state.senha;

        if (login == 'admin' && senha == 'admin') {
            this.setState({ login: '', senha: '' });
            this.inputLogin.clear();
            this.inputSenha.clear();
            this.props.navigation.navigate('Feed');
        }
        else {
            this.setState({ mensagemDeErro: 'Usuário ou senha inválidos' })
        }

        // const uri = 'https://instalura-api.herokuapp.com/api/public/login'
        // const requestInfo = {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         login: this.state.login,
        //         senha: this.state.senha
        //     }),
        //     headers: new Headers({
        //         'Content-Type': 'application/json'
        //     })
        // }
        // 
        // fetch(uri, requestInfo)
        //     .then((response) => {
        //         if (response.ok) {
        //             return response.text();
        //         }
        //         throw new Error("Não foi possível realizar o login");
        //     }).then(token => AsyncStorage.setItem('token', token))
        //     .catch(e => this.setState({ mensagemDeErro: 'Não foi possível efetuar o login' }));
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.principal}>Instalura</Text>
                <TextInput
                    placeholderTextColor="#ded1c1"
                    placeholder="Usuário"
                    ref={ref => this.inputLogin = ref }
                    onChangeText={texto => this.setState({ login: texto })}
                    style={styles.input}
                    autoCapitalize="none"
                >
                </TextInput>
                <TextInput
                    placeholderTextColor="#ded1c1"
                    placeholder="Senha"
                    ref={ref => this.inputSenha = ref}
                    onChangeText={texto => this.setState({ senha: texto })}
                    style={styles.input}
                    secureTextEntry={true}
                >
                </TextInput>
                <View style={styles.containerBotao} >
                    <Button title="Entrar" onPress={this.efetuarLogin.bind(this)}></Button>
                </View>
                <Text style={styles.mensagemDeErro}>
                    {this.state.mensagemDeErro}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: '#125688',
        justifyContent: 'center',
        alignItems: 'center'
    },
    principal: {
        fontSize: 45,
        fontFamily: 'Open Sans',
        color: '#ffc838',
        marginBottom: 5
    },
    input: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        color: '#ded1c1',
        width: '80%',
        margin: 5
    },
    containerBotao: {
        flexDirection: 'row',
        marginTop: 10
    },
    mensagemDeErro: {
        color: '#f40000',
        marginTop: 10
    }
});