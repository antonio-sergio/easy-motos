import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from './services/auth/AuthContext';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "react-datepicker/dist/react-datepicker.css";
import RoutesApp from './routes/Routes';
function App() {
  return (
      <AuthContextProvider>
        <RoutesApp />
      </AuthContextProvider>
  );
}

export default App;
