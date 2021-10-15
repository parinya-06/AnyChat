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
import firestore, { firebase } from '@react-native-firebase/firestore';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import useStatsBar from '../utils/useStatusBar';
import Navbar from "../components/NavBar";
import { set } from 'react-native-reanimated';
export default function AddFriendScreen({ route, navigation }) {
  useStatsBar('dark-content');


  /**
   * Create a new Firestore collection to save threads
   */
  const { pid } = route.params;
  const { _id } = route.params;
  const { email } = route.params;
  console.log(pid);
    
  function Addfriend() {
      firestore()
        .collection('FRIENDS')
        .doc(pid)
        .collection('MYFRIENDS')
        .add({
          ID: _id,
          email: email
    });
    navigation.navigate('ChekFriends')
  };
    
  
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
        <Navbar title={email} />
          <View style={{ paddingTop: 20 }}>
            {/* <Button title={"Richie"} onPress={() => this._chat("Richie", "admin")} /> */}
            {/* <Button color="#2ECC71" title={'ADD'} onPress={add} /> */}
            <Button color="#2ECC71" title={'ADD'} onPress={Addfriend} />
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