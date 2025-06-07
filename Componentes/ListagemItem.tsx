import { styles } from "../estilos";
import { Button, Text, View } from "react-native";

const ListagemItem = (props : any) : React.ReactElement =>{
    return (
        <View style={styles.listagem}>

            <Text style={{}}>Id do Sensor: {props.item.idSensor}</Text>
            <Text style={{}}>Temperatura: {props.item.temperatura}º</Text>
            <Text style={{}}>CO2: {props.item.co2}%</Text>
            <Text style={{}}>Umidade: {props.item.umidade}%</Text>
            <Text style={{}}>Poluição AQI: {props.item.poluicao}</Text>

            <Text style={{flex:2, fontSize:18, textAlign:'center', fontWeight:'bold', paddingVertical: 8}}>Qualidade ambiental: {props.item.resultado}</Text>
            <Button title="Apagar" onPress={()=>{props.onApagar(props.item)}} />

        </View>
    )
}

export default ListagemItem;