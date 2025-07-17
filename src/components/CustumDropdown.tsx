import React from 'react';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

// Define COLORS and FONTFAMILY
const COLORS = {
  primaryColor: '#4158F4',
  SecondaryColor: '#000', // Example secondary color, adjust as needed
};

const FONTFAMILY = {
  regular: 'Roboto-Regular', // Example font family, adjust as needed
};

type Option = {
  id: string | number;
  name: string;
};

type CustomDropdownProps = {
  label: string;
  selectedValue: string | number | Array<string | number>;
  onValueChange: (value: string | number | Array<string | number>) => void;
  options: Option[];
  loading?: boolean;
  multiSelect?: boolean;
  showLabel?: boolean;
  placeholder?: string;
};

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  selectedValue,
  onValueChange,
  options,
  loading = false,
  multiSelect = false,
  showLabel = true,
  placeholder = 'Select',
  ...props
}) => {
  return (
    <View style={styles.dropdownContainer}>
      {showLabel && <Text style={styles.label}>{label} *</Text>}
      {loading ? (
        <ActivityIndicator size="small" color={COLORS.SecondaryColor} />
      ) : multiSelect ? (
        <MultiSelect
          style={styles.dropdown}
          data={options}
          labelField="name"
          activeColor={COLORS.SecondaryColor}
          selectedTextStyle={{
            color: COLORS.SecondaryColor,
            fontFamily: FONTFAMILY.regular,
          }}
          placeholderStyle={{ color: '#555', fontFamily: FONTFAMILY.regular }}
          valueField="id"
          placeholder={
            (selectedValue as Array<string | number>).length > 0
              ? `${(selectedValue as Array<string | number>).length} batch${
                  (selectedValue as Array<string | number>).length > 1
                    ? 's'
                    : ''
                } selected`
              : 'Select'
          }
          //   value={selectedValue as Array<string | number>}
          onChange={onValueChange}
          selectedStyle={styles.selectedStyle}
          renderRightIcon={() => (
            <Icon name="chevron-down" color="#555" size={14} />
          )}
        />
      ) : (
        <Dropdown
          style={styles.dropdown}
          data={options}
          labelField="name"
          valueField="id"
          selectedTextStyle={{
            fontFamily: FONTFAMILY.regular,
            color: COLORS.primaryColor,
          }}
          placeholder={placeholder}
          placeholderStyle={{ color: '#555', fontSize: 14 }}
          value={selectedValue as string | number}
          onChange={item => onValueChange(item.id)}
          renderRightIcon={visible => (
            <Icon
              name={visible ? 'chevron-up' : 'chevron-down'}
              color="#555"
              size={14}
            />
          )}
          itemTextStyle={{ fontFamily: FONTFAMILY.regular, color: '#555' }}
          {...props}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    width: '100%',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    paddingBottom: 5,
    color: '#000',
    fontFamily: FONTFAMILY.regular,
  },
  dropdown: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: COLORS.primaryColor,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    height: 40,
  },
  selectedStyle: {
    display: 'none',
    borderRadius: 8,
    backgroundColor: `${COLORS.SecondaryColor}20`,
    padding: 5,
  },
});

export default CustomDropdown;
