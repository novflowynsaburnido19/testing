import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons'; 

const Main = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editedTask, setEditedTask] = useState('');

  const handleAddTask = () => {
    if (task.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), text: task }]);
    setTask('');
  };

  const handleDeleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEditTask = index => {
    setEditIndex(index);
    setEditedTask(tasks[index].text);
  };

  const handleSaveEdit = () => {
    const updatedTasks = [...tasks];
    updatedTasks[editIndex].text = editedTask;
    setTasks(updatedTasks);
    setEditIndex(-1);
  };

  const renderTask = ({ item, index }) => (
    <View style={styles.taskItem}>
      <View style={styles.taskContainer}>
        {editIndex === index ? (
          <TextInput
            style={styles.input}
            value={editedTask}
            onChangeText={text => setEditedTask(text)}
            onBlur={handleSaveEdit}
          />
        ) : (
          <Text style={styles.taskText}>{item.text}</Text>
        )}
      </View>
      <View style={styles.taskButtons}>
        {editIndex !== index ? (
          <TouchableOpacity onPress={() => handleEditTask(index)}>
            <Feather name="edit" size={20} color="#fff" style={[styles.icon, styles.editIcon]} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => handleSaveEdit()}>
            <Feather name="check" size={20} color="#fff" style={[styles.icon, styles.editIcon]} />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
          <Feather name="trash-2" size={20} color="#fff" style={[styles.icon, styles.deleteIcon]} />
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
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 25,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#84dcc6',
    padding: 15,
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
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  taskContainer: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
  },
  taskButtons: {
    flexDirection: 'row',
  },
  icon: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ff686b',
    marginLeft: 5, 
  },
  editIcon: {
    marginLeft: 10, 
  },
  deleteIcon: {
    marginLeft: 10, 
  },
});

export default Main;
