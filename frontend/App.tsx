import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import React from 'react'

export default function App() {
  return (
    <SafeAreaView>
      <ScrollView>
        <Text style={styles.headingText}> Stats</Text>
      </ScrollView>
      <View>
        
      </View>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headingText : {
    fontSize : 30,
    fontWeight : 'bold',
  }
})