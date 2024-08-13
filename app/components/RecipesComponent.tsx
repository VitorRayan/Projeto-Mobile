import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image, TouchableOpacity, TextInput } from 'react-native';
import api from '../api';

interface Recipe {
  id: string;
  title: string;
  imageUrl: string;
  comments: string[];
}

const RecipesComponent: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await api.get('/recipes');
        setRecipes(response.data);
      } catch (err) {
        setError('Failed to fetch recipes');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleComment = (recipeId: string, comment: string) => {
    setRecipes(prevRecipes =>
      prevRecipes.map(recipe =>
        recipe.id === recipeId
          ? { ...recipe, comments: [...recipe.comments, comment] }
          : recipe
      )
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <TouchableOpacity style={styles.favoriteButton}>
              <Text style={styles.favoriteText}>❤️ Favoritar</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.commentInput}
              placeholder="Adicione um comentário..."
              placeholderTextColor="#ccc"
              onSubmitEditing={(event) => handleComment(item.id, event.nativeEvent.text)}
            />
            <View style={styles.comments}>
              {item.comments.map((comment, index) => (
                <Text key={index} style={styles.comment}>{comment}</Text>
              ))}
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  item: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 18,
    color: '#333',
    padding: 10,
  },
  favoriteButton: {
    padding: 10,
    alignItems: 'center',
  },
  favoriteText: {
    fontSize: 16,
    color: '#ff6347',
  },
  commentInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 4,
    margin: 10,
  },
  comments: {
    padding: 10,
  },
  comment: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
});

export default RecipesComponent;