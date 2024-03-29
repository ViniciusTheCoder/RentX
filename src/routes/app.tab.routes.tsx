import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeSvg from '../assets/home.svg';
import CarSvg from '../assets/car.svg';
import PeopleSvg from '../assets/people.svg';

import { AppStackRoutes } from "./app.stack.routes";
import { MyCars } from "../screens/MyCars";
import { Profile } from "../screens/Profile";

import { Platform } from "react-native";
import theme from "../styles/theme";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes() {
    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 78,
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                    backgroundColor: theme.colors.background_primary
                },
                tabBarActiveTintColor: theme.colors.main,
                tabBarInactiveTintColor: theme.colors.text_detail
            }}
        >
            <Screen
                name={'Home'}
                component={AppStackRoutes}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <HomeSvg width={24} height={24} fill={color} />
                    )
                }}
            />
            <Screen
                name={'Profile'}
                component={Profile}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <PeopleSvg width={24} height={24} fill={color} />
                    )
                }}
            />
            <Screen
                name={'MyCars'}
                component={MyCars}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <CarSvg width={24} height={24} fill={color} />
                    )
                }}
            />
        </Navigator>
    )
}