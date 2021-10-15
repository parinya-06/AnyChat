import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { IconButton, Title, Button, Dialog, Divider, List, Portal } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import useStatsBar from '../utils/useStatusBar';
import Loading from '../components/Loading';

export default function FriendsScreen({ navigation }) {
  useStatsBar('dark-content');

  // firestore()
  //   .collection('Friend')
  //   .doc('nUEKK9XBU5ad9EjWNjia61y8d8g2')
  //   .collection('Friends')
  //   .doc('W6CDh7sWx8iUwPZNjAKL')
  //   .get()
  //   .then(snapshot => {
  //     snapshot.forEach(doc => {
  //       const data = doc.data();
  //       console.log(doc.id, data);
  //     });
  //   })
  //   .catch(err => {
  //     console.log('Error getting documents', err);
  //   });

  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  /**
   * Fetch threads from Firestore
   */
  useEffect(() => {
    const unsubscribe = firestore()
      // .collection('THREADS')
      .collection('CHAT_USER')
      // .collection('Friend')
      // .doc('nUEKK9XBU5ad9EjWNjia61y8d8g2')
      // .collection('Friends')
      .onSnapshot(querySnapshot => {
        const threads = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            // give defaults
            email: '',

            _id: '',
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
          color='#6646ee'
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.innerContainer}>
        <Title style={styles.title}>My Friends</Title>
        {/* <Text style={{ fontSize: 20 }} >{ }</Text> */}
      </View>
      <View style={styles.container}>
        <FlatList
          data={threads}
          // keyExtractor={item => item._id}
          // ItemSeparatorComponent={() => <Divider />}
          renderItem={({ item }) => (
            <TouchableOpacity
              onLongPress={() => Alert.alert("MyFriend")}
            >
              <List.Item
                title={item.email}
                description={item._id}
              // titleNumberOfLines={1}
              // titleStyle={styles.listTitle}
              // descriptionStyle={styles.listDescription}
              // descriptionNumberOfLines={1}
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
  container:{
    margin:20,
    padding:0
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    marginBottom: 0
  },
  buttonLabel: {
    fontSize: 22
  }
});
