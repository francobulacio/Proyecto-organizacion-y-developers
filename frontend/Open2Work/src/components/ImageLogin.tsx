import React from 'react'
import { Image, View, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

export const ImageLogin = React.memo(() => {

    return (
        <View style={{ flex: 1 }}>
            <Image
                source={require('../assets/imgs/laptop-programming-coding-macbook.jpg')}
                style={{
                    width: '100%',
                    height: 400,
                    resizeMode: 'cover',

                }}
            />
            <LinearGradient
                colors={['rgba(31,26,48,1)', 'rgba(0,0,0,0)', 'rgba(31,26,48,1)']}
                style={[
                    { ...StyleSheet.absoluteFillObject },
                ]}
            />
        </View>
    )
})


