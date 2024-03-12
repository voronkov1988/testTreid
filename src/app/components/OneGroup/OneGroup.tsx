'use client'
import { addProduct, deleteGroup } from '@/app/store/appSlice';
import { OneProduct } from '../OneProduct/OneProduct'
import styles from './OneGroup.module.css'
import { useState} from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';

export const OneGroup = ({id, products, count, sum}: OneGroupProps) => {
    const dispatch = useDispatch()

    const handleAddProducts = () => {
        dispatch(addProduct({ groupId: id, products: { id: uuidv4(), name: '', sum: 0, count: 0, price: 0 } }));
    }

    const handleDeleteGroup = () => {
        dispatch(deleteGroup(id))
    }

    return(
        <div className={styles.wrapper}>
            <h4>Группа {count}</h4>
            <div className={styles.groupForm}>
                <span>Сумма группы</span>
                <input disabled value={sum} type="text" />
                <button onClick={handleDeleteGroup}>Удалить группу</button>
            </div>
            {
                products?.map(item => {
                    return <div key={item.id}><OneProduct groupId={id} {...item} /></div>
                })
            }
            <button onClick={handleAddProducts} className={styles.addProductBtn}>Добавить продукт</button>
        </div>
    )
}