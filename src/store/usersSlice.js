import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        currentUser: null
    },
       
    reducers: {
       setUser: (users, action) => {
        console.log('setUsers', action.payload);
         users.currentUser = action.payload;
       }
       
  }
})



        
export const { setUser } = usersSlice.actions;

export const selectUsers = state => state.users;

export default usersSlice.reducer;