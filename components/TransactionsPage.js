import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button, Modal, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import firebase from '../database/firebaseConfig';

const db = firebase.database();

const TransactionsPage = ({ navigation }) => {
  const [transactions, setTransactions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTransactionName, setNewTransactionName] = useState('');
  const [newTransactionAmount, setNewTransactionAmount] = useState('');
  const [newTransactionDate, setNewTransactionDate] = useState('');
  const [newTransactionCity, setNewTransactionCity] = useState('');
  const [newTransactionProvince, setNewTransactionProvince] = useState('');

  useEffect(() => {
    const transactionsRef = db.ref('transactionsData');
    const handleData = (snapshot) => {
      const transactionsData = snapshot.val();
      if (transactionsData) {
        setTransactions(Object.values(transactionsData));
      } else {
        setTransactions([]);
      }
    };

    transactionsRef.on('value', handleData);

    return () => {
      transactionsRef.off('value', handleData);
    };
  }, []);

  const addTransaction = () => {
  const newTransaction = {
    id: transactions.length + 1,
    name: newTransactionName,
    amount: newTransactionAmount,
    date: newTransactionDate,
    location: `${newTransactionCity}, ${newTransactionProvince}` 
  };

  db.ref('transactionsData').push(newTransaction);
  setModalVisible(false);
};


  const renderTransactionItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.transactionItem} 
      onPress={() => navigation.navigate('TransactionDetail', { transaction: item })}
    >
      <Text>{item.name}</Text>
      <View style={styles.row}>
        <Text style={styles.amount}>${item.amount}</Text>
        <AntDesign name="right" size={20} color="#5F8CB9" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Button title="Add Record" onPress={() => setModalVisible(true)} />
      <FlatList 
        data={transactions} 
        renderItem={renderTransactionItem}
        keyExtractor={item => item.id.toString()}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add New Transaction</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              onChangeText={text => setNewTransactionName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Amount"
              keyboardType="numeric"
              onChangeText={text => setNewTransactionAmount(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Date (YYYY-MM-DD)"
              onChangeText={text => setNewTransactionDate(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="City"
              onChangeText={text => setNewTransactionCity(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Province"
              onChangeText={text => setNewTransactionProvince(text)}
            />
            <View style={styles.buttonContainer}>
              <Button title="Add Record" onPress={addTransaction} />
              <Button title="Cancel" onPress={() => setModalVisible(false)} color="#999" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: '#f0f0f0',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#999',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 5,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    marginRight: 10,
    fontSize: 16,
    color: 'blue',
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'lightgreen',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
});


export default TransactionsPage;
