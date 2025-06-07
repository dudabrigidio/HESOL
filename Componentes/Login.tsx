import { useState } from "react";
import { Button, Text, ToastAndroid, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Usuario } from "../Interfaces/Usuario";
import axios, { AxiosResponse } from "axios";
import { UsuarioLogin } from "../Interfaces/UsuarioLogin";
import { styles } from "../estilos";

const Login = (props : any) : React.ReactElement => {

    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [lista, setLista] = useState<UsuarioLogin[]>([]);


    const salvarLogin = (email: string, senha: string) => {

        setLista(( listaAntiga : UsuarioLogin[]) => {
        const login = {email, senha};
        const listaNova = [ ...listaAntiga, login ];
        const strLista = JSON.stringify(listaNova);
        AsyncStorage.setItem("Logado", strLista)
        .then(()=>{ToastAndroid.show("Login salvo com sucesso", 
            ToastAndroid.LONG); })
        .catch(()=>{ToastAndroid.show("Erro ao logar", 
            ToastAndroid.LONG); })
        return listaNova;
    })

        
    } 



    return (
        <View style={styles.container}>
            <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder="Email:"/>
            <TextInput value={senha} onChangeText={setSenha} style={styles.input} placeholder="Senha:" secureTextEntry={true}/>
            <Button title="Logar" onPress={()=>{
                axios.post(
                    "http://localhost:5291/api/Usuarios/Login",
                    {
                        "Email": email,
                        "Senha": senha
                    }
                )
                .then(( info : AxiosResponse )=>{
                    console.log("Status:", info.status);
                    props.token(true);
                    console.log("Usuario logado com sucesso")
                    try {
                        ToastAndroid.show(`Usuario logado com sucesso`, ToastAndroid.LONG);
                    } catch (e) {
                        console.log("Erro ao exibir Toast:", e);
                    }
                    salvarLogin(email, senha);
                    
                })
                .catch((err : any)=>{ 
                    const strErr = JSON.stringify(err);
                    console.log("Erro",strErr);
                    console.log("Erro ao logar")
                    ToastAndroid.show(`Erro ao logar o usuario`,
                    ToastAndroid.LONG);
                })
                console.log("Login:",email,senha);
                
                }}/>
        </View>

    )
    
}

export default Login;