import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import axios from 'axios';

const DashboardScreen = () => {
  const [bookStats, setBookStats] = useState([]);
  const [bookCategories, setBookCategories] = useState([]);
  const [dailyStats, setDailyStats] = useState([]);

  // Fetch data from API to get borrowing stats
  useEffect(() => {
    fetchBookStats();
  }, []);

  const fetchBookStats = async () => {
    try {
      // Make an API call to fetch book stats and daily borrowing stats
      const response = await axios.get('http://localhost:5000/borrow-stats');
      
      // Assuming the response has the required data for categories and borrow counts
      const stats = response.data;

      // Extract categories and borrow counts for the BarChart
      const categories = stats.map(stat => stat._id); // Genre names
      const borrowCounts = stats.map(stat => stat.borrowCount); // Borrow count for each genre

      // Example daily borrowing stats (assuming API provides them)
      // You can replace this with the actual API if it provides daily stats
      const dailyStatsResponse = [
        { day: 'Mon', borrowCount: 50 },
        { day: 'Tue', borrowCount: 60 },
        { day: 'Wed', borrowCount: 80 },
        { day: 'Thu', borrowCount: 90 },
        { day: 'Fri', borrowCount: 40 },
        { day: 'Sat', borrowCount: 30 },
        { day: 'Sun', borrowCount: 70 }
      ];

      setBookCategories(categories);
      setBookStats(borrowCounts);
      setDailyStats(dailyStatsResponse.map(d => d.borrowCount)); // Example for daily borrowing
    } catch (error) {
      console.error("Error fetching book stats", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      {/* Bar chart for book borrowing by genre */}
      <Text style={styles.chartTitle}>Tần suất mượn sách theo thể loại</Text>
      <BarChart
        data={{
          labels: bookCategories, // The genres
          datasets: [{
            data: bookStats // Borrow counts for each genre
          }]
        }}
        width={320}
        height={220}
        yAxisLabel="Qty"
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726'
          }
        }}
        style={{ marginVertical: 8, borderRadius: 16 }}
      />

      {/* Line chart for total borrow count by day */}
      <Text style={styles.chartTitle}>Tần suất mượn sách tổng thể theo ngày</Text>
      <LineChart
        data={{
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // Days of the week
          datasets: [{
            data: dailyStats // Borrow count for each day
          }]
        }}
        width={320}
        height={220}
        yAxisLabel="Qty"
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726'
          }
        }}
        style={{ marginVertical: 8, borderRadius: 16 }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20
  }
});

export default DashboardScreen;
