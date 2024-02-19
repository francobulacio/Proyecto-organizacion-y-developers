import React from 'react'
import { apiDb } from '../axios/apiDb'
import { useAppSelector, useAppDispatch } from '../redux/hook';
import { loading, removeLoading } from '../redux/slices/loading/loadingSlice';
import { logUser } from '../redux/slices/user/userSlice';

export const useRefreshUser = () => {

    const { auth, user } = useAppSelector(state => state)
    const dispatch = useAppDispatch();

    const refreshUser = async () => {
        dispatch(loading())
        try {
            const { data } = await apiDb.get(`/${user.isDev ? 'dev' : 'client'}/profile/${user._id}`, {
                headers: {
                    Authorization: auth.token!
                }
            });
            dispatch(logUser(data))
            dispatch(removeLoading())
        } catch (error: any) {
            dispatch(removeLoading())
            console.log('error-refreshUser', JSON.stringify(error.response, null, 2))

        }


    }


    return {
        refreshUser
    }



}
