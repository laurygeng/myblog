# Vuex

### state mutations actions dispatch ###   
state用于存放Vuex数据，里面是个对象  
mutations通过mutations来修改，但是异步的需要actions  
actions:通过this.$store.dispatch("action名字","参数")一个action来改变state（action在收到指令之后再通过context.commit('mutations的名字')的方式来触发mutations）  

### Getter ###  
getter是store的计算属性，返回值会被缓存起来，只有当它发生改变才会被重新计算。理解为从state中派生出来的一些状态


### mapGetters mapState ###  
mapState是一个辅助函数，避免所有的状态都要声明为计算属性，这个辅助函数可以帮助生成计算属性  
mapGetters 也是辅助函数，是将 store 中的 getter 映射到局部计算属性
```
import { mapState, mapGetters } from 'vuex'  
computed: {
    ...mapGetters(['tagWel', 'tagList', 'tag', 'website']),
    ...mapState({
      showTag: state => state.common.showTag
    }),
}
```

### Module ### 
单一状态树，应用的状态都集中到一个对象会比较大，应用复杂的时候store对象臃肿。Vuex允许切割Store分成模块（module）