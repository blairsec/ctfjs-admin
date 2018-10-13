<template>
	<div>
		<Object :fields="fields" :columns="columns" url="/challenges" name="challenge"></Object>
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
					label: 'Title',
					field: 'title',
					filterOptions: {
						enabled: true
					}
				},
				{
					label: 'Category',
					field: 'category',
					filterOptions: {
						enabled: true
					}
				},
				{
					label: 'Enabled',
					field: 'enabled',
					type: 'boolean'
				},
				{
					label: 'Solves',
					field: 'solves',
					type: 'number'
				}
			],
			fields: [
				{
					name: 'title',
					type: 'text',
					required: true
				},
				{
					name: 'description',
					type: 'textarea',
					required: true
				},
				{
					name: 'hint',
					type: 'textarea',
					required: false
				},
				{
					name: 'category',
					type: 'text',
					required: true
				},
				{
					name: 'author',
					type: 'text',
					required: true
				},
				{
					name: 'flag',
					type: 'text',
					required: true
				},
				{
					name: 'value',
					type: 'number',
					required: true
				},
				{
					name: 'enabled',
					type: 'boolean',
					required: true
				}
			],
			rows: [],
			form: {
				title: null,
				description: null,
				hint: null,
				category: null,
				author: null,
				flag: null,
				value: null,
				enabled: false
			}
		}
	},
	methods: {
		load () {
			this.reload().then(function () { this.get('/challenges').then(function (response) {
				this.rows = response.data
			}.bind(this)) }.bind(this))
		},
		create (e) {
			e.preventDefault()
			if (!this.form.hint) this.form.hint = null
			this.post('/challenges', this.form).then(this.$refs.createChallenge.hide).then(this.load)
		}
	},
	mounted () {
		this.load()
	}
}
</script>