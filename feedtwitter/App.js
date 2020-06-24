/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import axios from 'axios';

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  Modal,
  FlatList,
} from 'react-native';

import {ApolloProvider} from 'react-apollo';

import apolloClient from './src/services/apollo';
import Tweets from './src/components/Tweets';

const App: () => React$Node = () => {
  const apiUrl = 'http://www.omdbapi.com/?apikey=b577e7a5';
  const [state, setState] = useState({
    s: '',
    results: [],
    selected: {},
  });
  // const [modalVisible, setModalVisible] = useState(false);

  // const [myMovies, setMyMovies] = useState([]);

  // const search = () => {
  //   axios(apiUrl + '&s=' + state.s).then(({data}) => {
  //     let results = data.Search;

  //     setState((prevState) => {
  //       return {...prevState, results: results};
  //     });
  //   });
  // };
  const openPopup = (id) => {
    axios(apiUrl + '&i=' + id).then(({data}) => {
      let result = data;

      setState((prevState) => {
        return {...prevState, selected: result};
      });
    });
  };

  return (
    <ApolloProvider client={apolloClient}>
      <Tweets />
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dcdce6',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 70,
  },
  title: {
    color: '#223343',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  seachBox: {
    fontSize: 20,
    fontWeight: '300',
    padding: 20,
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 30,
  },
  results: {
    flex: 1,
    width: '100%',
    marginBottom: 20,
  },
  heading: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    padding: 20,
    backgroundColor: '#445565',
  },
  image: {
    width: '100%',
    height: 300,
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  popup: {
    padding: 20,
  },
  poptitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 5,
  },
  cloneBtn: {
    padding: 10,
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
    backgroundColor: '#2484C4',
    width: 200,
    height: 50,
    marginLeft: 100,
    borderRadius: 20,
  },
  saveBtn: {
    padding: 10,
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
    backgroundColor: '#77DD77',
    width: 200,
    height: 50,
    marginTop: 10,
    marginLeft: 100,

    borderRadius: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  openButton: {
    backgroundColor: '#77D7',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
  },
  Myresults: {
    flex: 1,
    backgroundColor: '#6653',
  },
});

export default App;
