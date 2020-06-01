import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/MaterialIcons';

export default class News extends Component {
  posts = [
    {
      id: 1,
      name: 'test',
      text: 'thử nhiệm xem nào',
      ava: require('../../Media/avatar/long.jpg'),
      image: require('../../Media/newfeed/1.jpg'),
    },
    {
      id: 2,
      name: 'test',
      text: 'thử nhiệm xem nào',
      ava: require('../../Media/avatar/long.jpg'),
      image: require('../../Media/newfeed/1.jpg'),
    },
    {
      id: 3,
      name: 'test',
      text: 'thử nhiệm xem nào',
      ava: require('../../Media/avatar/long.jpg'),
      image: require('../../Media/newfeed/1.jpg'),
    },
  ];
  renderPost = post => {
    return (
      <View style={styles.feedItem}>
        <Image
          source={require('../../Media/avatar/long.jpg')}
          style={styles.avatar}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Text style={styles.name}>A2795_Đỗ Lê Phi Long</Text>
            <Text>
              ..............................................................................................................
            </Text>
            <Image
              source={require('../../Media/newfeed/1.jpg')}
              style={styles.anhpost}
            />
            <View style={{flexDirection:'row'}}>
              <Icon name="heart-o" size={26} style={{marginRight: 16}} />
              <Icon2 name="comment" size={26} />
            </View>
          </View>
        </View>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.screenContainer}>
        <View style={styles.divider} />
        <View style={styles.headerContainer}>
          <FlatList
            style={styles.feed}
            data={this.posts}
            renderItem={({item}) => this.renderPost(item)}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'green',
    marginBottom: 20,
  },
  screenContainer: {
    flex: 1,
  },
  divider: {
    height: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  feed: {
    marginHorizontal: 16,
  },
  feedItem: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 8,
    flexDirection: 'row',
    marginVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
  },
  anhpost: {
    width: 300,
    height: 150,
    borderRadius: 5,
    marginVertical: 16,
  },
});
