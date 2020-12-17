import React, { useState, useContext, useEffect } from 'react'
import { Alert, View } from 'react-native'
import PedidosContext from '../context/pedidos/pedidosContext'
import firebase from '../firebase'
import GlobalStyles, { colors as globalColors} from '../styles/globalStyles'
import { useNavigation } from '@react-navigation/native'
import {
    Container,
    Content,
    Form,
    Icon,
    List,
    ListItem,
    Thumbnail,
    Text,
    Left,
    Body,
    Button,
    H1,
    Footer,
    FooterTab
} from 'native-base'

const ResumenPedido = () => {
    // Hook de navegacion
    const navigation = useNavigation()

    // Context de pedidos
    const { pedido, total, mostrarResumen, eliminarPlatilloOrden, pedidoConfirmado } = useContext(PedidosContext)

    useEffect(() => {
        calcularTotal()
    }, [pedido, total])


    const calcularTotal = () => {
        let nuevoTotal = 0
        nuevoTotal = pedido.reduce((nuevoTotal, platillo) => nuevoTotal + platillo.total, 0)
        mostrarResumen(nuevoTotal)
    }

    // Función que confirma orden de pedido y redirecciona
    const progresoPedido = () => {
        Alert.alert(
            '¿Deseas confirmar tu pedido?',
            'Una vez que realizas tu pedido, no podrás cambiarlo',
            [
                { 
                    text: 'Si, confirmar', 
                    onPress: async () => {

                        // Crear objeto
                        const pedidoObj = {
                            tiempoEntrega: 0,
                            completado: false,
                            total: Number(total),
                            orden: pedido, // array
                            creado: Date.now()
                        }

                        // Enviar pedido a firebase
                        try {
                            const pedido = await firebase.db.collection('ordenes').add(pedidoObj)
                            
                            // Enviar al state de pedido
                            pedidoConfirmado(pedido.id)

                            // Redireccionar
                            navigation.navigate('ProgresoPedido')

                        } catch (error) {
                            console.log(error)
                        }
                    }
                },
                { text: 'Revisar', style: 'cancel' }
            ]
        )
    }

    // Eliminar un producto del pedido
    const eliminarPlatillo = id => {
        Alert.alert(
            '',
            '¿Deseas eliminar este platillo?',
            [
                { 
                    text: 'Si', 
                    onPress: () => {
                        // Eliminar del state
                        eliminarPlatilloOrden(id)
                    }
                },
                { text: 'No', style: 'cancel' }
            ]
        )
    }

    return ( 
        <Container style={GlobalStyles.contenedor}>
            <Content style={GlobalStyles.contenido}>
                <H1 style={GlobalStyles.titulo}>Resumen del pedido</H1>
                {
                    pedido.length > 0 ? (
                        pedido.map((platillo, i) => {
                            // Destructuring
                            const { cantidad, nombre, imagen, id, precio } = platillo
    
                            return(
                                <List key={id+i}>
                                    <ListItem thumbnail>
                                        <Left>
                                            <Thumbnail 
                                                large
                                                square
                                                source={{ uri: imagen }}
                                            />
                                        </Left>
                                        <Body>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <View>
                                                    <Text style={{ fontWeight: 'bold' }}>{nombre}</Text>
                                                    <Text>
                                                        Cantidad: {cantidad}
                                                    </Text>
                                                    <Text>Precio: $ {precio}</Text>
                                                    <Text>Subtotal: $ {parseInt(cantidad * precio)}</Text>
                                                </View>
                                                <Button
                                                    full
                                                    danger
                                                    rounded
                                                    style={{ marginTop: 10, alignSelf: 'center' }}
                                                    onPress={ () => eliminarPlatillo(id) }
                                                >
                                                    <Icon name="remove" />
                                                </Button>
                                            </View>
                                        </Body>
    
                                    </ListItem>
                                </List>
                            )
                        })
                    ) : (
                        <Text style={GlobalStyles.cantidad}>Aún no has agregado platillos a tu pedido</Text>
                    )
                }
                {  
                    pedido.length > 0 && (
                        <Text style={GlobalStyles.cantidad}>Total a pagar: $ {total}</Text>
                    )
                }
                <Button
                    style={{ backgroundColor: globalColors.negro }}
                    dark
                    full
                    onPress={ () => navigation.navigate('Menu') }
                >
                    <Text
                        style={ GlobalStyles.botonTexto }
                    >&#43; Agregar platillo</Text>
                </Button>
            </Content>
            
            {
                pedido.length > 0 && (
                    <Footer>
                        <FooterTab>
                            <Button
                                style={GlobalStyles.boton}
                                onPress={ () => progresoPedido() }
                            >
                                <Text
                                    style={ GlobalStyles.botonTexto }
                                >
                                    Ordenar pedido
                                </Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                )
            }

        </Container>
     );
}
 
export default ResumenPedido