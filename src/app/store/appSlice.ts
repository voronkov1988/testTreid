import { createSlice } from '@reduxjs/toolkit';

interface IProduct {
    id: string | number;
    name: string;
    sum: number;
    count: number;
    price: string | undefined;
}
interface IGroup {
    id: string | number;
    sum: number;
    products: IProduct[];
}

const initialState = {
    groups: [] as IGroup[],
    sumAllGroups: 0
};

export const editableApp = createSlice({
    name: 'editableApp',
    initialState,
    reducers: {
        addGroups(state, action) {
            state.groups = [...state.groups, action.payload]
        },
        addProduct(state, action) {
            const { groupId, products } = action.payload;
            const group = state.groups.find(group => group.id === groupId);
            if (group) {
                group.products.push(products);
            }
        },
        deleteGroup(state, action) {
            state.groups = state.groups.filter(group => group.id !== action.payload);
        },
        deleteProduct(state, action) {
            const { groupId, id } = action.payload;
            const group = state.groups.find(group => group.id === groupId);
            if (group) {
                group.products = group.products.filter(product => product.id !== id);
            }
        },
        updateProduct(state, action) {
            const { groupId, productId, newValues } = action.payload;
            const group = state.groups.find(group => group.id === groupId);
            if (group) {
                const product = group.products.find(product => product.id === productId);
                if (product) {
                    Object.assign(product, newValues);
                }
            }
        },
        updateProductSum(state, action) {
            const { groupId, productId } = action.payload;
            const group = state.groups.find(group => group.id === groupId);
            if (group) {
                const product = group.products.find(product => product.id === productId);
                if (product && product.price) {
                    const sum = parseFloat(product.price) * product.count;
                    product.sum = +sum.toFixed(2);
                }
            }
        },
        updateGroupSum(state, action) {
            const { groupId } = action.payload;
            const group = state.groups.find(group => group.id === groupId);
            if (group) {
                const sum = group.products.reduce((sum, product) => sum + product.sum, 0);
                group.sum = +sum.toFixed(2);
            }
        },
        updateAllGroupsSum(state) {
            const sum = state.groups.reduce((sum, group) => sum + group.sum, 0);
            state.sumAllGroups = +sum.toFixed(2);
        }
    },
});

export const {
    addGroups,
    addProduct,
    deleteGroup,
    deleteProduct,
    updateProduct,
    updateProductSum,
    updateGroupSum,
    updateAllGroupsSum
} = editableApp.actions;

export default editableApp.reducer;
