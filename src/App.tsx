import './App.css'
import SearchJobs from './pages/SearchJobs'
import { Provider } from 'react-redux';
import { store } from './app/store';

function App() {

  return (
    <>
      <Provider store={store}>
        <SearchJobs />
      </Provider>
    </>
  )
}

export default App
