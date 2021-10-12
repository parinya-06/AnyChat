import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Button, Dialog, Divider, List, Portal } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Loading from '../components/Loading';
import useStatsBar from '../utils/useStatusBar';
import { useIsFocused } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
  useStatsBar('light-content');

  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  const [channels, setChannels] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [leaveChannel, setLeaveChannel] = useState(null);

  /**
   * Fetch threads from Firestore
   */
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('THREADS')
      .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const threads = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            // give defaults
            name: '',

            latestMessage: {
              text: ''
            },
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
  
  // LeaveChannel
  function handleLeaveChannel() {
    
  }
  function handleChannel() {

  }

  function handleDismissLeaveChannel() {
    setLeaveChannel(null);
  }


  return (
    <View style={styles.container}>
      <FlatList
        data={threads}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Room', { thread: item })}
            // onLongPress={() => Alert.alert("12345")}
            onLongPress={() => { /* Add this */
              setLeaveChannel(item);
            }}
          >
            <List.Item
              title={item.name}
              description={item.latestMessage.text}
              titleNumberOfLines={1}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              descriptionNumberOfLines={1}
            // style={ index%2==1?styles.backgroundEven:styles.backgroundOdd }
            />
          </TouchableOpacity>
        )}
      />

      {/* LeaveChannel     */}
      <Portal>
        <Dialog visible={leaveChannel} onDismiss={handleDismissLeaveChannel}>
          <Dialog.Title>Delete?</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={handleDismissLeaveChannel}>Cancel</Button>
            <Button onPress={handleChannel}>Edit</Button>
            <Button onPress={handleLeaveChannel}>Confirm</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1
  },
  listTitle: {
    fontSize: 22,
  },
  listDescription: {
    fontSize: 16
  },
  backgroundOdd: {
    backgroundColor: '#ff8a50'
  },
  backgroundEven: {
    backgroundColor: '#ffffff'
  }
});