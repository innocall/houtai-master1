<template>
    <section>
        <!-- {{item}} -->
        {{typeName}}
    </section>
</template>

<script>
import {mapGetters, mapActions} from 'Vuex'
export default {
    props:['item','typeName'],
    data(){
        return{
            _latitude:0,
            _longitude:0
        }
    },
    computed: {
    ...mapGetters('healthyDetails',[
      'locationDataList',

    ])
  },
    mounted(){
        this.parser(this.item)
        
    },
    methods:{
        parser: function() {
      let that = this;
      switch (that.typeName) {
        case "loc":
          {
            that._latitude = that.item.Latitude;
            that._longitude =  that.item.Longitude;
          }
          break;

        default: {
          return false;
        }
      }
    },
    }
}
</script>

<style>

</style>

