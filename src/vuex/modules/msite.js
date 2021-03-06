import { getUrl, getUrl2 } from '@/config/';
import  { fetch } from '@/service/ajaxWrap';
import { mapActions } from 'vuex';
import {getAddressReq} from "../../api";

const state = {
    dingwei:[],
    userData:[],
    abnormal:[]
}

const mutations = {

}

const actions = {

    loadPost({commit, dispatch}, data = {}) {
        const params = {
            mobile: 15768459114
        }
        fetch({commit,params, dispatch, method: 'post',
        url: getUrl('ceshi'),
            before() {
            },
            success ({ res, commit, dispatch }) {
                if (res) {
                    state.userData = res.data
                    state.dingwei = res.data.data
                }
                data.scCallback && data.scCallback(res);
            },
            error ({ err, commit, dispatch }){
            },
            after () {
                data.afterCallback && data.afterCallback()
            }
        })
    },
    loadPost2({commit, dispatch}, data = {}) {
      const params = {
        mobile: 15768459114
      }
      fetch({commit,params, dispatch, method: 'post',
        url: getUrl('abnormal'),
        before() {
        },
        success ({ res, commit, dispatch }) {
          if (res) {
            state.abnormal = res.data
          }
          data.scCallback && data.scCallback(res);
        },
        error ({ err, commit, dispatch }){
        },
        after () {
          data.afterCallback && data.afterCallback()
        }
      })
    },
}

const getters = {
    dingwei(state){
        return state.dingwei
    },
    userData(state){
        return state.userData
    },
    abnormal(state){
        return state.abnormal
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}



