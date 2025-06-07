'use client';
import { StatusBar } from 'expo-status-bar';
import { Button, Text, ToastAndroid, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Cadastro from './Componentes/Cadastro';
import Login from './Componentes/Login';
import { NavigationContainer } from '@react-navigation/native';
import { AntDesign, Entypo, Foundation} from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LerSensor from './Componentes/LerSensor';
import VerLeitura from './Componentes/ListagemLeitura';
import Leituras from './Componentes/Leituras';



export default function App() {
  const [token, setToken] = useState<boolean>(false);

  const Tab = createBottomTabNavigator();

  
  const login  = async ()  =>  { 
    const logado = await AsyncStorage.getItem("Logado")
    if (logado) {
      setToken(true);
    } else {
      setToken(false);
    }
  }


  console.log(token)
  useEffect(() => {
    login();
  })


  const sair = () => {
        AsyncStorage.removeItem("Logado")
        setToken(false);
  }

  

  return (
    <GestureHandlerRootView>
      <NavigationContainer>
      { token  ? (
          <View style={{flex: 1}}>

            
            <Tab.Navigator>
              
              <Tab.Screen name="Calculadora de qualidade ambiental " 
                options={{
                  title: "HESOL - Calculadora de qualidade ambiental",
                  tabBarIcon: ({size, color})=>
                    <AntDesign name="calculator" size={24} color="black" />,
                  }}> 
                  {(navProps : any)=><LerSensor sair={sair}/>}
              </Tab.Screen>

              <Tab.Screen name="Todas as Leituras" 
              options={{
                title: "HESOL - ANÁLISES",
                tabBarIcon: ({size, color})=>
                  <Foundation name="results" size={24} color="black" />,
                }}> 
                {(navProps : any)=><Leituras sair={sair}/>}
              </Tab.Screen>
              

            </Tab.Navigator>

          </View>
        ) : (
          <View style={{flex: 1}}>
        
          <Tab.Navigator>

            <Tab.Screen name="Cadastro" 
            options={{
              title: "HESOL - Cadastro",
              tabBarIcon: ({size, color})=>
                <AntDesign name="adduser" size={24} color="black" />,
              }}> 
              {(navProps : any)=><Cadastro {...navProps} token={setToken}/>}
              </Tab.Screen>

              <Tab.Screen name="Login" 
                options={{
                  title: "HESOL - Login",
                  tabBarIcon: ({size, color})=>
                    <AntDesign name="login" size={24} color="black" />,
                  }}> 
                  {(navProps : any)=><Login token={setToken}/>}
              </Tab.Screen>
              
      
          </Tab.Navigator>
        <StatusBar style="auto" />
        </View>
        )}
      </NavigationContainer>
    </GestureHandlerRootView>
    
    
  );
}
