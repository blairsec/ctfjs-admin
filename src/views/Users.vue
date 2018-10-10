<template>
	<div><h5>{{ this.rows.length }} users have registered.</h5>
		<vue-good-table :columns="columns" :rows="rows" :pagination-options="{ enabled: true }" :sort-options="{ enabled: true }"/>
	</div>
</template>

<script>
import { VueGoodTable } from 'vue-good-table';
export default {
	name: 'users',
	components: {
		VueGoodTable
	},
	data () {
		return {
			columns: [
				{
					label: 'ID',
					field: 'id',
					filterOptions: {
						enabled: true
					},
					type: 'number',
					width: '50px'
				},
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
			rows: []
		}
	},
	methods: {
		load () {
			this.reload().then(function () { this.get('/users').then(function (response) {
				this.rows = response.data
			}.bind(this)) }.bind(this))
		}
	},
	mounted () {
		this.load()
	}
}
</script>