import { useCallback, useEffect, useState } from 'react'
import styles from './OneProduct.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, updateAllGroupsSum, updateGroupSum, updateProduct, updateProductSum } from '@/app/store/appSlice'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const createSchema = (group: IGroup | undefined) => yup.object().shape({
    name: yup
        .string()
        .min(3, 'Не менее 3 символов')
        .max(100, 'не более 100 символов')
        .required('Укажите название товара')
        .test('is-unique', 'Товар с таким именем уже существует', function (value) {
            const duplicate = group?.products.find(product => product.name === value);
            return !duplicate;
        }),
    price: yup
        .number()
        .typeError('Цена должна быть числом')
        .required('Укажите цену')
        .positive('Цена должна быть положительной')
        .max(9999999, 'Цена слишком высока'),
    count: yup
        .number()
        .positive('Колличество должно быть положительным')
});

export const OneProduct = ({  groupId, ...props }: OneProductProps) => {
    const { group, product } = useSelector((state: AppState) => {
        const group = state.groups.find(group => group.id === groupId);
        const product = group?.products.find(product => product.id === props.id);
        return { group, product };
    });

    const [count, setCount] = useState<  number | undefined>(product?.count)

    const {
        register,
        formState: { errors },
    } = useForm<IProduct | any>({
        mode: 'onChange',
        resolver: yupResolver(createSchema(group)),
    });

    const [price, setPrice] = useState(product?.price || '');

    const dispatch = useDispatch()

    const handleBlur = useCallback((type: string) => {
        const value = parseFloat(price.toString());
        if (!isNaN(value)) {
            const formattedPrice = value.toFixed(2);
            handleUpdateProduct(type, formattedPrice);
            setPrice(formattedPrice);
        } else {
            setPrice('0.00');
        }
    }, [price]);

    useEffect(() => {
        if (typeof product?.price === 'number') {
            setPrice(product.price.toFixed(2));
        }
    }, [product]);

    const handleUpdateProduct = useCallback((field: string, value: string | number) => {
        dispatch(updateProduct({ groupId, productId: props.id, newValues: { [field]: value } }));
        dispatch(updateProductSum({ groupId, productId: props.id }));
        dispatch(updateGroupSum({ groupId }));
        dispatch(updateAllGroupsSum())
    }, [dispatch, groupId, props.id]);

    const handleDeleteProduct = useCallback(() => {
        dispatch(deleteProduct({ groupId, id: props.id }))
        dispatch(updateProductSum({ groupId, productId: props.id }));
        dispatch(updateGroupSum({ groupId }));
        dispatch(updateAllGroupsSum())
    }, [dispatch, groupId, props.id]);

    const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => handleUpdateProduct('name', e.target.value), [handleUpdateProduct]);
    const handlePriceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value), [setPrice]);
    const handleCountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);  
        setCount(isNaN(value) ? 0 : value);
        handleUpdateProduct('count', isNaN(value) ? '' : value);
    }, [setCount, handleUpdateProduct]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.inputBlock}>
                <span>Название</span>
                <input value={product?.name}
                    {...register('name', {
                        onChange: handleNameChange
                    })}
                    type="text" />

                {errors && (
                    <p className={styles.errorMessage}>
                        {(errors.name && errors.name.message)?.toString()}
                    </p>
                )}

            </div>
            <div className={styles.inputBlock}>
                <span>Цена</span>
                <input
                    value={price}
                    {...register('price', {
                        onChange: handlePriceChange,
                        onBlur: () => handleBlur('price')
                    })}
                    name='price'
                    type="text"
                />
                {errors && (
                    <p className={styles.errorMessage}>
                        {(errors.price && errors.price.message)?.toString()}
                    </p>
                )}
            </div>
            <div className={styles.inputBlock}>
                <span>Кол-во</span>
                <input
                    value={count}
                    {...register('count', {
                        onChange: handleCountChange
                    })}
                    type="text" />
                {errors && (
                    <p className={styles.errorMessage}>
                        {(errors.count && errors.count.message)?.toString()}
                    </p>
                )}
            </div>
            <div className={styles.inputBlock}>
                <span>Сумма</span>
                <input disabled onChange={(e) => handleUpdateProduct('sum', +e.target.value)} value={product?.sum} name='sum' type="number" />
            </div>
            <button onClick={handleDeleteProduct} className={styles.deleteBtn}>Удалить</button>
        </div>
    )
}