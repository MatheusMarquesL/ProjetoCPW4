import ReactDOM from "react-dom/client";
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { BibliotecaProvider } from './context/BibliotecaContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx'; 
import "./styles/main.scss"

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider> 
      <BibliotecaProvider>
        <App />
      </BibliotecaProvider>
    </AuthProvider>
  </BrowserRouter>
)