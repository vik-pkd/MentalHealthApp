import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import FancyCard from '../../components/FancyCard'
import BasicCard from '../../components/BasicCard'
import HistoryCard from '../../components/HistoryCards'

export default function Home() {
    return (
        <View>
            {/* <Text>Home</Text> */}
            <ScrollView>
                <FancyCard />
                <BasicCard />
                <HistoryCard />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    continer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    smallText: {
        color: '#000000'
    }


})