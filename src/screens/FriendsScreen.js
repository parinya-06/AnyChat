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
import { firebase } from '@react-native-firebase/auth';

export default function FriendsScreen({ navigation }) {
  useStatsBar('dark-content');
  const [roomName, setRoomName] = useState('');

  function User({ uuid }) {
    useEffect(() => {
      const subscriber = firestore()
        .collection('CHAT_USER')
        .doc(uuid)
        .onSnapshot(documentSnapshot => {
          console.log('User data: ', documentSnapshot.data());
        });

      // Stop listening for updates when no longer required
      return () => subscriber();
    }, [uuid]);
  }
  /**
   * Create a new Firestore collection to save threads
   */
  function showFriends() {

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
            {/* email: k1234@gmail.com  */}
            <Button title={'uuid: WTzhgMQUn3O7pDj8V5Nzis3FOy43'} />
          </View>
          <View style={{ paddingTop: 5 }}>
            {/* email: test@gmail.com  */}
            <Button title={'uuid: 7z1Zo4fLIvVlIeF8KI4T5sZMOwM2'} />
          </View>
          <View style={{ paddingTop: 5 }}>
            {/* email: jame@gmail.com  */}
            <Button title={'uuid: mYpVzhDRLzXDeaaCLCZxAKqaiM13'} />
          </View>
          <View style={{ paddingTop: 5 }}>
            {/* email: satawat@gmail.com */}
            <Button title={'uuid: IkbzpF1t3QhI4xKivoKZ4gfwPL73'} />


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
