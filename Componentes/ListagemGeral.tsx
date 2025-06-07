import { FlatList } from "react-native-gesture-handler";
import ListagemItem from "./ListagemItem";
import { View } from "react-native";

const ListagemGeral = (props : any) : React.ReactElement =>{

    
    
    return (
        <View>
            <FlatList data={props.lista} 
            renderItem={( flatProps: any )=>
            <ListagemItem {...flatProps} 
            onApagar={props.onApagar}/>}
            />
        </View>
    )
}

export default ListagemGeral;