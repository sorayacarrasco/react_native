import React from 'react';
import { Card } from '@rneui/themed';
import { Text } from 'react-native';


function Historia(){
    return(
        <Card>
        <Card.Title>Un poquito de historia</Card.Title>
        <Card.Divider/>
        <Text style={{margin: 20}}>
        El nacimiento del club de montaña Gaztaroa se remonta a la primavera de 1976 cuando jóvenes aficionados a la montaña y pertenecientes a un club juvenil decidieron crear la sección montañera de dicho club. Fueron unos comienzos duros debido sobre todo a la situación política de entonces. Gracias al esfuerzo económico de sus socios y socias se logró alquilar una bajera. Gaztaroa ya tenía su sede social.
        {'\n'}{'\n'}
        Desde aquí queremos hacer llegar nuestro agradecimiento a todos los montañeros y montañeras que alguna vez habéis pasado por el club aportando vuestro granito de arena.
        {'\n'}{'\n'}
        Gracias!
        </Text>
        </Card>
    );
}

export default Historia;