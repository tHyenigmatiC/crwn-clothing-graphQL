// Resolver is the object that we can pass to our apolloclient; that lets it know what value to 
// resolve depending on what queries or mutations gets called from the local client side

import { gql } from '@apollo/client';

import { addItemToCart, removeItemFromCart, clearItemFromCart, getItemCount, getTotalPrice } from './cart.utils';

export const typeDefs = gql`
    extend type Item {
        quantity: Int
    }

    extend type Datetime {
        nanoseconds: Int!
        seconds: Int!
    }

    extend type User {
        id: ID!
        displayName: String!
        email: String!
        createdAt: Datetime!
    }

    extend type Mutation {
        ToggleCartHidden: Boolean!
        AddItemToCart(item: Item!): [Item]!
        RemoveItemFromCart(item: Item!): [Item]!
        ClearItemFromCart(item: Item!): [Item]!
        SetCurrentUser(user: User!): User!
    }
`;


// here @client directive tells the apollo that it is on the client side i.e. local cache
const GET_CART_HIDDEN = gql`
    {
        cartHidden @client 
    }
`;


const GET_CART_ITEMS = gql`
    {
        cartItems @client
    }
`;

const GET_ITEM_COUNT = gql`
    {
        itemCount @client
    }
`;

const GET_TOTAL_PRICE = gql`
    {
        totalPrice @client
    }
`;

const GET_CURRENT_USER = gql`
    {
        currentUser @client
    }
`;


const updateCartItemsRelatedQueries = (cache, newCartItems) => {
    // updating cart item count
    cache.writeQuery({
        query: GET_ITEM_COUNT,
        data: { itemCount: getItemCount(newCartItems) }
    });

    // updating total price value
    cache.writeQuery({
        query: GET_TOTAL_PRICE,
        data: { totalPrice: getTotalPrice(newCartItems) }
    });

    cache.writeQuery({
        query: GET_CART_ITEMS,
        data: { cartItems: newCartItems }
    });
}

// _root: is the object which represents the top level object that holds actual type. ar root leve its {}
// _args: represent all the arguments that we can get access inside the mutation
// _context: the apollo client has access to _context which include cache as well as the client itself
// info: information about the query or mutation


export const resolvers = {
    Mutation: {
        toggleCartHidden: (_root, _args, { cache }) => {
            const { cartHidden } = cache.readQuery({
                query: GET_CART_HIDDEN
            });

            cache.writeQuery({
                query: GET_CART_HIDDEN,
                data: { cartHidden: !cartHidden }
            });

            return !cartHidden;
        },

        addItemToCart: (_root, { item }, { cache }) => {
            const { cartItems } = cache.readQuery({
                query: GET_CART_ITEMS
            });

            const newCartItems = addItemToCart(cartItems, item);

            updateCartItemsRelatedQueries(cache, newCartItems);

            return newCartItems;
        },


        removeItemFromCart: (_root, { item }, { cache }) => {
            const { cartItems } = cache.readQuery({
                query: GET_CART_ITEMS
            });

            const newCartItems = removeItemFromCart(cartItems, item);

            updateCartItemsRelatedQueries(cache, newCartItems)

            return newCartItems;
            
        },

        clearItemFromCart: (_root, { item }, { cache }) => {
            const { cartItems } = cache.readQuery({
                query: GET_CART_ITEMS
            });

            const newCartItems = clearItemFromCart(cartItems, item);

            updateCartItemsRelatedQueries(cache, newCartItems)

            return newCartItems;
        },

        setCurrentUser: (_root, { user }, { cache }) => {
            
            cache.writeQuery({
                query: GET_CURRENT_USER,
                data: { currentUser: user }
            });

            return user;
        }
    }
}