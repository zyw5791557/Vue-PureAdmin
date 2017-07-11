import axios from 'axios';
import Vue from 'vue';
let base = '';

export let setLocalStorage = function(key, value, exp) {
	var curTime = new Date().getTime();
	curTime = exp + curTime;
    localStorage.setItem(key,JSON.stringify({data:value,time:curTime}));
};

export let getLocalStorage = function(key) {
	var data = localStorage.getItem(key);
    var dataObj = JSON.parse(data);
    if (new Date().getTime() - dataObj.time > 0) {
        // console.log('信息已过期');
        new Vue().$message('登录信息已过期');
    }else{
        return dataObj.data;
    }
}




// 备用
export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => {
	return axios.get(`${base}/user/listpage`, { params: params });
};

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };