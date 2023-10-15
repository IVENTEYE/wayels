import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    expanded: false,
}

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setExpand(state) {
            state.expanded = !state.expanded;
        }
    }
});

export const { setExpand } = sidebarSlice.actions;
export default sidebarSlice;