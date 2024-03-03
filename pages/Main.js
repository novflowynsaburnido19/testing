import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const Main = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (task.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), text: task }]);
    setTask('');
  };

  const handleDeleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const renderTask = ({ item }) => (
    <View style={styles.taskItem}>
      <Text>{item.text}</Text>
      <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Management</Text>
      <TextInput
        style={styles.input}
        value={task}
        onChangeText={text => setTask(text)}
        placeholder="Enter task"
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={item => item.id.toString()}
        style={styles.taskList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  taskList: {
    width: '100%',
    marginTop: 20,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  deleteButton: {
    color: 'red',
  },
});

export default Main;
