import {getAddressReq} from './../../api';
import { getUrl, getUrl2 } from '@/config/';
import  { fetch } from '@/service/ajaxWrap';
// import store from '@/store/index';
// import  storage from '@/utils/storage'

// import {
//     SET_BLOODLIST,
//     SET_BLOOD_FINISHED

// } from './../mutation-types'
// import { push_uniq } from '_terser@3.17.0@terser';
// import { start } from 'pretty-error';

const state = {
    dataList:[],
    list:'',
    locationDataList:'',
    userXinxi:{},
    // typeName: '',

    // loading:false,
    // finished: false,
    // error: false,

    // phoneNumber: '',

    // isLoading: false,
}

const mutations = {
    // [SET_BLOODLIST] (state, val) {
    //     state.dataList = val;
    // },
    // [SET_BLOOD_FINISHED] (state, val) {
    //     state.finished = val;
    // }
}

const actions = {

    loadData: function ({commit, dispatch, state, rootState}, phone) {
        let url,
        // count = state.dataList.length;
        mobile = phone;
        // limit =  count + ",20";


        switch(state.typeName){
            case 'xy':
                url = getUrl('get_oxygen')
                break;
            case 'tw':
                url = getUrl('get_degrees')
                break;
            case 'bs':
                url = getUrl('get_step')
                break;
            case 'xl':
                url = getUrl('get_heart')
                break;
            case 'loc':
                url = getUrl('get_loc')
                break
            default:
                return false;
        }

        let params = {
            mobile: mobile,
            // limit: limit
        }
            fetch({
                commit,
                dispatch,
                params,
                method: 'post',
                url: url,
                before() {
                    // state.loading = true;
                },
                success({ res, commit, dispatch }) {
                    if (res.code != 1 ) {
                        // state.error = true;

                        return false;
                    }

                    if(res.data && res.data.length > 0){

                        state.dataList = res.data;

                        if (state.typeName == 'loc') {

                           dispatch({
                            type:'loadLocStr'
                        });
                        }


                    }


                    // res.data.length < 20 && commit('SET_BLOOD_FINISHED', true);
                },
                error ({ err, commit, dispatch }){

                },
                after () {
                    // state.loading = false;
                    // state.phoneNum = storage.localGet('phoneNumber')
                }
            })
    },
    loadLocStr: function({commit, dispatch, state, rootState}){
        let data,item,loc;

        for (let key in state.dataList) {
            item = state.dataList[key];
            loc = item.Latitude  + "," + item.Longitude;

            data = {
                callback : 'renderReverse',
                location: loc,
                output : 'json',
                pois : 1,
                latest_admin : 1,
                ak:'R40a87AFGzoBz4xc9PWE6WzASGVehg4r'
            };

            getAddressReq(data, function (res) {
                if(res.status == 0){
                    let addressStr = res.result.formatted_address;
                    state.dataList[key].addressStr = addressStr;
                    state.list = addressStr
                    console.log(state.dataList);
                }
            })
        }

    },
    loadType: function({commit, dispatch, state, rootState}, typeName){
        state.typeName = typeName;
    },
    reload: function({commit, dispatch, state, rootState}) {
        // state.dataList=[];
        state.typeName='';

        // state.loading=false;
        // state.finished= false;
        // state.error= false;

        // state.phoneNumber= ''
    },
    //地址列表
    getAddressList: function ({commit, dispatch, state, rootState}, parasm = {}) {
        let data = {
            callback : 'renderReverse',
            // location: `${state.staDay.data.Latitude},${state.staDay.data.Longitude}`,
            location: parasm.loc,
            output : 'json',
            pois : 1,
            latest_admin : 1,
            ak:'R40a87AFGzoBz4xc9PWE6WzASGVehg4r'
        };

        getAddressReq(data, function (res) {
            console.log(data , res);
            if(res.status == 0){
                let callback = parasm.callback;
                let addressStr = res.result.formatted_address;

                typeof callback == 'function' && callback(addressStr);
            }
        })
    },
}

const getters = {
    typeName(state) {
        return state.typeName;
    },
    dataList(state){
        return state.dataList
    },
    locationDataList(state){
        return state.locationDataList
    },
    list(state){
        return state.list
    },
    userXinxi(state){
        return state.userXinxi
    },
}


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}



