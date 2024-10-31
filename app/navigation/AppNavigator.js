import React, { Suspense } from 'react';
import 'react-native-gesture-handler';

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../../app/context/AuthContext';
import DrawerButton from "../components/DrawerButton";
import CustomDrawerContent from "../components/CustomDrawerContent";
import screens from "../../app/screens";
import AboutNavigation from "./SubNavigator/AboutNavigation";
import { Ionicons } from '@expo/vector-icons';

// import { ROUTES, SCREEN_NAMES } from '../config/routes';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const {
    FrontPage_StartScreen,
    FrontPage_LoginScreen,
    FrontPage_RegisterScreen,
    FrontPage_ResetLinkScreen,
    FrontPage_NewPasswordScreen,
    FrontPage_ResetPasswordScreen,
    FrontPage_CreateAccountScreen,
    FrontPage_SuccessScreen,
    FrontPage_OTPVerificationScreen,
    FrontPage_OTPSuccess,
    FrontPage_AgentRegistrationScreen,
    FrontPage_AgentRegistrationSuccess,
    FrontPage_SubscriptionScreen,
    FrontPage_HomeScreen,
    FrontPage_PaymentScreen,
    FrontPage_PaymentSuccess,
    FrontPage_CompanyDetailsScreen,
    // FrontPage_DashboardScreen,
    AuthPage_HomeScreen,
    AuthPage_DashboardScreen ,
    AuthPage_ProfileScreen,
    AuthPage_PropertiesScreen,
    AuthPage_AddPropertiesScreen,

} = screens;





function AuthStack() {

    const { authState } = useAuth();

    return (
        <Drawer.Navigator
            initialRouteName={"DashboardScreen"}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={({ navigation }) => ({
                headerLeft: () => <DrawerButton navigation={navigation} />,
                headerStyle: {
                    backgroundColor: 'white',
                },
                headerTintColor: 'black',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            })}
        >

            <Drawer.Screen name={"HomeScreen"} options={{ title: 'Home'}} component={AuthPage_HomeScreen} />
            <Drawer.Screen name={"DashboardScreen"} options={{ title: 'Dashboard'}}  component={AuthPage_DashboardScreen} />

            {authState.isRole("Admin")  && (
                <Drawer.Screen name={"ProfileScreen"} options={{title:"Profile"}}>

                {/* Inline Sub Navigator */}
                {() => (
                    <Tab.Navigator>
                        <Tab.Screen name='AuthPage_ProfileScreen' component={AuthPage_ProfileScreen}
                            options={
                                {
                                    tabBarLabel: 'Profile',
                                    tabBarIcon: ({ color, size }) => (
                                        <Ionicons name="person" color={color} size={size} />
                                      ),
                                }
                            }
                        />
                        <Tab.Screen name='AuthPage_PropertiesScreen' component={AuthPage_PropertiesScreen}
                            options={
                                {
                                    tabBarLabel: 'Properties',
                                    tabBarIcon: ({ color, size }) => (
                                        <Ionicons name="business" color={color} size={size} />
                                    ),
                                }
                            }
                        />
                        <Tab.Screen name='AuthPage_AddPropertiesScreen' component={AuthPage_AddPropertiesScreen}
                            options={
                                {
                                    tabBarLabel: 'Add Properties',
                                    tabBarIcon: ({ color, size }) => (
                                        <Ionicons name="bookmarks" color={color} size={size} />
                                      ),
                                }
                            }
                        />
                    </Tab.Navigator>
                )}

                </Drawer.Screen>
            )}


            {authState.hasCan("update-user") &&
                <Drawer.Screen
                    name={"AboutUsScreen"}
                    options={{
                        headerShown:true,
                        title: 'About'
                    }}
                    component={AboutNavigation}/>
            }

        </Drawer.Navigator>
    );
}



function AppStack() {
    return (
    <Stack.Navigator
        initialRouteName={"StartScreen"}
        screenOptions={{headerShown: false,}}
    >
        <Stack.Screen name={"StartScreen"} component={FrontPage_StartScreen} />
        <Stack.Screen name={"LoginScreen"}component={FrontPage_LoginScreen} />
        <Stack.Screen name={"RegisterScreen"} component={FrontPage_RegisterScreen} />
        <Stack.Screen name={"ResetLinkScreen"} component={FrontPage_ResetLinkScreen} />
        <Stack.Screen name={"ResetPasswordScreen"} component={FrontPage_ResetPasswordScreen}/>
        <Stack.Screen name={"NewPasswordScreen"} component={FrontPage_NewPasswordScreen}/>
        <Stack.Screen name={"SuccessScreen"} component={FrontPage_SuccessScreen}/>
        <Stack.Screen name={"CreateAccountScreen"} component={FrontPage_CreateAccountScreen}/>
        <Stack.Screen name={"OTPVerificationScreen"} component={FrontPage_OTPVerificationScreen}/>
        <Stack.Screen name={"OTPSuccess"} component={FrontPage_OTPSuccess}/>
        <Stack.Screen name={"AgentRegistrationScreen"} component={FrontPage_AgentRegistrationScreen}/>
        <Stack.Screen name={"SubscriptionScreen"} component={FrontPage_SubscriptionScreen}/>
        <Stack.Screen name={"PaymentScreen"} component={FrontPage_PaymentScreen}/>
        <Stack.Screen name={"PaymentSuccess"} component={FrontPage_PaymentSuccess}/>
        <Stack.Screen name={"HomeScreen"} component={FrontPage_HomeScreen}/>
        <Stack.Screen name={"CompanyDetailsScreen"} component={FrontPage_CompanyDetailsScreen}/>
        <Stack.Screen name={"AgentRegistrationSuccess"} component={FrontPage_AgentRegistrationSuccess}/>
        {/* <Stack.Screen name={"DashboardScreen"} component={FrontPage_DashboardScreen}/> */}

    </Stack.Navigator>
    );
}



export default function Navigation() {
    const { authState } = useAuth();
    return (
        <>
            {authState.isAuthenticated ? < AuthStack/> : <AppStack />}
        </>
    );
}


