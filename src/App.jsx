
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AllPosts } from './components/AllPost'
import { PostProvider } from './context/Context'
import './index.css'
import { CardDetails } from './pages/CardDetails'

function App() {

  return (
    <PostProvider>
      <BrowserRouter>
      <Routes>
        <Route path= "/" element={<AllPosts />}/>
        <Route path="/posts/:id" element={<CardDetails />}/>
      </Routes>
      </BrowserRouter>
    </PostProvider>
  )
}

export default App