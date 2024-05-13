import { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import client from "../../api/client";
import { useSelector } from "react-redux";
import globalStyles from "../../constants/styles";
import MedPresCard from "./MedicinePresCard";
import Game from "../Game";


const gameImages: { [key: string]: any } = {
    'Crossy Road': require('../../../assets/games/cross.png'),
    'Tic Tac Toe': require('../../../assets/games/tic-tac-toe.png'),
};

const GamePrescriptionDisplay: React.FC<{ patientId: string }> = ({ patientId }) => {
    const authToken = useSelector((state: Record<string, { token: string | null }>) => state.authToken.token);
    const [games, setGames] = useState<any[]>([]);

    useEffect(() => {
        const headers = {
            'Authorization': `Bearer ${authToken}`
        };
        const fetchGames = async () => {
            const resp = await client.get(`/patients/games/patient/${patientId}`, { headers });
            if (resp.data.status === 'success') {
                setGames(resp.data.games);
            }
            console.log('game display', resp.data);
        };
        fetchGames();
    }, [patientId]);


    return (
        <ScrollView style={styles.scrollViewStyle}>
            {games && games.map((item, index) => (
                <Game
                    key={index}
                    title={item.title}
                    imageUrl={gameImages[item.title]}
                    description={item.description}
                    categoryTitle={item.category}
                />
            ))}
        </ScrollView>
    );
}

export default GamePrescriptionDisplay;

const styles = StyleSheet.create({
    scrollViewStyle: {
        // height: '5%', // Or a fixed value like 300
        alignSelf: 'center', // This will center the ScrollView
        width: '100%'
    },
});