import React, { useEffect, useState } from "react";
import { Button, Text, ToastAndroid, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Leitura } from "../Interfaces/Leitura";
import { styles } from "../estilos";
import axios, { AxiosResponse } from "axios";
import ListagemItem from "./ListagemItem";






const ListagemLeitura = (props : any) : React.ReactElement =>{

    const [lista, setLista] = useState<Leitura[]>([]);
    
    useEffect(() => {
            const buscarLeitura = async () => {
                axios.get(
                    `http://localhost:5291/api/Leitura/${props.idLeitura}`
                    )
                    .then(( info : AxiosResponse<any, any>)=>{
                    console.log("Dados : ", info.data);

                    console.log(info.data);
                    setLista([info.data]);
                    console.log(lista);
                    
                    })
                    .catch(( err )=>{
                    ToastAndroid.show("Erro ao ler" + err, 
                        ToastAndroid.LONG);
                    }) 
            }
            buscarLeitura();
        }, [props.atualizarLista])

    return (
        <View>
            <FlatList data={lista} 
            renderItem={( flatProps: any )=>
            <ListagemItem {...flatProps} 
            onApagar={props.onApagar}/>}
            />
        </View>
    )
}


export default ListagemLeitura;


