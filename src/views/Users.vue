<template>
	<div>
		<Object :fields="fields" :columns="columns" url="/users" name="user"></Object>
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
					label: 'Email',
					field: 'email',
					filterOptions: {
						enabled: true
					}
				},
				{
					label: 'Eligible',
					field: 'eligible',
					type: 'boolean'
				},
				{
					label: 'Team',
					field: 'team.name',
					filterOptions: {
						enabled: true
					},
					width: '20px'
				}
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
				},
				{
					name: 'eligible',
					type: 'boolean',
					required: true
				}
			]
		}
	}
}
</script>