import { useNavigation, NavigationProp, ParamListBase, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';

import {
    StatusBar,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';

import * as Yup from 'yup';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { InputPassword } from '../../components/InputPassword';

import { useAuth } from '../../hooks/auth';

import theme from '../../styles/theme';

import {
    Container,
    Header,
    Title,
    Form,
    Subtitle,
    Footer
}
    from './styles';

export function SignIn() {
    const [email, setEmail] = useState<any>();
    const [password, setPassword] = useState<any>();

    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const { signIn } = useAuth();

    async function handleSignIn() {
        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required('Email obrigatório')
                    .email('Digite um email válido'),
                password: Yup.string()
                    .required('Senha obrigatória')
            });

            await schema.validate({ email, password });

            signIn({ email, password });

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                Alert.alert('Opa', error.message)
            } else {
                Alert.alert('Erro na autenticação', 'Ocorreu um erro ao realizar logins, verifique as credenciais')
            }
        }
    }

    function handleSignUp() {
        navigation.navigate('FirstStep')
    }

    return (
        <KeyboardAvoidingView behavior='position' enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <StatusBar
                        barStyle='dark-content'
                        backgroundColor="transparent"
                        translucent
                    />
                    <Header>
                        <Title>Estamos{'\n'}quase lá.</Title>
                        <Subtitle>
                            Faça seu login para começar{'\n'}
                            uma experiência incrível
                        </Subtitle>
                    </Header>

                    <Form>
                        <Input
                            iconName='mail'
                            placeholder='E-mail'
                            keyboardType='email-address'
                            autoCorrect={false}
                            autoCapitalize='none'
                            onChangeText={setEmail}
                            value={email}
                        />

                        <InputPassword
                            iconName='lock'
                            placeholder='Senha'
                            onChangeText={setPassword}
                            value={password}
                        />


                    </Form>

                    <Footer>
                        <Button
                            title='Login'
                            onPress={handleSignIn}
                            enabled={true}
                            loading={false}
                        />

                        <Button
                            title='Criar conta gratuita'
                            color={theme.colors.success}
                            light
                            onPress={handleSignUp}
                            enabled={true}
                            loading={false}
                        />
                    </Footer>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}