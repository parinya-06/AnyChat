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

export default function AddFriendScreen({ route, navigation }) {
  useStatsBar('dark-content');


  /**
   * Create a new Firestore collection to save threads
   */
  const { _id } = route.params;
  function add() {

    firestore()
      .collection('CHAT_USER')
      .doc(_id)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const data = doc.data();
          console.log(doc.id, data);
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
    alert(_id)
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
        <Title style={styles.title}>Add Friend</Title>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Navbar title={"Add Friend"} />
          <View style={{ paddingTop: 20 }}>
            {/* <Button title={"Richie"} onPress={() => this._chat("Richie", "admin")} /> */}
            {/* <Button color="#2ECC71" title={'ADD'} onPress={add} /> */}
            <Button color="#2ECC71" title={'ADD'} onPress={add} />
          </View>
          <View style={{ paddingTop: 20 }}>
            <Button color="#DC7633" title={'Cancel'} onPress={() => navigation.goBack()} />
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
  b1: {
    backgroundColor: '#6646ee',
    borderRadius: 4,
    padding: 5
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
  },

});
