import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { getCurrentState } from "../utils";

interface CollectionState {
    collections: any[],
    cart: any[],
    showCollectionDrawer: boolean,
}

const initialState: CollectionState = {
    collections: [],
    cart: [],
    showCollectionDrawer: false
}

export const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {
        setCollection: (state, action) => {
            state.collections = action.payload
        },
        toggleCollectionDrawer: (state) => {
            state.showCollectionDrawer = !state.showCollectionDrawer
        },
        addCartItem: (state, action) => {
            const item = action.payload.beer
            const existingInCart = state.cart.some((beer) => beer?.id === item?.id)
            const existingInCollection = state.collections.some((beer) => beer?.id === item?.id)
            if (existingInCart || existingInCollection) {
                state.cart = state.cart
            } else {
                state.cart = [...state.cart, item]
            }
        },
        removeCartItem: (state, action) => {
            const id = action.payload
            const newCart = state.cart.filter((beer) => beer?.id !== id)
            state.cart = newCart
        },
        resetCart: (state) => {
            state.cart = []
        },
        addBeerCollection: (state, action) => {
            const cartItem = action.payload
            state.collections = [...state.collections, cartItem]
            const newCart = state.cart.filter((beer) => beer?.id !== cartItem.id)
            state.cart = newCart
        },
        addCartToCollection: (state) => {
            const cart = state.cart
            state.collections = [...state.collections, ...cart]
            state.cart = []
        }

    }
})

export const {
    setCollection,
    toggleCollectionDrawer,
    addCartItem,
    removeCartItem,
    resetCart,
    addBeerCollection,
    addCartToCollection } = collectionSlice.actions

export const selectsShowCollectionDrawer = (state: AppState) => state.collection.showCollectionDrawer;
export const selectsCartItems = (state: AppState) => state.collection.cart;
export const selectsCollections = (state: AppState) => state.collection.collections;

export default collectionSlice.reducer;