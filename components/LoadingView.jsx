import { View } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'

const LoadingView = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <ActivityIndicator size="large" animating={true} color="#be5985" />
  </View>

  )
}

export default LoadingView