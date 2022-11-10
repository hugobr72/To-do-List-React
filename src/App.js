import React, { useState } from 'react';
import { useMemo } from 'react';
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";

import './App.css';
import { useEffect } from 'react';

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
      console.log(index)
      newLista[index] = input;
      console.log(newLista)
      if (list.find(valor => valor === input)) return alert('Digite algo diferente!!');
      if (input === '') return alert('Digite algo');
      setList(newLista);
      setInput('');
      setEdit(false);
    } else {
      if (list.find(valor => valor === input)) return setInput('');
      if (input === '') return alert('Digite algo');
      setCont(cont + 1)
      const array = [...list, input];
      setList(array);
      setInput('');
    }
  };

  useMemo(() => {
    if (localStorage.tarefas) setList(JSON.parse(localStorage.getItem('tarefas')))
  }, [])

  useEffect(()=> {
    localStorage.setItem('tarefas', JSON.stringify(list));
  },[list])

  cont <= 0 ? document.title = 'Lista de tarefas' : document.title = `${cont} tarefas...`;

  const handleRemove = (e) => {
    setCont(cont - 1);
    const indexDel = e.target.parentNode.parentNode.className
    const newList = [...list];
    newList.splice(indexDel, 1);
    setList(newList);
  };

  const handleEdit = (e) => {
    const index = e.target.parentNode.className;
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
        {list && list.map((item, index) => (
          <li key={index} className={index}  >
            <p key={index} className='tarefa'>{item}</p>
            <div className='button'>
              <span onClick={handleRemove}> <BsFillTrashFill /></span>
              <span onClick={handleEdit} className={index}><AiFillEdit /></span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
