import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

const httplink = new HttpLink({
  uri:
    'https://www.graphqlhub.com/playground?query=%7B%0A%20%20graphQLHub%0A%20%20twitter%20%7B%0A%20%20%20%20search(q%3A%20%22Javascript%22%2C%20count%3A%2010%2C%20result_type%3A%20mixed)%20%7B%0A%20%20%20%20%20%20user%20%7B%0A%20%20%20%20%20%20%20%20screen_name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20text%0A%20%20%20%20%20%20retweet_count%0A%20%20%20%20%20%20user%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20profile_image_url%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A',
});

const client = new ApolloClient({
  link: httplink,
  cache: new InMemoryCache(),
});

export default client;
