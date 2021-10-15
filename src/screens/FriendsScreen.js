import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { IconButton, Title, Button, Dialog, Divider, List, Portal } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import useStatsBar from '../utils/useStatusBar';
import Loading from '../components/Loading';
import { AuthContext } from '../navigation/AuthProvider';

export default function FriendsScreen({ navigation }) {
  useStatsBar('dark-content');
  const [roomName, setRoomName] = useState('');

  const { user } =useContext(AuthContext);
  const currentUser = user.toJSON();
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  /**
   * Fetch threads from Firestore
   */
   useEffect(() => {
    const unsubscribe = firestore()
      .collection('FRIENDS')
      .doc(currentUser.uid)
      .collection('MYFRIENDS')
      .onSnapshot(querySnapshot => {
        const threads = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            // give defaults
            email: '',
            // uuid: '',
            ID: '',
            ...documentSnapshot.data()
          
          };
        });
       
        setThreads(threads);

        if (loading) {
          setLoading(false);
        }
      });

    /**
     * unsubscribe listener
     */
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loading />;
  }
  
  return (
    <View style={styles.rootContainer}>
      <View style={styles.closeButtonContainer}>
        <IconButton
          icon='close-circle'
          size={36}
          color='#000000'
          onPress={() => navigation.goBack()}
        />
      </View>
      {/* <View style={styles.innerContainer}>
        <Title style={styles.title}>Friends</Title>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Navbar title={"Friends"} />
          <View style={{ paddingTop: 20 }}>
          <Button color="#2ECC71" title={pid} />
          </View>
        </View>
      </View> */}
      <View style={styles.innerContainer}>
        <Title style={styles.title}>My Friends</Title>
        {/* <Text style={{ fontSize: 20 }} >{ }</Text> */}
      </View>

      <View style={styles.container}>
        <FlatList
          data={threads}
          renderItem={({ item }) => (
            <TouchableOpacity
              onLongPress={() => Alert.alert("MyFriend")}
            >
              <List.Item
                title={item.email}
                // description={item.uuid}
                description={item.ID}
              />
            </TouchableOpacity>
          )}
        />
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
    alignItems: 'center',
    backgroundColor: '#ff5722'
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