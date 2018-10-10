<template>
	<div><h5>{{ this.rows.length }} challenges have been created.</h5> <b-button variant="primary" class="mb-2" v-b-modal.createChallenge>Create Challenge</b-button>
		<vue-good-table :columns="columns" :rows="rows" :pagination-options="{ enabled: true }" :sort-options="{ enabled: true }"/>

		<b-modal id="createChallenge" title="Create Challenge" size="lg">
			<div slot="modal-footer"></div>
			<b-form>
				<b-form-group id="titleGroup"
				              label="Title:"
				              label-for="title">
				  <b-form-input id="title"
				                type="text"
				                v-model="form.title"
				                required
				                placeholder="Enter title">
				  </b-form-input>
				</b-form-group>
				<b-form-group id="descriptionGroup"
				              label="Description:"
				              label-for="description">
				  <b-form-textarea id="description"
				                v-model="form.description"
				                required
				                placeholder="Enter description">
				  </b-form-textarea>
				</b-form-group>
				<b-form-group id="hintGroup"
				              label="Hint:"
				              label-for="hint">
				  <b-form-textarea id="hint"
				                v-model="form.hint"
				                placeholder="Enter hint">
				  </b-form-textarea>
				</b-form-group>
				<b-form-group id="categoryGroup"
				              label="Category:"
				              label-for="category">
				  <b-form-input id="category"
				                type="text"
				                v-model="form.category"
				                required
				                placeholder="Enter category">
				  </b-form-input>
				</b-form-group>
				<b-form-group id="authorGroup"
				              label="Author:"
				              label-for="author">
				  <b-form-input id="author"
				                type="text"
				                v-model="form.author"
				                required
				                placeholder="Enter author">
				  </b-form-input>
				</b-form-group>
				<b-form-group id="flagGroup"
				              label="Flag:"
				              label-for="flag">
				  <b-form-input id="flag"
				                type="text"
				                v-model="form.flag"
				                required
				                placeholder="Enter flag">
				  </b-form-input>
				</b-form-group>
				<b-form-group id="valueGroup"
				              label="Value:"
				              label-for="value">
				  <b-form-input id="value"
				                type="number"
				                v-model="form.value"
				                required
				                placeholder="Enter value">
				  </b-form-input>
				</b-form-group>
			  <b-form-checkbox id="enabled"
			                type="number"
			                v-model="form.enabled"
			                :value="true"
			                :unchecked-value="false"
			                required>
			                Enabled
			  </b-form-checkbox><br><br>
				<b-button type="submit" variant="primary">Create</b-button>
			</b-form>
		</b-modal>
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
			rows: [],
			form: {}
		}
	},
	methods: {
		load () {
			this.reload().then(function () { this.get('/challenges').then(function (response) {
				this.rows = response.data
			}.bind(this)) }.bind(this))
		}
	},
	mounted () {
		this.load()
	}
}
</script>