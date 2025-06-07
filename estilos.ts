import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 10,
        backgroundColor: '#FDD835',
        justifyContent: 'center',
        padding: 10
    },
    cadastro: {
        flex: 1,
        justifyContent:'flex-start',
        backgroundColor: '#FDD835',
        padding: 10,
        gap:10
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 10,
        
    },
    itens: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 20,
        margin: 10,
        fontWeight: 'bold',
    },
    listagem: {
        flex: 1,
        margin:10,
        padding: 16,
        borderWidth: 3,
        borderRadius:16,
        borderColor: 'gray',
        gap: 6,
        backgroundColor: '#FFFf'
    }

});

export { styles };