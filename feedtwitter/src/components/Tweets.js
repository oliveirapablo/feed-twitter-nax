import React, {Component} from 'react';
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

import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

class Profile extends Component {
  openPopup = () => {
    return true;
  };
  renderTweetsList = () => (
    <View>
      <ScrollView style={styles.results}>
        {console.log(this.props)}
        {this.props.data.twitter.search.map((result) => (
          <TouchableHighlight
            key={result.imdbID}
            onPress={() => this.openPopup(result.data.twitter.search.id)}>
            <View key={result.data.twitter.search.id} style={styles.result}>
              <Image
                source={{uri: result.data.twitter.search.profile_image_url}}
                style={styles.image}
                resizeMode="cover"
              />
              <Text style={styles.heading}>
                {result.data.twitter.search.text}
              </Text>
            </View>
          </TouchableHighlight>
        ))}
      </ScrollView>
    </View>
  );

  render() {
    console.log('AAAAQUI', this.props);

    const {tweets} = this.props;

    return this.renderTweetsList();
  }
}

const allTweets = gql`
  {
    graphQLHub
    twitter {
      search(q: "Javascript", count: 10, result_type: mixed) {
        user {
          screen_name
        }
        id
        text
        retweet_count
        user {
          name
          profile_image_url
        }
      }
    }
  }
`;

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

export default graphql(allTweets, {name: 'tweets'})(Profile);
