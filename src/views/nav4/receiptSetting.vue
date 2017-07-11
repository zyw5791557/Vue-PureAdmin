<template>
	<div id="setting">
		<el-card class="box-card">
			<receipt></receipt>
		</el-card>
	</div>
</template>
<script>
import receipt from '../../components/setting/receipt';
	export default {
		data() {
			return {

			}	
		},
		components: {
			receipt
		}
	}
</script>
<style scoped lang="scss">
	.box-card {
		width: 500px;
	}
</style>