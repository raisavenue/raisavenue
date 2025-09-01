import './App.css';
import { useEffect,useState } from 'react';

function App() {

  const [text, setText] = useState("");
  const [items, setItems] = useState([]);

  // Load & save to localStorage so list survives refresh
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todos") || "[]");
    setItems(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(items));
  }, [items]);

  const addItem = (e) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    setItems([{ id: Date.now(), text: t, done: false }, ...items]);
    setText("");
  };
  const toggle = (id) =>
    setItems(items.map(it => it.id === id ? { ...it, done: !it.done } : it));
  const remove = (id) => setItems(items.filter(it => it.id !== id));

  return (

    <div className="App">

      <h1>✅ Todo (React + Kubernetes)</h1>
      <form onSubmit={addItem} className="row">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a task…"
        />
        <button>Add</button>
      </form>
      <ul className="list">
        {items.length === 0 && <p>No tasks yet. Add one!</p>}
        {items.map(it => (
          <li key={it.id} className={it.done ? "done" : ""}>
            <span onClick={() => toggle(it.id)} title="Toggle done">
              {it.text}
            </span>
            <button className="delete" onClick={() => remove(it.id)}>✕</button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;
