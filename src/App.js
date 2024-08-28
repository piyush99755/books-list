import BooksPage from './components/views/BooksPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AddBookPage from './components/views/AddBookPage';
import SingleBookPage from './components/views/SingleBookPage';
import LoginPage from './components/views/LoginPage';


function App() {

  return (
    <>
        {/**creating routes */}
       <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage />}/>
          <Route path = "add-book" element = {<AddBookPage />}/>
          <Route path = "book/:id" element = {<SingleBookPage />}/>
        </Routes>
       </BrowserRouter>
      
        
    </>
  )
}

export default App


