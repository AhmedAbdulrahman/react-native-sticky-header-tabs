import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SectionList from './src';
import { data } from './dump';

const { width } = Dimensions.get('window');
const TAB_BUTTON_SIZE = width / 3.29;

function HomeScreen() {
  const sections = data.map((item, index) => ({
    ...item,
    index
  }));

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={item => item.title}
        stickySectionHeadersEnabled={false}
        scrollToLocationOffset={10}
        tabBarStyle={styles.tabBar}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderTab={({ title, backgroundImage, index, isActive }) => (
          <View
            key={`${title}-${index}`}
            style={[
              styles.tabContainer,
              { borderBottomWidth: isActive ? 2 : 0 }
            ]}
          >
            <View style={styles.tabBarButton}>
              <Image
                resizeMode="cover"
                style={styles.tabBarImage}
                source={backgroundImage}
              />
              <Text
                style={[
                  styles.tabText,
                  { color: isActive ? '#090909' : '#9e9e9e' }
                ]}
              >
                {title}
              </Text>
            </View>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <View key={`${section.title}-${section.index}`}>
            <View style={styles.sectionHeaderContainer} />
            <Text style={styles.sectionHeaderText}>{section.title}</Text>
          </View>
        )}
        renderItem={({ item, index }) => (
          <>
            <View style={styles.itemContainer} key={`${item.title}-${index}`}>
              <View style={styles.content}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
              </View>
              <View style={styles.imageContainer}>
                <Image
                  resizeMode="cover"
                  style={styles.food}
                  source={{
                    uri: item.food
                  }}
                />
              </View>
            </View>
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    position: 'relative'
  },
  tabBar: {
    backgroundColor: '#fff',
    borderBottomColor: '#EAEAEA',
    borderBottomWidth: 1
  },
  tabContainer: {
    borderBottomColor: '#090909'
  },
  tabBarButton: {
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 20,
    width: TAB_BUTTON_SIZE
  },
  tabBarImage: {
    marginBottom: 6,
    width: 100,
    height: 100
  },
  tabText: {
    color: '#9e9e9e',
    fontSize: 18,
    fontWeight: '500'
  },
  separator: {
    height: 0.5,
    width: '96%',
    alignSelf: 'flex-end',
    backgroundColor: '#eaeaea'
  },
  sectionHeaderContainer: {
    height: 10,
    backgroundColor: '#f6f6f6',
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: 1
  },
  sectionHeaderText: {
    color: '#010101',
    fontSize: 23,
    fontWeight: 'bold',
    paddingTop: 25,
    paddingBottom: 10,
    paddingHorizontal: 15
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 35
  },
  content: {
    width: width / 2,
    padding: 15
  },
  imageContainer: {
    flex: 1,
    padding: 0,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    shadowColor: 'rgba(50, 50, 50, 0.29)',
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.89,
    shadowRadius: 8.3,

    elevation: 13
  },
  itemTitle: {
    fontSize: 20,
    color: '#131313'
  },
  itemPrice: {
    fontSize: 18,
    color: '#131313'
  },
  itemDescription: {
    marginTop: 10,
    color: '#b6b6b6',
    fontSize: 16
  },
  food: {
    position: 'absolute',
    top: -10,
    width: '80%',
    height: '80%'
  }
});

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Sticky Header"
          headerStyle={{ borderBottomWidth: 0 }}
          component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
