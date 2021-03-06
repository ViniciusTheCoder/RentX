import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, BackHandler } from "react-native";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedGestureHandler, withSpring } from "react-native-reanimated";
import { RectButton, PanGestureHandler } from "react-native-gesture-handler";

import { Ionicons } from '@expo/vector-icons';

import { Car } from "../../components/Car";
import { LoadAnimation } from "../../components/LoadAnimation";

import {
    Container,
    Header,
    HeaderContent,
    TotalCars,
    CarList,
} from "./styles";

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import Logo from '../../assets/logo.svg';

import { api } from '../../services/api';
import { DTO } from '../../dtos/CarDTO';
import theme from "../../styles/theme";

export function Home() {
    const [cars, setCars] = useState<DTO[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    const positionY = useSharedValue(0);
    const positionX = useSharedValue(0);

    const myCarsButtonStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: positionX.value },
                { translateY: positionY.value }
            ]
        }
    });

    const onGestureEvent = useAnimatedGestureHandler({
        onStart(_, ctx: any) {
            ctx.positionX = positionX.value;
            ctx.positionY = positionY.value;
        },
        onActive(event, ctx: any) {
            positionX.value = ctx.positionX + event.translationX;
            positionY.value = ctx.positionY + event.translationY;
        },
        onEnd() {
            positionX.value = withSpring(0);
            positionY.value = withSpring(0);
        }
    });

    function handleCarDetails(car: DTO) {
        navigation.navigate('CarDetails', { car })
    }

    function handleOpenMyCars() {
        navigation.navigate('MyCars')
    }

    useEffect(() => {
        async function searchCars() {
            try {
                const response = await api.get('/cars');
                setCars(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        searchCars();
    }, []);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            return true
        })
    }, [])

    return (
        <Container>
            <StatusBar
                barStyle={"light-content"}
                backgroundColor="transparent"
                translucent
            />
            <Header>
                <HeaderContent>
                    <Logo
                        width={RFValue(108)}
                        heigt={RFValue(12)}
                    />
                    {
                        !loading &&
                        <TotalCars>
                            Total de {cars.length} carros
                        </TotalCars>
                    }
                </HeaderContent>
            </Header>

            {loading ? <LoadAnimation /> :

                <CarList
                    data={cars}
                    keyExtractor={item => (item.id)}
                    renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
                />
            }
            <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View style={[
                    myCarsButtonStyle,
                    {
                        position: 'absolute',
                        bottom: 13,
                        right: 22
                    }
                ]}>
                    <ButtonAnimated
                        style={[styles.button, { backgroundColor: theme.colors.main }]}
                        onPress={handleOpenMyCars}>
                        <Ionicons
                            name='ios-car-sport'
                            size={32}
                            color={'#FFFFFF'}
                        />
                    </ButtonAnimated>
                </Animated.View>
            </PanGestureHandler>
        </Container>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
})