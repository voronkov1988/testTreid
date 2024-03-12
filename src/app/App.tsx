'use client'
import { OneGroup } from "./components/OneGroup/OneGroup";
import { useDispatch, useSelector } from 'react-redux';
import styles from './App.module.css'
import { addGroups } from "./store/appSlice";
import { v4 as uuidv4 } from 'uuid';


export const App = () => {
    const dispatch = useDispatch()
    const groupsSum = useSelector((state: AppState) => state.sumAllGroups);
    const groupsState = useSelector((state: AppState) => state.groups);

    const handleAddGroup = () => {
        dispatch(addGroups({ id: uuidv4(), sum: 0, products: [] }))
    }
    
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
