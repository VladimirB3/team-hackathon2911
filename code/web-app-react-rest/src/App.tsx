import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Main from './components/Main';
import Dashboard from "./components/Dashboard";
import AuthCallback from './components/AuthCallback';
import {loadErrorMessages, loadDevMessages} from "@apollo/client/dev";
import ProtectedRoute from "./components/ProtectedRoute";

const isDev = process.env.NODE_ENV === 'development';


const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/auth/callback" element={<AuthCallback/>}/>
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard/>
                        </ProtectedRoute>
                    }
                />

                <Route path="*" element={<Main/>}/>
            </Routes>
        </Router>
    )
}

if (isDev) {
    loadDevMessages();
    loadErrorMessages();
}

export default App;
