<template>
	<div><h5>{{ this.rows.length }} teams have registered.</h5>
		<vue-good-table :columns="columns" :rows="rows" :pagination-options="{ enabled: true }" :sort-options="{ enabled: true }"/>
	</div>
</template>

<script>
import { VueGoodTable } from 'vue-good-table';
export default {
	name: 'teams',
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
					label: 'Name',
					field: 'name',
					filterOptions: {
						enabled: true
					}
				},
				{
					label: 'Affiliation',
					field: 'affiliation',
					filterOptions: {
						enabled: true
					}
				},
				{
					label: 'Eligible',
					field: 'eligible',
					type: 'boolean'
				}
			],
			rows: []
		}
	},
	methods: {
		load () {
			this.reload().then(function () { this.get('/teams').then(function (response) {
				this.rows = response.data
			}.bind(this)) }.bind(this))
		}
	},
	mounted () {
		this.load()
	}
}
</script>