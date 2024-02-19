import React from 'react'
import { useState } from 'react';
import { Team } from '../interfaces/teamInterface';
import { useAppSelector, useAppDispatch } from '../redux/hook';
import axios from 'axios';
import { loading, removeLoading } from '../redux/slices/loading/loadingSlice';
import { apiDb } from '../axios/apiDb';

export const useGetTeamById = () => {


    const [infoGroup, setInfoGroup] = useState<Team>();

    const { token } = useAppSelector(state => state.auth);
    const { isLoading } = useAppSelector(state => state.loading);

    const dispatch = useAppDispatch();

    const getInfoGroup = async (id: string) => {
        dispatch(loading());
        try {
            const resp = await apiDb.get<Team>(`/team/profile/${id}`, {
                headers: {
                    Authorization: token!
                }
            })
            setInfoGroup(resp.data);
            dispatch(removeLoading());
        } catch (error: any) {
            console.log('error.response', JSON.stringify(error.response, null, 2))
            dispatch(removeLoading())
        }
    }

    return {
        infoGroup,
        getInfoGroup,
        groupLoading : isLoading
    }

}
