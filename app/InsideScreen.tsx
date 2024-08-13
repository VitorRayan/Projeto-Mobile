import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './AppNavigator';

type InsideScreenNavigationProp = StackNavigationProp<RootStackParamList, 'InsideScreen'>;

// Atualize o caminho para a imagem
const sampleImages = [
  require('../assets/Logo.png'),
  require('../assets/Logo.png'),
  require('../assets/Logo.png'),
];

export default function InsideScreen() {
  const navigation = useNavigation<InsideScreenNavigationProp>();
  const [selectedTab, setSelectedTab] = useState<'home' | 'recipes' | 'favorites'>('home');
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [commentIndex, setCommentIndex] = useState<number | null>(null);

  const handleTabPress = (tab: 'home' | 'recipes' | 'favorites') => {
    setSelectedTab(tab);
  };

  const handleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const handleFavorite = (index: number) => {
    setFavorites(prev => {
      if (prev.includes(index)) {
        return prev.filter(favIndex => favIndex !== index);
      } else {
        return [...prev, index];
      }
    });
    navigation.navigate('Favorites');
  };

  const handleComment = (index: number) => {
    setCommentIndex(index === commentIndex ? null : index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButtonWrapper}
          onPress={() => navigation.navigate('LoginScreen')}
        >
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CookCraft</Text>
        <View style={styles.headerIcons}>
          {searchVisible ? (
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquisar..."
              placeholderTextColor="#ccc"
              value={searchText}
              onChangeText={setSearchText}
              autoFocus
              onBlur={() => setSearchVisible(false)}
            />
          ) : (
            <TouchableOpacity onPress={handleSearch}>
              <Ionicons name="search" size={24} color="white" />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Ionicons name="menu" size={24} color="white" style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={styles.tab}
          onPress={() => handleTabPress('home')}
        >
          <Ionicons name="home" size={24} color="white" />
          <Text style={styles.tabText}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tab}
          onPress={() => handleTabPress('recipes')}
        >
          <MaterialCommunityIcons name="silverware-fork-knife" size={24} color="white" />
          <Text style={styles.tabText}>Receitas</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tab}
          onPress={() => handleTabPress('favorites')}
        >
          <Ionicons name="heart" size={24} color="white" />
          <Text style={styles.tabText}>Favoritos</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {selectedTab === 'home' && (
          <>
            {sampleImages.map((image, index) => (
              <View key={index} style={styles.recipeCard}>
                <Image source={image} style={styles.recipeImage} />
                <View style={styles.recipeContent}>
                  <Text style={styles.recipeTitle}>Receita {index + 1}</Text>
                  <View style={styles.actions}>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleFavorite(index)}
                    >
                      <Ionicons
                        name="heart"
                        size={24}
                        color={favorites.includes(index) ? '#FF6347' : '#ddd'}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleComment(index)}
                    >
                      <Ionicons
                        name="chatbubble"
                        size={24}
                        color="#ddd"
                      />
                    </TouchableOpacity>
                  </View>
                  {commentIndex === index && (
                    <TextInput
                      style={styles.commentInput}
                      placeholder="Adicionar um comentário..."
                    />
                  )}
                </View>
              </View>
            ))}
          </>
        )}
        {selectedTab === 'recipes' && (
          <Text style={styles.feedText}>Receitas - Em desenvolvimento</Text>
        )}
        {selectedTab === 'favorites' && (
          <Text style={styles.feedText}>Receitas Favoritas - Em desenvolvimento</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#13505B',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#003E5C',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Jua_400Regular',
    flex: 1,
    textAlign: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: 20,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#003E5C',
    paddingVertical: 10,
  },
  tab: {
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    fontFamily: 'Jua_400Regular',
    marginTop: 5,
  },
  scrollView: {
    padding: 20,
  },
  recipeCard: {
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  recipeImage: {
    width: '100%',
    height: 200,
  },
  recipeContent: {
    padding: 10,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  actionButton: {
    padding: 10,
  },
  commentInput: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  feedText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Jua_400Regular',
    textAlign: 'center',
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 4,
    margin: 10,
    flex: 1,
  },
  backButtonWrapper: {
    marginRight: 20,
  },
});