

// import axios from 'axios';
// import { useState, useEffect } from 'react';

// const Todolist = () => {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState('');

//   // Загрузка задач с сервера
//   const loadTasks = () => {
//     axios.get('/api/tasks')
//       .then(response => setTasks(response.data.tasks))
//       .catch(error => console.error('Fehler beim Laden der Aufgaben:', error));
//   };

//   useEffect(() => {
//     loadTasks();
//   }, []);

//   const saveNewTask = (e) => setNewTask(e.target.value);

//   const addTask = () => {
//     if (!newTask.trim()) return;

//     axios.post('/api/tasks', { text: newTask })
//       .then(() => {
//         setNewTask('');
//         loadTasks();  // Загружаем актуальный список после добавления
//       })
//       .catch(error => console.error('Fehler beim Speichern der Aufgabe:', error));
//   };

//   const deleteTask = (id) => {
//     axios.delete(`/api/tasks/${id}`)
//       .then(() => loadTasks())  // Загружаем актуальный список после удаления
//       .catch(error => console.error('Fehler beim Löschen der Aufgabe:', error));
//   };

//   return (
//     <div id="box1">
//       <div id="box2">
//         <div id='box2_1'>
//           <input
//             type="text"
//             value={newTask}
//             onChange={saveNewTask}
//             placeholder="New task"
//           />
//           <button id='add' onClick={addTask}>Add</button>
//         </div>
//       </div>
//       <div id="box3">
//         <div id='box4'>
//           {tasks.map((task) => (
//             <p key={task.id}>
//               {task.text}
//               <button id="del" onClick={() => deleteTask(task.id)}>Delete</button>
//             </p>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Todolist;

import axios from 'axios';
import { useState, useEffect } from 'react';
import './Todolist.css';

const Todolist = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const loadTasks = () => {
    axios.get('/api/tasks')
      .then(response => setTasks(response.data.tasks))
      .catch(error => console.error('Fehler beim Laden der Aufgaben:', error));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const saveNewTask = (e) => setNewTask(e.target.value);

  const addTask = () => {
    if (!newTask.trim()) return;

    axios.post('/api/tasks', { text: newTask })
      .then(() => {
        setNewTask('');
        loadTasks();
      })
      .catch(error => console.error('Fehler beim Speichern der Aufgabe:', error));
  };

  const deleteTask = (id) => {
    const element = document.getElementById(`task-${id}`);
    if (element) {
      element.classList.add('fade-out');
      setTimeout(() => {
        axios.delete(`/api/tasks/${id}`)
          .then(() => loadTasks())
          .catch(error => console.error('Fehler beim Löschen der Aufgabe:', error));
      }, 500); // ждём завершения анимации
    }
  };

  return (
    <div id="box1">
      <div id="box2">
        <div id='box2_1'>
          <input
            type="text"
            value={newTask}
            onChange={saveNewTask}
            placeholder="New task"
          />
          <button id='add' onClick={addTask}>Add</button>
        </div>
      </div>
      <div id="box3">
        <div id='box4'>
          {tasks.map((task) => (
            <p key={task.id} id={`task-${task.id}`}>
              {task.text}
              <button id="del" onClick={() => deleteTask(task.id)}>Delete</button>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todolist;