import React from "react";
import { TextInput } from "react-native-gesture-handler";

const Leituras = (props : any) : React.ReactElement =>{
    return (
         <View style={styles.container}>
            
            <TextInput value={idLeitura} onChangeText={setIdLeitura} keyboardType="numeric" style={styles.input} placeholder="Id da Leitura:"/>
            <TextInput value={idSensor} onChangeText={setIdSensor} keyboardType="numeric" style={styles.input} placeholder="Id do Sensor (1-5 em funcionamento):"/>
            <TextInput value={temperatura} onChangeText={setTemperatura} keyboardType="numeric" style={styles.input} placeholder="Temperatura em ºC:"/>
            <TextInput value={co2} onChangeText={setCo2} keyboardType="numeric" style={styles.input} placeholder="CO2 em %:"/>
            <TextInput value={umidade} onChangeText={setUmidade} keyboardType="numeric" style={styles.input} placeholder="Umidade em %:"/>
            <TextInput value={poluicao} onChangeText={setPoluicao} keyboardType="numeric" style={styles.input} placeholder="Poluição AQI:"/>
        </View>
    )
}