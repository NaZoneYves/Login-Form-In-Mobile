import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

const EditBookScreen = ({ route, navigation }) => {
  const { bookId } = route.params;
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    const response = await axios.get(`http://localhost:5000/books/${bookId}`);
    setTitle(response.data.title);
    setAuthor(response.data.author);
    setGenre(response.data.genre);
  };

  const editBook = async () => {
    await axios.put(`http://localhost:5000/books/${bookId}`, { title, author, genre });
    navigation.goBack();
  };

  return (
    <View>
      <Text>Title:</Text>
      <TextInput value={title} onChangeText={setTitle} />
      <Text>Author:</Text>
      <TextInput value={author} onChangeText={setAuthor} />
      <Text>Genre:</Text>
      <TextInput value={genre} onChangeText={setGenre} />
      <Button title="Save Changes" onPress={editBook} />
    </View>
  );
};

export default EditBookScreen;
