import React, { useContext } from 'react'
import PedidosContext from '../context/pedidos/pedidosContext'
import { Text, Button, Icon } from 'native-base'
import { colors as globalColors} from '../styles/globalStyles'
import { useNavigation } from '@react-navigation/native'

const BotonResumen = () => {
    // Context de pedidos
    const { pedido } = useContext(PedidosContext)

    // Hook navigation
    const navigation = useNavigation()

    return ( 
        <Button
            rounded
            transparent
            style={{ backgroundColor: globalColors.amarillo }}
            onPress={ () => navigation.navigate('ResumenPedido') }
        >
            <Icon 
                style={{ color: globalColors.negro }}
                name="cart-outline"
            />
            {
                pedido.length > 0 && (
                    <Text
                        style={{
                            position: 'absolute',
                            right: 10,
                            top: 2,
                            color: globalColors.blanco,
                            backgroundColor: globalColors.negro,
                            borderRadius: 100,
                            paddingRight: 6,
                            paddingLeft: 6,
                            paddingVertical: 1,
                            margin: 0,
                            fontSize: 12
                        }}
                    >{pedido.length}</Text>
                )
            }
        </Button>
    )
}
 
export default BotonResumen