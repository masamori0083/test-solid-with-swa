import { createResource, createSignal } from 'solid-js';
import styles from './App.module.css';

// 変更
function App() {
  const [message, setMessage] = createSignal('');
  const [postResult, setPostResult] = createSignal('');

  const [getData] = createResource( async() => {
    const response = await fetch('http://localhost:8000/api');
    const data = await response.json();
    return data.message;
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/api/echo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: message() })
    });
    const data = await response.json();
    setPostResult(data.receive);
  }
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <h1>FastAPI with Solid.js</h1>
        <section>
          <h2>GET Request</h2>
          <p>{getData() || 'Loading...'}</p>
        </section>

        <section>
          <h2>POST Request</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" value={message()} onInput={e => setMessage(e.target.value)} />
            <button type="submit">Send</button>
          </form>
          {postResult() && <p>Received: {postResult()}</p>}
        </section>
      </header>
    </div>
  );
}

export default App;
