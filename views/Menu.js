import React, { useContext, useEffect, Fragment } from 'react'
import FirebaseContext from '../context/firebase/firebaseContext'
import PedidosContext from '../context/pedidos/pedidosContext'
import GlobalStyles, { colors as globalColors} from '../styles/globalStyles'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { 
    Spinner,
    Container,
    Separator,
    Content,
    List,
    ListItem,
    Thumbnail,
    Text,
    Left,
    Body
} from 'native-base'

const Menu = () => {

    // Context de Firebase
    const { menu, obtenerProductos } = useContext(FirebaseContext)

    // Context de Pedidos
    const { seleccionarPlatillo } = useContext(PedidosContext)

    // Hook para redireccionar
    const navigation = useNavigation()

    useEffect(() => {
        obtenerProductos()
    }, [])

    
    const mostrarHeading = (categoria, i) => {
        if(i > 0){
            const categoriaAnterior = menu[i - 1].categoria

            if(categoriaAnterior !== categoria)
                return (
                    <Separator
                        style={GlobalStyles.separador}
                    >
                        <Text style={GlobalStyles.separadotTexto}>{categoria}</Text>
                    </Separator>
                )
        } else {
            return (
                <Separator
                    style={GlobalStyles.separador}
                >
                    <Text style={GlobalStyles.separadotTexto}>{categoria}</Text>
                </Separator>
            )
        }
    }
    
    // Si aún no hay datos
    if(menu.length === 0) return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Spinner color={globalColors.amarillo} />
        </View>
    )

    return ( 
        <Container style={GlobalStyles.contenedor }>
            <Content style={{ backgroundColor: globalColors.blanco  }}>
                <List>
                    {
                        menu.map((platillo, i) => {
                            // Destructuring
                            const { categoria, imagen, nombre, descripcion, id, precio } = platillo

                            return (
                                <Fragment key={id}>
                                    { mostrarHeading(categoria, i) }
                                    <ListItem
                                        onPress={ () => {
                                            // Eliminar propiedades del platillo
                                            const { existencia, ...platillo2 } = platillo

                                            seleccionarPlatillo(platillo2)
                                            navigation.navigate('DetallePlatillo')
                                        } }
                                    >
                                        <Thumbnail
                                            large
                                            square
                                            source={{ uri: imagen }}
                                        />
                                        <Body>
                                            <Text
                                                style={{ color: globalColors.negro }}
                                            >{nombre}</Text>
                                            <Text
                                                note
                                                numberOfLines={2}
                                            >{descripcion}</Text>
                                            <Text
                                                style={{ color: globalColors.negro, fontWeight: 'bold' }}
                                            >Precio: $ {precio}</Text>
                                        </Body>
                                    </ListItem>
                                </Fragment>
                            )
                        })
                    }
                </List>
            </Content>
        </Container>
     );
}
 
export default Menu