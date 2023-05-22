import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";

interface CollectionState {
    collections: any[]
}

const initialState: CollectionState = {
    collections: []
}

export const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {
        setCollection(state, action) {
            state.collections = action.payload
        }
    }
})

