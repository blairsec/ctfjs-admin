<template>
	<div>
		<Object :fields="fields" :columns="columns" url="/teams" name="team"></Object>
	</div>
</template>

<script>
import { VueGoodTable } from 'vue-good-table';
import Object from '../components/Object'
export default {
	name: 'teams',
	components: {
		VueGoodTable,
		Object
	},
	data () {
		return {
			columns: [
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
			fields: [
				{
					name: 'name',
					type: 'text',
					required: true
				},
				{
					name: 'affiliation',
					type: 'text',
					required: true
				},
				{
					name: 'passcode',
					type: 'text',
					required: true
				}
			]
		}
	}
}
</script>