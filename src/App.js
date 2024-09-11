import BooksPage from './components/views/BooksPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AddBookPage from './components/views/AddBookPage';
import SingleBookPage from './components/views/SingleBookPage';
import LoginPage from './components/views/LoginPage';
import { useSelector } from 'react-redux';
import { selectUsers } from './store/usersSlice';


function App() {
  const user = useSelector(selectUsers);
  return (
    <>
     
              
            <BrowserRouter>
            <Routes>
              <Route index element = {<BooksPage />}/>
              <Route path = "add-book" element = {<AddBookPage />}/>
              <Route path = "book/:id" element = {<SingleBookPage />}/>

            </Routes>
            </BrowserRouter> 
           
      
    
        
        
    </>
  )
}

export default App


