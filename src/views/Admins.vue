<template>
	<div><h5>{{ this.rows.length }} admins have been created.</h5> <b-button variant="primary" class="mb-2" v-b-modal.createAdmin>Create Admin</b-button>
		<vue-good-table :columns="columns" :rows="rows" :pagination-options="{ enabled: true }" :sort-options="{ enabled: true }"/>

				<b-modal id="createAdmin" ref="createAdmin" title="Create Admin" size="lg" hide-footer>
					<div slot="modal-footer"></div>
					<b-form @submit="create">

						<b-form-group id="nameGroup"
						              label="Email:"
						              label-for="name">
						  <b-form-input id="name"
						                type="email"
						                v-model="form.email"
						                required
						                placeholder="Enter email">
						  </b-form-input>
						</b-form-group>
						<b-form-group id="aboutGroup"
						              label="Username:"
						              label-for="about">
						  <b-form-textarea id="about"
						                v-model="form.username"
						                required
						                placeholder="Enter username">
						  </b-form-textarea>
						</b-form-group>
						<b-form-group id="teamSizeGroup"
						              label="Password:"
						              label-for="teamSize">
						  <b-form-input id="teamSize"
						                type="password"
						                v-model="form.password"
						                required
						                placeholder="Enter password">
						  </b-form-input>
						</b-form-group>

						<b-button type="submit" variant="primary">Create</b-button>
					</b-form>
				</b-modal>
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
					label: 'Eligible',
					field: 'eligible',
					type: 'boolean'
				},
			],
			rows: [],
			form: {
				username: '',
				password: '',
				email: ''
			}
		}
	},
	methods: {
		load () {
			this.reload().then(function () { this.get('/admin', false).then(function (response) {
				this.rows = response.data
			}.bind(this)) }.bind(this))
		},
		create (e) {
			e.preventDefault()
			this.post('/admin', this.form, false).then(this.$refs.createAdmin.hide).then(this.load)
		}
	},
	mounted () {
		this.load()
	}
}
</script>