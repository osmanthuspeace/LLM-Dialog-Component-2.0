import './App.css';
import Bubble from '../../src/components/bubble';

function App() {
  return (
    <>
      <div className="container">
        <Bubble content="Hello, World!" placement='end'/>
      </div>
    </>
  );
}

export default App;
