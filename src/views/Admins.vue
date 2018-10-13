<template>
	<div>
		<Object :fields="fields" :columns="columns" url="/admin" name="admin" :noCompetition="false"></Object>
	</div>
</template>

<script>
import { VueGoodTable } from 'vue-good-table';
import Object from '../components/Object'
export default {
	name: 'users',
	components: {
		VueGoodTable,
		Object
	},
	data () {
		return {
			columns: [
				{
					label: 'Username',
					field: 'username',
					filterOptions: {
						enabled: true
					}
				},
				{
					label: 'Eligible',
					field: 'eligible',
					type: 'boolean'
				},
			],
			fields: [
				{
					name: 'username',
					type: 'text',
					required: true
				},
				{
					name: 'email',
					type: 'text',
					required: true
				},
				{
					name: 'password',
					type: 'password',
					editable: false,
					required: true
				}
			]
		}
	}
}
</script>