import React, { useEffect, useState } from "react";
import { Button, ToastAndroid, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { styles } from '../estilos';
import axios, { AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Leitura } from "../Interfaces/Leitura";
import ListagemLeitura from "./ListagemLeitura";
import { StatusBar } from "expo-status-bar";

const LerSensor = (props : any) : React.ReactElement =>{

    const [token,setToken] = useState<boolean>(true);
    const [modoEdicao,setmodoEdicao] = useState<boolean>(false);
    const [idLeitura, setIdLeitura] = useState<string>("");
    const [idUsuario, setIdUsuario] = useState<string>("");
    const [idSensor, setIdSensor] = useState<string>("");
    const [temperatura, setTemperatura] = useState<string>("");
    const [co2, setCo2] = useState<string>("");
    const [umidade, setUmidade] = useState<string>("");
    const [poluicao, setPoluicao] = useState<string>("");
    const [lista, setLista] = useState<Leitura[]>([]);


    const limpar = () => {
        setIdLeitura("");
        setIdUsuario("");
        setIdSensor("");
        setTemperatura("");
        setCo2("");
        setUmidade("");
        setPoluicao("");
        setToken(true);
    }
    
    const apagar = () => {
        alert("Apagando leitura")
        console.log(lista)
        axios.delete(`http://localhost:5291/api/Leitura/${idLeitura}`)
        .then(( info : AxiosResponse<any, any> )=>{
            limpar();
            
            ToastAndroid.show(`Leitura apagada com sucesso`, ToastAndroid.LONG);
        })
        .catch(( erro )=>{
            ToastAndroid.show("Erro ao apagar leitura", ToastAndroid.LONG);
        });
    }


    const atualizarLista = (novaLista: Leitura[]) => {
        setLista(novaLista);
    };

    const Atualizar = (props : any) : React.ReactElement => {
        return (
            <View>
                <ListagemForm/>
                <Button title="Atualizar Leitura" onPress={() => {

                axios.put(`http://localhost:5291/api/Leitura/${idLeitura}`, 
                    {
                        idLeitura: parseInt(idLeitura),
                        idUsuario: parseInt(idUsuario),
                        idSensor: parseInt(idSensor),
                        temperatura: parseFloat(temperatura),
                        co2: parseFloat(co2),
                        umidade: parseFloat(umidade),
                        poluicao: parseFloat(poluicao)
                    }
                )
                .then(()=>{
                    setmodoEdicao(false);
                })}
                }/>

            </View>
        )
    }



    useEffect(() => {
        const buscarIdUsuario = async () => {
            const dados = await AsyncStorage.getItem("Logado")
            const login = dados ? JSON.parse(dados) : [];
            const email = login[0].email
            console.log("email logado:", email);
            axios.get(
                `http://localhost:5291/api/Usuarios/ByEmail/${email}`
                )
                .then(( info : AxiosResponse<any, any>)=>{
                setIdUsuario(info.data);
                console.log("ID:", info.data);
                })
                .catch(( err )=>{
                console.log("erro ao buscar ID")
            })
        }
        buscarIdUsuario();
    }, [])
    
    


    const ListagemForm = (props : any) : React.ReactElement => {
        return(
            <View>
            <TextInput value={idLeitura} onChangeText={setIdLeitura} keyboardType="numeric" style={styles.input} placeholder="Id da Leitura:"/>
            <TextInput value={idSensor} onChangeText={setIdSensor} keyboardType="numeric" style={styles.input} placeholder="Id do Sensor (1-5 em funcionamento):"/>
            <TextInput value={temperatura} onChangeText={setTemperatura} keyboardType="numeric" style={styles.input} placeholder="Temperatura em ºC:"/>
            <TextInput value={co2} onChangeText={setCo2} keyboardType="numeric" style={styles.input} placeholder="CO2 em %:"/>
            <TextInput value={umidade} onChangeText={setUmidade} keyboardType="numeric" style={styles.input} placeholder="Umidade em %:"/>
            <TextInput value={poluicao} onChangeText={setPoluicao} keyboardType="numeric" style={styles.input} placeholder="Poluição AQI:"/>
        </View>
        )
        
    }

    return (
        <View style={styles.container}>
            { token  ? ( 
            <View >
            <ListagemForm/>

                <Button title="Resultado" onPress={()=>{

                    if (
                        idUsuario == null ||
                        idSensor == null ||
                        temperatura == null ||
                        co2 == null ||
                        umidade == null ||
                        poluicao == null
                    ){
                        ToastAndroid.show("Preencha todos os dados", ToastAndroid.LONG)
                        console.log("Dados vazios")
                    }
                    
                    axios.post(
                    "http://localhost:5291/api/Leitura",
                    {
                        idLeitura: parseInt(idLeitura),
                        idUsuario: parseInt(idUsuario),
                        idSensor: parseInt(idSensor),
                        temperatura: parseFloat(temperatura),
                        co2: parseFloat(co2),
                        umidade: parseFloat(umidade),
                        poluicao: parseFloat(poluicao)
                    }
                    ) .then(()=>{
                    setToken(false);
                    
                    })
                    
                
                }}/>

            </View>
            ) : (
                <View>
                    
                    {!modoEdicao && (
                        <View>
                            <ListagemLeitura idLeitura={idLeitura} atualizarLista={atualizarLista} onApagar={apagar} setToken={setToken}/>
                            <Button title="Atualizar" onPress={()=>{setmodoEdicao(true)}} /> 
                        </View>
                    
                    )}
                    {modoEdicao && (
                        <Atualizar/>
                    )}
                    <Button title="Nova Leitura" onPress={()=> limpar()}/>
                </View>
            )}

            <Button title="Logout" onPress={props.sair} />
            <StatusBar style="auto" />
        </View>

    )
}




export default LerSensor;