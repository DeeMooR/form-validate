import { createSlice } from '@reduxjs/toolkit'
import { IForm } from '../interfaces'

const initialState: IForm = {
    name: '',
    age: null,
    email: '',
    password: '',
    phone: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateFields(state, action) {
            return {...state, ...action.payload}
        },
        clearFields() {
            return initialState;
        }
    }
})

export default userSlice.reducer
export const { updateFields, clearFields } = userSlice.actions