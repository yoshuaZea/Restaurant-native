import React, { useContext } from 'react'
import { Image } from 'react-native'
import PedidosContext from '../context/pedidos/pedidosContext'
import GlobalStyles, { colors as globalColors} from '../styles/globalStyles'
import { useNavigation } from '@react-navigation/native'
import {
    Container,
    Content,
    Footer,
    FooterTab,
    Button,
    Body,
    Text,
    H1,
    Card,
    CardItem
} from 'native-base'

import FormularioPlatillo from './FormularioPlatillo'

const DetallePlatillo = () => {
    // Context de pedidos
    const { platillo } = useContext(PedidosContext)

    // Destructuring
    const { nombre, categoria, id, descripcion, precio, imagen } = platillo

    // Hook navigation
    const navigation = useNavigation()

    return ( 
        <Container style={GlobalStyles.contenedor}>
            <Content style={GlobalStyles.contenido}>
                <H1 style={GlobalStyles.titulo}>{nombre}</H1>
                <Card>
                    <CardItem>
                        <Body>
                            <Image 
                                source={{ uri: imagen }}
                                style={GlobalStyles.imagen}
                            />
                            <Text 
                                style={{ marginTop: 20 }}
                            >{descripcion}</Text>
                            <Text style={GlobalStyles.cantidad}>Precio: $ {precio}</Text>
                        </Body>
                    </CardItem>
                </Card>
                <FormularioPlatillo />
            </Content>
            {/* <Footer>
                <FooterTab>
                    <Button
                        style={GlobalStyles.boton}
                        onPress={ () => {
                            navigation.navigate('FormularioPlatillo')
                        }}
                    >
                        <Text
                            style={ GlobalStyles.botonTexto }
                        >Ordenar platillo</Text>
                    </Button>
                </FooterTab>
            </Footer> */}
        </Container>
     );
}
 
export default DetallePlatillo