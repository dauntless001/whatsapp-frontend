import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home'
import ChatDetail from './components/ChatDetail'
import { TOKEN } from './utils'


function App() {
  const isLoggedIn = TOKEN ? true : false
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn}/>} />
          <Route path="/:id" element={<ChatDetail isLoggedIn={isLoggedIn}/>} />
      </Routes>
    </Router>
  );
}

export default App;
