'use client'
import { addProduct, deleteGroup } from '@/app/store/appSlice';
import { OneProduct } from '../OneProduct/OneProduct'
import styles from './OneGroup.module.css'
import { useCallback, useState} from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import React from 'react';

export const OneGroup = React.memo(({ sum, count, id, products }: OneGroupProps) => {
    const dispatch = useDispatch()

    const handleAddProducts = useCallback(() => {
        dispatch(addProduct({ groupId: id, products: { id: uuidv4(), name: '', sum: 0, count: 0, price: 0 } }));
    }, [dispatch, id]);
    
    const handleDeleteGroup = useCallback(() => {
        dispatch(deleteGroup(id));
    }, [dispatch, id]);

    return(
        <div className={styles.wrapper}>
            <h4>Группа {count}</h4>
            <div className={styles.groupForm}>
                <span>Сумма группы</span>
                <input disabled value={sum} type="text" />
                <button onClick={handleDeleteGroup}>Удалить группу</button>
            </div>
            {
                products?.map(item => <OneProduct key={item.id} groupId={id} {...item} />)
            }
            <button onClick={handleAddProducts} className={styles.addProductBtn}>Добавить продукт</button>
        </div>
    )
})