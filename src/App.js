import React, { useState } from 'react';

import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);
  const [cont, setCont] = useState(0);
  const [edit, setEdit] = useState(false);
  const [index, setIndex] = useState();

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleAdd = () => {
    if (edit) {
      let newLista = [...list]
      newLista[index] = input;
      if (list.find(valor => valor === input)) return alert('Digite algo diferente!!');
      if (input === '') return alert('Digite algo');
      setList(newLista);
      setInput('');
      setEdit(false);
    } else {
      if (list.find(valor => valor === input)) return setInput('');
      if (input === '') return alert('Digite algo');
      setCont(cont + 1)
      setList([...list, input]);
      setInput('');
    }
  };
  
  cont === 0 ? document.title = 'Lista de tarefas' : document.title = `${cont} tarefas...`;

  const handleRemove = (e) => {
    setCont(cont - 1);
    const indexDel = e.target.parentNode.parentNode.className
    const newList = [...list];
    newList.splice(indexDel, 1);
    setList(newList);
  };

  const handleEdit = (e) => {
    const index = e.target.parentNode.parentNode.className;
    const tarefaEdit = list[index];
    setIndex(index)
    setEdit(true);
    setInput(tarefaEdit);
    alert('Editando...')
  };


  return (
    <div className="App">
      <h1>Lista de tarefas</h1>
      <input type="text" onChange={handleInput} value={input} />
      <button onClick={handleAdd} className='Add'>Adicionar</button>
      <ul>
        {list.map((item, index) => (
          <li key={index} className={index}  >
            <p key={index} className='tarefa'>{item}</p>
            <div className='button'>
              <button onClick={handleRemove}>Delete</button>
              <button onClick={handleEdit}>Editar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
