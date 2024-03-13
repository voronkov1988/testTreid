'use client'
import { OneGroup } from "./components/OneGroup/OneGroup";
import { useDispatch, useSelector } from 'react-redux';
import styles from './App.module.css'
import { addGroups } from "./store/appSlice";
import { v4 as uuidv4 } from 'uuid';
import { useCallback } from "react";


export const App = () => {
    const dispatch = useDispatch()
    const { groupsSum, groupsState } = useSelector((state: AppState) => ({
        groupsSum: state.sumAllGroups,
        groupsState: state.groups,
    }));

    const handleAddGroup = useCallback(() => {
        dispatch(addGroups({ id: uuidv4(), sum: 0, products: [] }));
    }, [dispatch]);
    
    return (
        <main className={styles.main}>
            <div className={styles.groupSum}>Сумма всех групп: {groupsSum}</div>
            {
                groupsState.map((item, index) => {
                    return <div key={item.id}><OneGroup sum={item.sum} count={index + 1} id={item.id} products={item.products} /></div>
                })
            }
            
            <button onClick={handleAddGroup}>Добавить группу</button>
        </main>

    );
}