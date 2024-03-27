import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TransactionDetail = ({ route, navigation }) => {
  const { transaction } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: "Transaction Detail" });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.label___}>${transaction.amount}</Text>
        <Text style={styles.label}>{transaction.name}</Text>
        <Text style={styles.label}>{transaction.location}</Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.label_}>Transaction Date</Text>
        <Text style={styles.label__}>{transaction.date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  infoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#3498db',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 15,
    marginTop: 15,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  label_: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
    paddingHorizontal: 10,
  },
  label__: {
    fontSize: 16,
    marginBottom: 10,
    color: 'grey',
    paddingHorizontal: 10,
  },
  label___: {
    fontSize: 24,
    marginBottom: 10,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TransactionDetail;
