import * as React from 'react';
import { View, SectionList } from 'react-native';
import TabBar from './TabBar';

const RNSectionList = React.memo(props => {
  const {
    sections,
    renderTab,
    tabBarStyle,
    scrollToLocationOffset,
    ...others
  } = props;

  // Local state
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Local refs
  const sectionListRef = React.useRef();
  const blockUpdateIndex = React.useRef(false);

  // Local handlers
  const handleContextUpdate = React.useCallback(index => {
    setCurrentIndex(index);
  }, []);

  const handleOnPress = React.useCallback(index => {
    blockUpdateIndex.current = true;
    handleContextUpdate(index);

    if (sectionListRef.current && sectionListRef.current.scrollToLocation) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        itemIndex: 0,
        viewOffset: scrollToLocationOffset || 0,
        sectionIndex: index
      });
    }
  }, []);

  const handleOnMomentumScrollEnd = React.useCallback(() => {
    blockUpdateIndex.current = false;
  }, []);

  const onViewableItemsChanged = React.useCallback(({ viewableItems }) => {
    if (!blockUpdateIndex.current && viewableItems[0]) {
      const currentViewableItemIndex = viewableItems[0].section.index;

      if (currentIndex !== currentViewableItemIndex) {
        handleContextUpdate(currentViewableItemIndex);
      }
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <TabBar
        currentIndex={currentIndex}
        onPress={handleOnPress}
        renderTab={renderTab}
        sections={sections}
        tabBarStyle={tabBarStyle}
      />

      <SectionList
        onViewableItemsChanged={onViewableItemsChanged}
        onMomentumScrollEnd={handleOnMomentumScrollEnd}
        ref={sectionListRef}
        sections={sections}
        viewabilityConfig={{
          minimumViewTime: 10,
          itemVisiblePercentThreshold: 10
        }}
        {...others}
      />
    </View>
  );
});

export default RNSectionList;
