
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AllPosts } from './components/AllPost'
import { PostProvider } from './context/Context'
import './index.css'
import { CardDetails } from './pages/CardDetails'
import { CommentsPage } from './pages/Comments'

function App() {

  return (
    <PostProvider>
      <BrowserRouter>
      <Routes>
        <Route path= "/" element={<AllPosts />}/>
        <Route path="/posts/:id" element={<CardDetails />}/>
        <Route path="/posts/:id/comments" element={<CommentsPage />} />
      </Routes>
      </BrowserRouter>
    </PostProvider>
  )
}

export default App