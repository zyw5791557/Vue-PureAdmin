<template>
	<section>
		userHome
		<button @click="add">加加加</button>
		<h1>{{count}}</h1>
		<h2>{{countAlias}}</h2>
	</section>
</template>
<script>
	import {mapState} from 'vuex';
	export default {
		data () {
			return {
				
			}
		},
		computed: {
			...mapState({
				count() {
					return this.$store.state.count
				},
				countAlias: 'count'
			})
		},
		methods: {
			add() {
				// Mutations 
				// this.$store.commit('intrement', {
				// 	num: 10
				// });
				
				// Actions 事件分发
				this.$store.dispatch('intrement', {
					num: 8,
					time: 1000
				}).then( res => {
					// 回调函数
					console.log('我是七夜');
				})
			}
		},
		mounted() {
			
		}
	}
</script>
<style scoped lang="scss">
	
</style>