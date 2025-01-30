import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  TextInput,
} from 'react-native';
import {Colors} from '../Styles/colors';
import fontFamily from '../Styles/fontFamily';

export type Item = {
  _id: string;
  label: string;
  name: string;
  value: string;
};

type VenueTypeDropdownProps = {
  items: Item[];
  placeholder?: string; // Optional placeholder
  newStyle?: any; // Additional style for container
  onValueChange: (value: string[]) => void; // Callback for value change
  isActive: boolean; // Whether this dropdown is active
  setActiveDropdown: (key: string | null) => void; // Function to set the active dropdown
  dropdownKey: string; // Unique key for this dropdown
  placeholderText?: string;
  selectedItems?: string[];
};

const DropComponentNew: React.FC<VenueTypeDropdownProps> = ({
  items,
  onValueChange,
  newStyle,
  isActive,
  setActiveDropdown,
  dropdownKey,
  placeholderText = 'Select an option',
  selectedItems = [],
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(
    selectedItems || [],
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [layout, setLayout] = useState({x: 0, y: 0, width: 0, height: 0});

  const handleValueChange = (value: string) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value) // Remove if already selected
      : [...selectedValues, value]; // Add if not selected
    setSelectedValues(newSelectedValues);
    onValueChange(newSelectedValues);
  };

  const filteredItems = items.filter(item =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const onLayoutHandler = (event: any) => {
    const {x, y, width, height} = event.nativeEvent.layout;
    setLayout({x, y, width, height});
  };

  useEffect(() => {
    if (JSON.stringify(selectedValues) !== JSON.stringify(selectedItems)) {
      setSelectedValues(selectedItems);
    }
  }, [selectedItems]);

  return (
    <View style={[styles.container, newStyle]}>
      {/* Trigger button */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setActiveDropdown(isActive ? null : dropdownKey);
        }}
        onLayout={onLayoutHandler}
        style={styles.dropdownButton}>
        <Text
          style={[
            styles.placeholderText,
            {
              fontFamily: selectedValues.length
                ? fontFamily.bold
                : fontFamily.regular,
            },
          ]}>
          {selectedValues.length > 0
            ? `${selectedValues.length} items are selected`
            : placeholderText}
        </Text>
      </TouchableOpacity>

      {/* Dropdown items */}
      {isActive && (
        <View
          style={[
            styles.dropdownContainer,
            {
              position: 'absolute',
              top: layout.y + layout.height,
              left: layout.x,
              width: layout.width,
              zIndex: 10000,
            },
          ]}>
          {/* Search Input */}
          {items.length > 0 && (
            <TextInput
              style={styles.searchInput}
              placeholder="Enter to Search"
              placeholderTextColor={Colors.grey}
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          )}
          {/* Items List */}
          <FlatList
            contentContainerStyle={{gap: 4}}
            data={filteredItems}
            keyExtractor={item => item.value}
            style={{backgroundColor: Colors.black}}
            renderItem={({item}: {item: Item}) => {
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  style={[
                    styles.item,
                    selectedValues.includes(item._id) && styles.selectedItem,
                  ]}
                  onPress={() => handleValueChange(item._id)}>
                  <Text
                    style={[
                      styles.itemText,
                      selectedValues.includes(item._id) &&
                        styles.selectedItemText,
                    ]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            }}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      color: Colors.red,
                      fontSize: 14,
                      fontFamily: fontFamily.bold,
                      fontWeight: '800',
                    }}>
                    There is nothimng to show
                  </Text>
                </View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  dropdownButton: {
    backgroundColor: Colors.white,
    borderColor: Colors.darkPink,
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    minHeight: 25,
    justifyContent: 'center',
  },
  placeholderText: {
    color: Colors.black,
    fontSize: 12,
  },
  dropdownContainer: {
    backgroundColor: Colors.black,
    borderColor: Colors.darkPink,
    borderWidth: 1,
    borderRadius: 8,
    maxHeight: 140,
    zIndex: 1000,
    elevation: 5,
  },
  searchInput: {
    height: 40,
    borderColor: Colors.black,
    borderWidth: 1,
    paddingHorizontal: 10,
    color: Colors.white,
    backgroundColor: Colors.black,
    fontSize: 12,
    fontFamily: fontFamily.regular,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.darkPink,
    backgroundColor: Colors.black,
  },
  selectedItem: {
    backgroundColor: Colors.lightPink,
  },
  itemText: {
    color: Colors.white,
    fontSize: 12,
    fontFamily: fontFamily.bold,
  },
  selectedItemText: {
    color: Colors.white,
  },
});

export default DropComponentNew;
