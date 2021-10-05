import React, { useState } from 'react';
import {
  GiftedChat,
  Bubble,
  Send,
  Avatar,
  SystemMessage
} from 'react-native-gifted-chat';
import { View, StyleSheet, Text, Button } from 'react-native';
import { IconButton, Title } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import useStatsBar from '../utils/useStatusBar';
import Navbar from "../components/NavBar";

export default function FriendsScreen({ navigation }) {
  useStatsBar('dark-content');
  const [roomName, setRoomName] = useState('');

  /**
   * Create a new Firestore collection to save threads
   */
  function showFriends() {
    if (roomName.length > 0) {
      firestore()
        .collection('THREADS')
        .add({
          name: roomName,
          latestMessage: {
            text: `You have joined the room ${roomName}.`,
            createdAt: new Date().getTime()
          }
        })
        .then(docRef => {
          docRef.collection('MESSAGES').add({
            text: `You have joined the room ${roomName}.`,
            createdAt: new Date().getTime(),
            system: true
          });
          navigation.navigate('Home');
        });
    }
  }
  return (
    <View style={styles.rootContainer}>
      <View style={styles.closeButtonContainer}>
        <IconButton
          icon='close-circle'
          size={36}
          color='#6646ee'
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.innerContainer}>
        <Title style={styles.title}>Friends</Title>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Navbar title={"Friends"} />
          <View style={{ paddingTop: 20 }}>
            {/* <Button title={"Richie"} onPress={() => this._chat("Richie", "admin")} /> */}
            <Button title={'_id'} />

          </View>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 30,
    right: 0,
    zIndex: 1
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    // marginBottom: 10
    marginTop: 60
  },
  buttonLabel: {
    fontSize: 22
  }
});
