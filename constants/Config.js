import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

//const API_URL = 'https://iupi.ci.axlot.com/api/';
const API_URL = 'https://607b101abd56a60017ba359e.mockapi.io/api/';

export default {

    API_URL: API_URL,

    apiGet: (uri, params) => {
        return fetch(API_URL + uri, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        })
            .then((response) => {
                if (!response.ok) throw response;
                return response.json();
            })
    },

    apiPost: (uri, params) => {
        return fetch(API_URL + uri, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        })
            .then((response) => {
                if (!response.ok) throw response;
                return response.json();
            })
    },

    apiPostToken: async (uri, params) => {
        const token = await AsyncStorage.getItem('@Token');
        return fetch(API_URL + uri, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
            .then((response) => {
                if (!response.ok) throw response;
                return response.json();
            })
    },

    apiCatchErrors(error){
        try {
            error.json().then(response => {
                console.log('Try');
                console.log(response);
                let self = this;
                this.setState({
                    loading: false,
                    error: response.error
                });
                setTimeout(function () {
                    self.setState({error: ''});
                },3000)
            });
        } catch (e) {
            console.log('Catch');
            console.log(error);
            let self = this;
            this.setState({
                loading: false,
                error: error.toString()
            });
            setTimeout(function () {
                self.setState({error: ''});
            },2000)
        }
    },

};

