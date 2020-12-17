import React, { useEffect, useState, useContext } from 'react'
import { View } from 'react-native'
import { Container, Text, H1, H3, Button, Spinner } from 'native-base'
import PedidosContext from '../context/pedidos/pedidosContext'
import firebase from '../firebase'
import GlobalStyles, { colors as globalColors} from '../styles/globalStyles'
import { useNavigation } from '@react-navigation/native'
import Countdown from 'react-countdown'

const ProgresoPedido = () => {
    // Hook navigation
    const navigation = useNavigation()

    // Context de pedidos
    const { pedidoId } = useContext(PedidosContext)

    // State del componente
    const [tiempo, setTiempo] = useState(0)
    const [completado, setCompletado] = useState(false)

    useEffect(() => {
        const obtenerProducto = () => {
            firebase.db
                .collection('ordenes')
                .doc(pedidoId)
                .onSnapshot(handleSnapshot)
        }

        obtenerProducto()
    }, [])

    // Controlar snapshot
    const handleSnapshot = doc => {
        setTiempo(doc.data().tiempoEntrega)
        setCompletado(doc.data().completado)
    }

    // Muestra el temporizador
    const renderer = ({minutes, seconds}) => {
        let min = minutes >= 10 ? minutes : `0${minutes}`
        let sec = seconds >= 10 ? seconds : `0${seconds}`
        return (
            <Text style={GlobalStyles.temporizador}>{min}:{sec}</Text>
        )
    }

    return ( 
        <Container style={GlobalStyles.contenedor}>
            <View style={[GlobalStyles.contenido, { justifyContent: 'center' }]}>
                {
                    tiempo === 0 && (
                        <>
                            <Text style={GlobalStyles.textoCentrado}>
                                Hemos recibido tu orden: <Text style={{ fontWeight: 'bold' }}>{pedidoId}</Text>
                            </Text>
                            <Text style={GlobalStyles.textoCentrado}>Estamos calculando el tiempo de entrega</Text>
                            <Spinner color={globalColors.amarillo} />
                        </>
                    )
                }

                {
                    !completado && tiempo > 0 && (
                        <>
                            <Text style={GlobalStyles.textoCentrado}>Su orden estará lista en:</Text>
                            <Text style={GlobalStyles.textoCentrado}>
                                <Countdown 
                                    date={ Date.now() + tiempo * 60000 }
                                    renderer={renderer}
                                />
                            </Text>
                        </>
                    )
                }

                {
                    completado && (
                        <>
                            <H1 style={[GlobalStyles.textoCentrado, { textTransform: 'uppercase' }]}>Tú orden está lista!</H1>
                            <H3 style={[GlobalStyles.textoCentrado, { marginTop: 10 }]}>Por favor, pase a recoger su pedido</H3>
                            <Button
                                full
                                rounded
                                block
                                style={[GlobalStyles.boton,{ marginTop: 30 }]}
                                onPress={ () => navigation.navigate('NuevaOrden') }
                            >
                                <Text
                                    style={ GlobalStyles.botonTexto }
                                >Ir a inicio</Text>
                            </Button>
                        </>
                    )
                }

            </View>
        </Container>
     );
}
 
export default ProgresoPedido