import axios, { AxiosResponse } from "axios";
import { Button, ToastAndroid, View } from "react-native";
import { Leitura } from "../Interfaces/Leitura";
import { useEffect, useState } from "react";
import ListagemLeitura from "./ListagemLeitura";
import ListagemGeral from "./ListagemGeral";
import { styles } from "../estilos";

const Leituras = (props : any) : React.ReactElement =>{
    const [lista, setLista] = useState<Leitura[]>([]);
    const [idLeitura, setIdLeitura] = useState<string>("");
    const [atualizar, setAtualizar] = useState(false);


    const apagar = () => {
        alert("Apagando leitura")
        console.log(idLeitura);
        axios.delete(`http://localhost:5291/api/Leitura/${idLeitura}`)
        .then(( info : AxiosResponse<any, any> )=>{
            setAtualizar(!atualizar);
            ToastAndroid.show(`Leitura apagada com sucesso`, ToastAndroid.LONG);
        })
        .catch(( erro )=>{
            ToastAndroid.show("Erro ao apagar leitura", ToastAndroid.LONG);
        });
    }

    useEffect(() => {
            const buscarLeituras = async () => {
                axios.get(
                    `http://localhost:5291/api/Leitura`
                )
                .then(( info : AxiosResponse<any, any>)=>{
                console.log("Dados : ", info.data);

                const list : Leitura[] = [];
                for (const chave in info.data) { 
                    const leitura = info.data[chave];
                    setIdLeitura(leitura.idLeitura);
                    list.push(leitura);
                }
                setLista(list);
                })
                .catch(( err )=>{
                ToastAndroid.show("Erro ao ler" + err, 
                    ToastAndroid.LONG);
                })

            }
            buscarLeituras();
        }, [atualizar])
    
    return (
        <View style={styles.container}>
            <ListagemGeral lista={lista} onApagar={apagar}/>

        </View>
    )
}

export default Leituras;