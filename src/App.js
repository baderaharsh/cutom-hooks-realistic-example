import React, { useEffect, useState } from 'react';
import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './Hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);

  console.log(process.env.REACT_APP_);

  const { isLoading, error, sendRequest } = useHttp();

  console.log("Before calling sendRequest in App.js")

  useEffect(() => {
    const fetchTasks = (data) => {
      const loadedTasks = [];
      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }
  
      setTasks(loadedTasks);
    };

    sendRequest({
      url: process.env.REACT_APP_API_URL
    }, fetchTasks);
  }, [sendRequest]);

  const taskAddHandler = (data) => {
    setTasks((prevTasks) => prevTasks.concat(data));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={sendRequest}
      />
    </React.Fragment>
  );
}

export default App;
