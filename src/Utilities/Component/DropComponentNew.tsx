import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Colors} from '../Styles/colors';
import fontFamily from '../Styles/fontFamily';
import {moderateScale, moderateScaleVertical} from '../Styles/responsiveSize';

type VenueTypeDropdownProps = {
  items: {label: string; value: string}[]; // Array of dropdown items
  placeholder?: string; // Optional placeholder
  newStyle?: any; // Optional placeholder
  onValueChange: (value: string[]) => void; // Callback for value change
};

const DropComponentNew: React.FC<VenueTypeDropdownProps> = ({
  items,
  placeholder = 'Enter something here...',
  onValueChange,
  newStyle,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string[]>([]);
  // console.log(value, 'value');
  const handleValueChange = (selectedValues: string[]) => {
    setValue(selectedValues);
    const selectedIDs = items
      .filter(item => selectedValues.includes(item.value))
      .map((item: any) => (item._id ? item._id : item.name));
    onValueChange(selectedIDs);
    // console.log('Selected venue types:', selectedIDs);
  };

  return (
    <View style={[styles.container, newStyle]}>
      {/* <Image source={ImagePath.SearchNewGroup} /> */}
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={() => {}} // This can remain empty if items are passed as props
        style={styles.dropdown}
        onChangeValue={(selectedValues: string[]) => {
          handleValueChange(selectedValues); // Call your custom logic
        }}
        multiple={true}
        searchable={true}
        placeholder={placeholder}
        searchPlaceholderTextColor={Colors.white}
        searchPlaceholder="Enter something here..."
        listMode="SCROLLVIEW"
        badgeTextStyle={{color: 'black'}}
        dropDownContainerStyle={styles.dropdownContainer}
        listItemLabelStyle={styles.listItemLabel}
        searchContainerStyle={styles.searchContainer}
        searchTextInputStyle={styles.searchInput}
        placeholderStyle={{color: Colors.white}}
        arrowIconStyle={styles.arrowIcon}
        containerStyle={{
          width: moderateScale(227),
          height: moderateScaleVertical(35),
        }}
        showTickIcon={true}
        labelStyle={{
          color: Colors.white,
          fontSize: 10,
          fontFamily: fontFamily.bold,
          fontWeight: '800',
        }}
        tickIconStyle={styles.tickIcon}
        // renderListItem={({item}) => (
        //   <TouchableOpacity activeOpacity={0.8} style={styles.listItem}>
        //     <Text style={styles.listItemLabel}>{item.label}</Text>
        //     <View
        //       style={{
        //         width: 15,
        //         height: 15,
        //         borderRadius: 5,
        //         backgroundColor: Colors.white,
        //       }}
        //     />
        //   </TouchableOpacity>
        // )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: moderateScale(227),
    height: moderateScaleVertical(35),
    // flexDirection: 'row',
    // alignItems: 'center',
    // borderRadius: 10,
    // backgroundColor: Colors.backgroundNew,
    // borderWidth: 1,
    // borderColor: Colors.darkPink,
  },
  dropdown: {
    width: moderateScale(227),
    height: moderateScaleVertical(35),
    backgroundColor: Colors.black, // Matches the dropdown background in the image
    borderColor: Colors.darkPink, // Border color
    borderRadius: 8,
    borderWidth: 2,
  },
  dropdownContainer: {
    backgroundColor: Colors.black, // Matches the dropdown container background
    borderColor: Colors.darkPink, // Border for dropdown items
  },
  searchContainer: {
    borderBottomColor: Colors.darkPink, // Border for search input container
    borderBottomWidth: 2,
  },
  searchInput: {
    color: 'white', // White text for search input
    backgroundColor: Colors.black, // Search bar background
    borderRadius: 8,
    borderColor: Colors.darkPink,
  },
  arrowIcon: {
    tintColor: 'white', // Arrow icon color
  },
  tickIcon: {
    width: 15,
    height: 15,
    backgroundColor: Colors.white,
    tintColor: Colors.black, // Tick icon color for selected items
  },
  listItemLabel: {
    color: Colors.white,
    fontSize: 10,
    fontFamily: fontFamily.bold,
    fontWeight: '800',
  },
  //   listItem: {
  //     width: '100%',
  //     paddingVertical: 10,
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  //     alignItems: 'center',
  //     paddingHorizontal: 10,
  //     marginVertical: 5,
  //   },
});

export default DropComponentNew;
