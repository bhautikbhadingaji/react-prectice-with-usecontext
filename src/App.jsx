
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AllPosts } from './components/AllPost'
import { PostProvider } from './context/Context'
import './index.css'
import { CardDetails } from './pages/CardDetails'
import { CommentsPage } from './pages/Comments'
import { Form } from './components/Form'
import { Toaster } from 'react-hot-toast'

function App() {
  
  return (
    <PostProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <BrowserRouter>
      <Routes>
        <Route path= "/" element={<AllPosts />}/>
        <Route path="/posts/:id/comments" element={<CommentsPage />} />
      </Routes>
      </BrowserRouter>
    </PostProvider>
  )
}

export default App