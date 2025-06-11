import { createSlice } from "@reduxjs/toolkit";
const NetworkSlice = createSlice({
    name: "network",
    initialState: {
        isConnected: false,
        nettype: null
    },
    reducers: {
        connection(state, action) {
            state.isConnected = action.payload
        },
        type(state, action) {
            state.type = action.payload
        }
    }
})
export const { connection, type } = NetworkSlice.actions;
export default NetworkSlice.reducer;