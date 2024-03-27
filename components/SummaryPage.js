import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firebase from '../database/firebaseConfig';

const db = firebase.database();

const SummaryPage = () => {
  const [transactions, setTransactions] = useState([]);

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

  const getNumberOfTransactions = () => transactions.length;

  const getBalance = () => {
    return transactions.reduce((total, transaction) => total + parseFloat(transaction.amount), 0).toFixed(2);
  };

  const getExtremeSpendingTransaction = (isHighest = true) => {
    if (transactions.length === 0) return null; // Return null if no transactions available
    return transactions.reduce((extreme, transaction) => {
      const extremeAmount = parseFloat(extreme.amount);
      const currentAmount = parseFloat(transaction.amount);
      return isHighest ? (currentAmount > extremeAmount ? transaction : extreme) : (currentAmount < extremeAmount ? transaction : extreme);
    }, transactions[0]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.label}>Transactions</Text>
        <Text style={styles.value}>{getNumberOfTransactions()}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.label}>Balance</Text>
        <Text style={styles.value}>${getBalance()}</Text>
      </View>
      <View>
        <Text style={styles.subtitle}>High Spending</Text>
        {getExtremeSpendingTransaction() ? (
          <View style={styles.itemContainer}>
            <Text>{getExtremeSpendingTransaction().name}</Text>
            <Text style={styles.highSpendingBalance}>${getExtremeSpendingTransaction().amount}</Text>
          </View>
        ) : (
          <Text>No transactions available</Text>
        )}
      </View>
      <View>
        <Text style={styles.subtitle}>Low Spending</Text>
        {getExtremeSpendingTransaction(false) ? (
          <View style={styles.itemContainer}>
            <Text>{getExtremeSpendingTransaction(false).name}</Text>
            <Text style={styles.highSpendingBalance}>${getExtremeSpendingTransaction(false).amount}</Text>
          </View>
        ) : (
          <Text>No transactions available</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: 'lightblue',
    borderRadius: 10,
    marginVertical: 10,
  },
  itemContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#aaa',
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'darkblue',
  },
  value: {
    fontSize: 16,
    color: 'green',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 15,
    color: 'darkblue',
    textAlign: 'center',
  },
  highSpendingBalance: {
    fontSize: 18,
    color: 'red',
    fontStyle: 'italic',
  },
});

export default SummaryPage;
