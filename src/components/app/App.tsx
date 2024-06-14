import { HashRouter } from 'react-router-dom';
import FormBox from '../formBox/FormBox';
import styles from './App.module.css';

function App() {
  return (
    <HashRouter>
      <div className={styles.container}>
        <FormBox />
      </div>
    </HashRouter>
  );
}

export default App;
