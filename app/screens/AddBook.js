import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const AddBookScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');

  const addBook = async () => {
    if (title && author && genre) {
      try {
        await axios.post('http://localhost:5000/books', {
          title,
          author,
          genre
        });
        Alert.alert("Success", "Book added successfully!");
        navigation.goBack();
      } catch (error) {
        Alert.alert("Error", "Could not add book.");
      }
    } else {
      Alert.alert("Validation Error", "All fields are required.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Add a New Book</Text>

      <Text style={styles.label}>Title:</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholder="Enter book title"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Author:</Text>
      <TextInput
        value={author}
        onChangeText={setAuthor}
        style={styles.input}
        placeholder="Enter author's name"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Genre:</Text>
      <TextInput
        value={genre}
        onChangeText={setGenre}
        style={styles.input}
        placeholder="Enter genre"
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.button} onPress={addBook}>
        <Text style={styles.buttonText}>Add Book</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f6f9',
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center'
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
    marginLeft: 5
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
    fontSize: 16,
    color: '#333'
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default AddBookScreen;
