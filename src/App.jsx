import './App.css'
import { useRoutes, Link } from 'react-router-dom'
import ShowCreator from './pages/ShowCreator'
import HighlightCreator from './pages/HighlightCreator'
import AddCreator from './pages/AddCreator'
import EditCreator from './pages/EditCreator'
import NavBar from './components/NavBar'

function App() {
    const routes = useRoutes([
        { path: '/', element: <ShowCreator /> },
        { path: '/creator/:id', element: <HighlightCreator /> },
        { path: '/add', element: <AddCreator /> },
        { path: '/edit-creator/:id', element: <EditCreator /> }
    ])

    return (
        <div>
            <NavBar />
            <div className="app-container">
                {routes}
            </div>
        </div>
    )
}

export default App
