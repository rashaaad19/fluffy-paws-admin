import { useRoute } from '@react-navigation/native'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const DetailsScreen = () => {
    const route = useRoute();
    const {item} = route.params;
    console.log(item)
  return (
    <SafeAreaView>
      <Text>DetailsScreen</Text>
    </SafeAreaView>
  )
}

export default DetailsScreen