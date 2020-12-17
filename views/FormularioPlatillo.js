import React, { useContext, useState, useEffect } from 'react'
import { Alert } from 'react-native'
import PedidosContext from '../context/pedidos/pedidosContext'
import GlobalStyles, { colors as globalColors} from '../styles/globalStyles'
import { useNavigation } from '@react-navigation/native'
import {
    Container,
    Content,
    Form,
    Icon,
    Button,
    Grid,
    Col,
    Input,
    Text,
    Footer,
    FooterTab
} from 'native-base'

const FormularioPlatillo = () => {
    // Hook de navegacion
    const navigation = useNavigation()

    // Context de pedidos
    const { platillo, confirmarPlatillo } = useContext(PedidosContext)

    // Destructuring
    const { precio } = platillo

    // State del componente
    const [cantidad, setCantidad] = useState(1)
    const [total, setTotal] = useState(0)

    // Carga del componente
    useEffect(() => {
        calcularTotal()
    }, [cantidad])

    // Calcular total del platillo por su cantidad
    const calcularTotal = () => {
        const totalPagar = precio * cantidad
        setTotal(totalPagar)
    }
    
    const disminuirCantidad = () => {
        if(cantidad > 1) {
            const nuevaCantidad = parseInt(cantidad) - 1
            setCantidad(nuevaCantidad)
        }    
    }

    const aumentarCantidad = () => {
        const nuevaCantidad = parseInt(cantidad) + 1
        setCantidad(nuevaCantidad)
    }

    const agregarPedido = () => {
        // Almacenar el pedido al pedido principal
        const pedido = {
            ...platillo,
            cantidad,
            total
        }

        // Agregar al state de context
        confirmarPlatillo(pedido)

        // Redireccionar al resumen
        navigation.navigate('ResumenPedido')
    }

    return ( 
        <>
            <Content>
                <Form>
                    <Text style={GlobalStyles.cantidad}>Cantidad</Text>
                    <Grid>
                        <Col>
                            <Button
                                style={[ GlobalStyles.boton, GlobalStyles.botonIcon ]}
                                onPress={ () => disminuirCantidad() }
                            >
                                <Icon style={[ GlobalStyles.botonTexto, GlobalStyles.botonIconTexto ]} name="remove" />
                            </Button>
                        </Col>
                        <Col>
                            <Input
                                keyboardType="numeric"
                                style={GlobalStyles.cantidadPedido}
                                value={cantidad.toString()}
                                onChangeText={ cantidad => setCantidad(cantidad) }
                            />
                        </Col>
                        <Col>
                            <Button
                                style={[ GlobalStyles.boton, GlobalStyles.botonIcon ]}
                                onPress={ () => aumentarCantidad() }
                            >
                                <Icon style={[ GlobalStyles.botonTexto, GlobalStyles.botonIconTexto ]} name="add" />
                            </Button>
                        </Col>
                    </Grid>
                    <Text
                        style={GlobalStyles.cantidad}
                    >Subtotal: $ {total} </Text>
                </Form>
            </Content>
            <Footer>
                <FooterTab>
                    <Button
                        style={GlobalStyles.boton}
                        onPress={ () => agregarPedido() }
                    >
                        <Text
                            style={ GlobalStyles.botonTexto }
                        >Agregar al pedido</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </>
     );
}
 
export default FormularioPlatillo