import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import Config from 'react-native-config';
import { unzip } from 'react-native-zip-archive';
import RNFS from 'react-native-fs';
import { TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { AppDispatch } from '../../store';
import { fetchGameCategories } from '../../store/gameCategories-slice';
import client from '../../api/client';

const GameUploader = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const [cssContent, setCssContent] = useState('');
  const [javascriptContent, setJavascriptContent] = useState('');
  const [gameName, setGameName] = useState('');
  const [gameDescription, setGameDescription] = useState('');
  const [category, setCategory] = useState('');
  const gameCategories = useSelector((state: RootState) => state.gameCategories.gameCategories);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchGameCategories());
  }, []);

  const resolveContentUri = async (uri: string) => {
    try {
      const filePath = `${RNFS.TemporaryDirectoryPath}/temp.zip`; // Temporary path to store the copied file
      console.log('filePath', filePath);
      if (Platform.OS === 'android') {
        await RNFS.copyFile(uri, filePath);
        return filePath;
      } else {
        // For iOS, just return the URI as is
        return uri;
      }
    } catch (error) {
      console.error('Error resolving content URI:', error);
      return '';
    }
  };

  const handleSelectFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.zip],
      });
      const filePath = await resolveContentUri(res.uri);
      console.log('virtual', res);
      console.log('actual', filePath);
      const content = await readFiles(filePath, gameName);
      console.log('cotent', content);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled zip upload');
      }
      console.log(err);
    }
  };

  const readFiles = async (fileUri: string, gameTitle: string) => {
    try {
      const direcotryName = gameTitle.split(' ').join('');
      const unzipPath: string = `${RNFS.DocumentDirectoryPath}/unzippedFiles/${direcotryName}`;
      console.log('unzipPath', unzipPath);
      await unzip(fileUri, unzipPath);
      const directory = (await RNFS.readDir(unzipPath))[0];
      const directoryPath = directory.path;

      // Create an array to hold the contents of all file

      // TODO hardcoding names for now
      // find file names in directory and then create fileNames array
      const fileNames = ['index.html', 'styles.css', 'script.js'];
      // Read the contents of each file
      for (const file of fileNames) {
        const content = await RNFS.readFile(`${directoryPath}/${file}`, 'utf8');
        if (file.endsWith('.html')) {
          setHtmlContent(content);
        } else if (file.endsWith('.css')) {
          setCssContent(content);
        } else if (file.endsWith('.js')) {
          setJavascriptContent(content);
        }
      }
    } catch (error) {
      console.log('[Error]:', error);
    }
  };

  const handleUpload = async() => {
    console.log(htmlContent, 'htmlContent');
    const payload = {
      htmlContent,
      cssContent,
      javascriptContent,
      title: gameName,
      description: gameDescription,
      category
    };
    const headers = {
      'Content-Type': 'application/json',
    }
    const resp = await client.post('/games/upload-game', payload, { headers });
    console.log(resp.data);
  };

  return (
    <View>
      <TextInput
        keyboardType='default'
        value={gameName}
        onChangeText={(text) => setGameName(text)}
        placeholderTextColor={'#AEAEAE'}
        placeholder="Game name"
        style={styles.input}
      />
      <TextInput
        keyboardType='default'
        value={gameDescription}
        onChangeText={(text) => setGameDescription(text)}
        placeholderTextColor={'#AEAEAE'}
        placeholder="Game description"
        style={styles.input}
      />
      <Picker
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue: string, itemIndex) => setCategory(itemValue)}
      >
        {gameCategories.map(gameCategory => (
          <Picker.Item key={gameCategory._id} label={gameCategory.title} value={gameCategory._id}/>
        ))}
      </Picker>
      <Button title="Select File" onPress={handleSelectFile} />
      <Button title="Upload File" onPress={handleUpload} />
    </View>
  );
};

export default GameUploader;

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#FCF8FF',
    padding: 10,
    height: 40,
    alignSelf: 'center',
    borderRadius: 5,

    width: '80%',
    color: '#000000',

    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 1,
  },
});