import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const Main = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const handleAddTask = () => {
    if (task.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), text: task }]);
    setTask('');
  };

  const handleDeleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEditTask = (index, newText) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = newText;
    setTasks(updatedTasks);
    setEditIndex(-1);
  };

  const renderTask = ({ item, index }) => (
    <View style={styles.taskItem}>
      {editIndex !== index ? (
        <View style={styles.taskContainer}>
          <Text style={styles.taskText}>{item.text}</Text>
        </View>
      ) : (
        <TextInput
          style={[styles.taskText, styles.editTaskText]}
          value={item.text}
          onChangeText={text => handleEditTask(index, text)}
          autoFocus
          onBlur={() => setEditIndex(-1)}
          selection={{ start: item.text.length, end: item.text.length }} // Set cursor at the end of text
        />
      )}
      <View style={styles.taskButtons}>
        <TouchableOpacity onPress={() => setEditIndex(index)}>
          <Text style={styles.taskButton}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
          <Text style={styles.taskButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Manager</Text>
      <TextInput
        style={styles.input}
        value={task}
        onChangeText={text => setTask(text)}
        placeholder="Enter task"
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonLabel}>Add Task</Text>
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
    alignItems: 'center',
  },
  addButtonLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
  taskList: {
    marginTop: 20,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
  },
  taskContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  taskText: {
    flex: 1,
  },
  editTaskText: {
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 5,
    padding: 5,
  },
  taskButtons: {
    flexDirection: 'row',
  },
  taskButton: {
    padding: 5,
    marginLeft: 5,
    borderRadius: 5,
    backgroundColor: '#ccc',
  },
});

export default Main;
