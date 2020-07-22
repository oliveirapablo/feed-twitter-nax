/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableHighlight,
  Image,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  const consumirAPI = async (graphqlEndpoint, query, variables = {}) => {
    const response = await fetch(graphqlEndpoint, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({query, variables}),
    });

    return response.json();
  };

  const GRAPHQL_ENDPOINT = 'https://www.graphqlhub.com/graphql?pretty=true';

  const query = `{
    graphQLHub
    twitter {
      user (identifier: name, identity: "clayallsopp") {
        created_at
        description
        id
        screen_name
        name
        profile_image_url
        url
        tweets_count
        followers_count
        tweets(limit: 1) {
          text
        }
      }
      tweet(id: "687433440774459392") {
        text,
        retweets(limit: 2) {
          id,
          retweeted_status {
            id
          }
          user {
            screen_name
          }
        }
      }
      search(q: "Javascript", count: 1, result_type: mixed) {
        user {
          screen_name
        }
        id
        text
      }
    }
  }`;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <TouchableHighlight
                onPress={() =>
                  consumirAPI(GRAPHQL_ENDPOINT, query).then((resp) => {
                    console.log(resp.data.twitter);
                  })
                }>
                <Image
                  source={require('./src/images/perfiltwi.jpg')}
                  style={styles.image}
                  resizeMode="cover"
                />
              </TouchableHighlight>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  image: {
    width: '10%',
    height: 60,
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
});

export default App;
