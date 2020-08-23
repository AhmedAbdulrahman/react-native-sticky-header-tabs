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
  const { currentIndex, renderTab, onPress, sections, tabBarStyle } = props;

  const [tabsMeasurements, setTabsMeasurements] = React.useState({});

  const [
    tabContainerMeasurements,
    setTabContainerMeasurements
  ] = React.useState({});

  const scrollViewRef = React.useRef();

  React.useEffect(() => {
    if (scrollViewRef.current) {
      const pageOffset = 0;

      const containerWidth = wWidth;
      const tabWidth = tabsMeasurements[currentIndex]?.width;
      const nextTabMeasurements = tabsMeasurements[currentIndex + 1];
      const nextTabWidth = nextTabMeasurements?.width || 0;
      const tabOffset = tabsMeasurements[currentIndex]?.left;
      const absolutePageOffset = pageOffset * tabWidth;
      let newScrollX = tabOffset + absolutePageOffset;

      newScrollX -=
        (containerWidth -
          (1 - pageOffset) * tabWidth -
          pageOffset * nextTabWidth) /
        2;
      newScrollX = newScrollX >= 0 ? newScrollX : 0;

      const rightBoundScroll = Math.max(
        tabContainerMeasurements.width - containerWidth,
        0
      );

      newScrollX =
        newScrollX > rightBoundScroll ? rightBoundScroll : newScrollX;

      scrollViewRef.current.scrollTo({
        x: newScrollX,
        animated: true
      });
    }
  }, [currentIndex]);

  const onTabContainerLayout = e => {
    setTabContainerMeasurements(e.nativeEvent.layout);
  };

  const onTabLayout = key => ev => {
    const { x, width, height } = ev.nativeEvent.layout;
    setTabsMeasurements(prevState => ({
      ...prevState,
      [key]: {
        left: x,
        right: x + width,
        width,
        height
      }
    }));
  };

  return (
    <View style={[styles.scrollViewContainer, tabBarStyle]}>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        horizontal
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
      >
        <View onLayout={onTabContainerLayout} style={styles.sectionContainer}>
          {sections.map((section, key) => {
            const isActive = currentIndex === key;
            return (
              <TouchableOpacity
                key={`${section.title}-${key}`}
                onPress={() => onPress(key)}
                onLayout={e => onTabLayout(key)(e)}
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
  scrollViewContainer: { width: wWidth, position: 'relative' },
  contentContainerStyle: { flexDirection: 'row' },
  sectionContainer: {
    flexDirection: 'row'
  }
});

export default TabBar;
