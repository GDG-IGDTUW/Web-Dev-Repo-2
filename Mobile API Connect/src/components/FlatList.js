import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

// Get the width of the device's screen
const { width } = Dimensions.get('window');
// Check if the platform is iOS
const isIOS = Platform.OS === 'ios';

// Main component to display a paginated, searchable list of contacts
export default class FlatListExample extends Component {
  state = {
    text: '',           // Input text for search
    contacts: [],       // Contacts to display in the FlatList
    allContacts: [],    // Full list of contacts fetched from the API
    page: 1,            // Current page for pagination
    refreshing: false,  // Flag to handle pull-to-refresh
  };

  constructor() {
    super();
    // Prevents triggering pagination multiple times during momentum scroll
    this.duringMomentum = false;
  }

  // Lifecycle method called after the component is mounted
  componentDidMount() {
    this.getContacts(); // Fetch initial contacts
  }

  /**
   * Fetches a list of contacts from the API and updates the state.
   * If refreshing, reverses the order of the users for better UX.
   */
  getContacts = async () => {
    this.setState({ loading: true }); // Show loading indicator

    try {
      const {
        data: { results: contacts },
      } = await axios.get(
        `https://randomuser.me/api?results=10&page${this.state.page}`
      );

      const users = [...this.state.contacts, ...contacts];

      if (this.state.refreshing) {
        users.reverse();
      }

      this.setState({
        contacts: users,
        allContacts: users,
        loading: false,
        refreshing: false,
      });
    } catch (error) {
      console.error('Error fetching contacts:', error);
      this.setState({ loading: false });
    }
  };

  /**
   * Refreshes the list of contacts (pull-to-refresh action).
   */
  onRefresh = () => {
    this.setState(
      { page: 1, refreshing: true },
      () => {
        this.getContacts(); // Re-fetch the data
      }
    );
  };

  /**
   * Loads more contacts when the user scrolls to the end of the list.
   */
  loadMore = () => {
    if (!this.duringMomentum) {
      this.setState(
        { page: this.state.page + 1 },
        () => {
          this.getContacts(); // Fetch the next page
        }
      );
      this.duringMomentum = false;
    }
  };

  /**
   * Renders a single contact item.
   * @param {Object} item - The contact object.
   * @param {number} index - The index of the contact in the list.
   */
  renderContactsItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={[
          styles.itemContainer,
          { backgroundColor: index % 2 === 0 ? 'white' : '#efefef' },
        ]}
      >
        <Image source={{ uri: item.picture.medium }} style={styles.image} />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{item.name.first}</Text>
          <Text style={styles.company}>{item.location.state}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  /**
   * Renders a footer for the FlatList to show a loading indicator.
   */
  renderFooter = () => {
    if (!this.state.loading) {
      return null; // Return nothing if not loading
    }
    return (
      <View style={{ paddingVertical: 30 }}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  /**
   * Renders a header for the FlatList with a search input.
   */
  renderHeader = () => {
    const { text } = this.state;
    return (
      <TextInput
        onFocus={() => (this.duringMomentum = true)}
        onBlur={() => (this.duringMomentum = false)}
        onChangeText={(text) => {
          this.setState({ text });
          this.searchFilter(text);
        }}
        value={text}
        style={styles.myInput}
        secureTextEntry={false}
        autoCapitalize="words" // Capitalize each word in the input
        placeholder="Enter a name"
      />
    );
  };

  /**
   * Filters the contact list based on the search text.
   * @param {string} text - The text to filter contacts by.
   */
  searchFilter = (text) => {
    const newData = this.state.allContacts.filter((item) => {
      const listItem = `${item.name.first.toLowerCase()}${item.location.state.toLowerCase()}`;
      return listItem.indexOf(text.toLowerCase()) > -1;
    });

    this.setState({ contacts: newData });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          ListFooterComponent={this.renderFooter}
          ListHeaderComponent={this.renderHeader}
          renderItem={this.renderContactsItem}
          data={this.state.contacts}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={this.loadMore}
          onEndReachedThreshold={isIOS ? 0.5 : 20}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
        />
      </SafeAreaView>
    );
  }
}

// Styles for the component
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ddd',
    justifyContent: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    height: 100,
    borderBottomWidth: 1,
    borderColor: '#eeee',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  nameContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  company: {
    marginTop: 5,
  },
  myInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#dddd',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 12,
  },
});
