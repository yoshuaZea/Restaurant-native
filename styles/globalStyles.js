import { StyleSheet } from 'react-native'
import { color } from 'react-native-reanimated'

export const colors = {
    negro: "#334F64",
    azul: "#44A9A7",
    amarillo: "#FFD781",
    blanco: "#E9EBED"
}

const GlobalStyles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: colors.blanco
    },
    principal: {
        marginHorizontal: '2.5%',
        marginVertical: '2.5%',
    }, 
    contenido: {
        marginHorizontal: '2.5%',
        marginVertical: '2.5%',
        flex: 1
    }, 
    boton: {
        backgroundColor: colors.azul
    },
    botonTexto: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: colors.blanco,
        fontSize: 15
    },
    botonIcon: {
        justifyContent:'center',
        height: 70,
        borderRadius: 10
    },
    botonIconTexto: {
        color: colors.blanco,
        fontSize: 50
    },
    contenidoNuevaOrden: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'

    },
    portada: {
        width: 350,
        height: 250,
        borderRadius: 5,
        marginBottom: 15,
        marginRight: 10
    },
    titulo: {
        textAlign: 'center',
        color: colors.negro,
        paddingVertical: 8,
        fontSize: 30,
        fontWeight: 'bold'
    },
    separador: {
        backgroundColor: colors.negro
    },
    separadotTexto: {
        color: colors.blanco,
        fontWeight: 'bold',
        fontSize: 15,
        textTransform: 'uppercase'
    },
    imagen: {
        width: '100%',
        height: 300
    },
    cantidad: {
        color: colors.negro,
        marginVertical: 20,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold'
    },
    cantidadPedido: {
        textAlign: 'center',
        fontSize: 24,
        color: colors.negro
    },
    temporizador: {
        marginBottom: 20,
        fontSize: 60,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 30
    },
    textoCentrado: {
        textAlign: 'center',
        color: colors.negro
    }
})

export default GlobalStyles