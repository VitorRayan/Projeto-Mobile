import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>CookCraft</Text>
      <View style={styles.headerIcons}>
        <Ionicons name="search" size={24} color="white" style={styles.icon} />
        <Ionicons name="ellipsis-vertical" size={24} color="white" style={styles.icon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#003E5C',
  },
  headerTitle: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Jua_400Regular',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 15,
  },
});

export default Header;
