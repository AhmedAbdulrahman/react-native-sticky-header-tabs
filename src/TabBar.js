import * as React from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StyleSheet
} from 'react-native';

const { width: wWidth } = Dimensions.get('window');

const TabBar = React.memo(props => {
  const { currentIndex, renderTab, onPress, sections } = props;

  return (
    <View style={[{ width: wWidth, position: 'relative' }]}>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.sectionContainer}>
          {sections.map((section, key) => {
            const isActive = currentIndex === key;
            return (
              <TouchableOpacity
                onPress={() => onPress(key)}
                key={`${section.title}-${key}`}
              >
                {renderTab({ isActive, ...section })}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  contentContainerStyle: { flexDirection: 'row' },
  sectionContainer: {
    flexDirection: 'row'
  }
});

export default TabBar;
