import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import axios from "axios";

const BookListScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await axios.get("http://localhost:5000/books");
    setBooks(response.data);
  };

  const deleteBook = async (id) => {
    await axios.delete(`http://localhost:5000/books/${id}`);
    fetchBooks();
  };

  const borrowBook = async (id) => {
    try {
      await axios.post(`http://localhost:5000/books/${id}/borrow`, {
        borrower: "User Name",
      });
      fetchBooks();
    } catch (error) {
      Alert.alert("Error", error.response.data.message);
    }
  };

  const returnBook = async (id) => {
    await axios.post(`http://localhost:5000/books/${id}/return`);
    fetchBooks();
  };

  return (
    <View style={styles.container}>
      {/* Dashboard Button */}
      <TouchableOpacity
        style={styles.dashboardButton}
        onPress={() => navigation.navigate("Dashboard")}
      >
        <Text style={styles.dashboardButtonText}>Go to Dashboard</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddBook")}
      >
        <Text style={styles.addButtonText}>+ Add New Book</Text>
      </TouchableOpacity>

      <FlatList
        data={books}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("EditBook", { bookId: item._id })
              }
            >
              <Text style={styles.bookTitle}>{item.title}</Text>
              <Text style={styles.bookAuthor}>Author: {item.author}</Text>
              <Text style={styles.bookGenre}>Genre: {item.genre}</Text>
              <Text style={styles.bookStatus}>Status: {item.status}</Text>
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
              {item.status === "available" ? (
                <TouchableOpacity
                  style={styles.borrowButton}
                  onPress={() => borrowBook(item._id)}
                >
                  <Text style={styles.buttonText}>Borrow Book</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.returnButton}
                  onPress={() => returnBook(item._id)}
                >
                  <Text style={styles.buttonText}>Return Book</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteBook(item._id)}
              >
                <Text style={styles.buttonText}>Delete Book</Text>
              </TouchableOpacity>
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
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  addButton: {
    backgroundColor: "#f39c12",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  dashboardButton: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  dashboardButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  bookItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  bookAuthor: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  bookGenre: {
    fontSize: 14,
    color: "#777",
    marginBottom: 10,
  },
  bookStatus: {
    fontSize: 14,
    color: "#777",
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  borrowButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  returnButton: {
    backgroundColor: "#ffc107",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BookListScreen;
