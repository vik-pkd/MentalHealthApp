import React, { useState, useCallback } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { useLogin } from '../context/LoginProvider';


interface VideoCardProps {
    title: string;
    bodyText: string;
    videoId: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ title, bodyText, videoId }) => {
    const [playing, setPlaying] = useState(false);
    const [finished, setFinished] = useState(false);  // New state to track if video is finished
    const { updateUserPoints } = useLogin();

    const togglePlaying = useCallback(() => {
        if (!finished) {  // Allow toggling only if video is not finished
            setPlaying(prev => !prev);
        }
    }, [finished]);

    const onStateChange = useCallback((state: string) => {
        if (state === 'ended') {
            setPlaying(false);
            setFinished(true);  // Set finished to true when video ends
            Alert.alert('You earned a point!');
            updateUserPoints(1);
        }
    }, [updateUserPoints]);

    return (
        <View style={styles.container}>
            <View pointerEvents="none">
                <YoutubePlayer
                    height={200}
                    play={playing}
                    videoId={videoId}
                    onChangeState={onStateChange}
                />
                {finished && <View style={styles.overlay} />}
            </View>
            <Text style={styles.card2Text}>{title}</Text>
            <Text style={styles.card2BodyText}>{bodyText}</Text>
            <View style={styles.buttonContainer}>
                <Button
                    title={finished ? 'Finished' : (playing ? 'Pause' : 'Play')}
                    onPress={togglePlaying}
                    color="rgba(156,77,204, 1)"
                    disabled={finished}  // Disable the button if the video is finished
                />
            </View>
        </View>
    );
};

export default VideoCard;

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent',
    },
    container: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 0,
        margin: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    card2Text: {
        color: '#000000',
        fontSize: 18,
        fontWeight: '400',
        paddingLeft: 8,
        marginBottom: 5
    },
    card2BodyText: {
        color: '#57606f',
        fontSize: 14,
        fontWeight: '400',
        paddingLeft: 8,
    },
    buttonContainer: {
        padding: 8,
        marginTop: 5,
        marginBottom: 5
    }
});
