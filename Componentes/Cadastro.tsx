import { useState } from "react";
import { Button, StyleSheet, Text, ToastAndroid, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import axios from "axios";
import { styles } from "../estilos";

const Cadastro = (props : any) : React.ReactElement =>{

    const [idUsuario, setIdUsuario] = useState<string>("");
    const [nome, setNome] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    

    const limpar = () => {
        setIdUsuario("");
        setNome("");
        setEmail("");
        setSenha("");
    }

    return (
        <View style={styles.cadastro}>
            <Text style={{textAlign:'center', fontSize:24, paddingTop:70, fontWeight:'bold'}}>HESOL</Text>
            <Text style={{textAlign:'center', fontSize:18, fontWeight:'bold'}}>Ajude-nos à previnir o aquecimento global!</Text>
            <Text style={{textAlign:'center', paddingBottom:50, paddingHorizontal:10}}>Cadastre-se abaixo para ter acesso aos nossos sensores e à calculadora de qualidade ambiental</Text>

                <TextInput value={idUsuario} onChangeText={setIdUsuario} keyboardType="numeric" style={styles.input} placeholder="Id:"/>
                <TextInput value={nome} onChangeText={setNome} style={styles.input} placeholder="Nome:"/>
                <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder="Email:"/>
                <TextInput value={senha} onChangeText={setSenha} style={styles.input} placeholder="Senha:" secureTextEntry={true}/>

                <Button title="Gravar" onPress={()=>{
                    axios.post(
                    "http://localhost:5291/api/Usuarios",
                    {
                        nome,
                        email,
                        senha
                    }
                    )
                    limpar();
                }}/>
                

        </View>

    )
}




export default Cadastro;