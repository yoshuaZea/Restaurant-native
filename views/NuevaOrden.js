import React from 'react'
import { View, Image, ScrollView } from 'react-native'
import GlobalStyles from '../styles/globalStyles'
import { Container, Button, Text, H1 } from 'native-base'
import { useNavigation } from '@react-navigation/native'

const NuevaOrden = () => {


    // Hook de navegación
    const navigation = useNavigation()

    return ( 
        <Container style={GlobalStyles.contenedor}>
            <View style={[ GlobalStyles.principal, GlobalStyles.contenidoNuevaOrden ]}>

                <Text style={[ GlobalStyles.titulo, { marginTop: -50 }]}>¡ Bienvenido !</Text>

                <ScrollView
                    horizontal
                    style={{ maxHeight: 250 }}
                >
                   <View>
                       <Image
                            style={GlobalStyles.portada}
                            source={ require('../assets/img/restaurant.jpg') }
                        />
                   </View>
                   <View>
                        <Image
                            style={GlobalStyles.portada}
                            source={ require('../assets/img/pancito.jpg') }
                        />
                   </View>
                   <View>
                        <Image
                            style={GlobalStyles.portada}
                            source={ require('../assets/img/pozole.jpg') }
                        />
                   </View>
                </ScrollView>
                
                <Button
                    rounded
                    block
                    style={[ GlobalStyles.boton, {marginTop: 20 } ]}
                    onPress={ () => navigation.navigate('Menu') }
                >
                    <Text style={GlobalStyles.botonTexto}>Nueva orden</Text>
                </Button>
                
            </View>
        </Container>
     )
}
 
export default NuevaOrden