<template>
	<div><h5>{{ this.rows.length }} {{ name }}s have been created.</h5> <b-button variant="primary" class="mb-2" v-b-modal.createObject>Create {{ toTitleCase(name) }}</b-button>
		<vue-good-table :columns="setColumns" :rows="rows" :pagination-options="{ enabled: true }" :sort-options="{ enabled: true }">
			    <template slot="table-row" slot-scope="props" >
			    </template>
			    <template slot="table-row" slot-scope="props">
			  <span v-if="props.column.field == 'actions'">
			    <a class="btn btn-sm primary" v-b-modal.deleteObject @click="setDeleteObject">Delete</a>
				<a class="btn btn-sm primary"  v-b-modal.editObject @click="setEditObject">Edit</a>
			  </span>
			  <span v-else>
			    {{props.formattedRow[props.column.field]}}
			  </span>
			</template> 
		</vue-good-table>

		<b-modal id="createObject" ref="createObject" :title="'Create '+name" size="lg" hide-footer>
			<div slot="modal-footer"></div>
			<b-form @submit="create">

				<b-form-group v-for="field in fields" :id="field.name+'Group'"
				              :label="toTitleCase(field.name) + ':'"
				              :label-for="field.name">
				  <b-form-input v-if="field.type === 'text' || field.type === 'number'" :id="field.name"
				                :type="field.type"
				                v-model="form[field.name]"
				                :required="field.required"
				                :placeholder="'Enter '+field.name">
				  </b-form-input>
				  <b-form-textarea v-if="field.type === 'textarea'" :id="field.name"
				                v-model="form[field.name]"
				                :required="field.required"
				                :placeholder="'Enter '+field.name">
				  </b-form-textarea>
				  <b-form-input v-if="field.type === 'password'" :id="field.name"
				                type="password"
				                v-model="form[field.name]"
				                :required="field.required"
				                :placeholder="'Enter '+field.name">
				  </b-form-input>
				  <b-form-checkbox v-if="field.type === 'boolean'" :id="field.name"
				                v-model="form[field.name]"
				                :value="true"
				                :unchecked-value="false">
				                {{toTitleCase(field.name)}}
				  </b-form-checkbox>
				</b-form-group>

				<b-button type="submit" variant="primary">Create</b-button>
			</b-form>
		</b-modal>
		<b-modal id="editObject" ref="editObject" :title="'Edit ' + name" size="lg" hide-footer>
			<div slot="modal-footer"></div>
			<b-form @submit="save">

				<b-form-group v-if="field.editable !== false" v-for="field in fields" :id="'edit'+field.name+'Group'"
				              :label="toTitleCase(field.name) + ':'"
				              :label-for="'edit'+field.name">
				  <b-form-input v-if="field.type === 'text' || field.type === 'number'" :id="'edit'+field.name"
				                :type="field.type"
				                v-model="editForm[field.name]"
				                :placeholder="'Enter '+field.name">
				  </b-form-input>
				  <b-form-textarea v-if="field.type === 'textarea'" :id="'edit'+field.name"
				                v-model="editForm[field.name]"
				                :required="field.required"
				                :placeholder="'Enter '+field.name">
				  </b-form-textarea>
				  <b-form-input v-if="field.type === 'password'" :id="'edit'+field.name"
				                type="password"
				                v-model="editForm[field.name]"
				                :placeholder="'Enter '+field.name">
				  </b-form-input>
				  <b-form-checkbox v-if="field.type === 'boolean'" :id="'edit'+field.name"
				                v-model="editForm[field.name]"
				                :value="true"
				                :unchecked-value="false">
				                {{toTitleCase(field.name)}}
				  </b-form-checkbox>
				</b-form-group>

				<b-button type="submit" variant="primary">Save</b-button>
			</b-form>
		</b-modal>
		<b-modal id="deleteObject" ref="deleteObject" :title="'Delete '+name" size="lg" hide-footer>
			<div slot="modal-footer"></div>
			<p>Are you sure you want to delete that {{ name }}?</p>
			<b-button variant="danger" @click="deleteObject">Delete</b-button>
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
			rows: [],
			form: {},
			dates: [],
			times: [],
			editForm: {},
			objectToDelete: null,
			objectToEdit: null,
			setColumns: []
		}
	},
	props: [
		'name',
		'noCompetition',
		'url',
		'columns',
		'fields'
	],
	computed: {
	  date (i) {
	    return new Date(this.dates[i] + ' ' + this.times[i]).toISOString()
	  }
	},
	methods: {
		load () {
			this.reload().then(function () { this.get(this.url, this.noCompetition === false ? false : true).then(function (response) {
				this.rows = response.data
			}.bind(this)) }.bind(this))
		},
		create (e) {
			e.preventDefault()
			for (var f = 0; f < this.fields.length; f++) {
				if (this.fields[f].type === 'number' && this.form[this.fields[f].name]) {
					this.form[this.fields[f].name] = parseInt(this.form[this.fields[f].name])
				}
			}
			this.post(this.url, this.form, this.noCompetition === false ? false : true).then(this.$refs.createObject.hide).then(this.load)
		},
		save (e) {
			e.preventDefault()
			for (var f = 0; f < this.fields.length; f++) {
				if (this.fields[f].type === 'number' && this.editForm[this.fields[f].name]) {
 					this.editForm[this.fields[f].name] = parseInt(this.editForm[this.fields[f].name])
				}
			}
			this.patch(this.url+'/'+this.objectToEdit, this.editForm, this.noCompetition === false ? false : true).then(this.$refs.editObject.hide).then(this.load)
		},
		setEditObject (e) {
			this.editForm = this.rows.filter(c => c.id == parseInt(e.target.parentNode.parentNode.parentNode.childNodes[4].innerText))[0]
			this.objectToEdit = parseInt(e.target.parentNode.parentNode.parentNode.childNodes[4].innerText)
			/*var start = new Date(this.editCompetition.start)
			this.startDate = start.getFullYear() + '-' + (start.getMonth() + 1).toString().padStart(2, '0') + '-' + start.getDate().toString().padStart(2, '0')
			this.startTime = start.toTimeString().split(' ')[0]
			var end = new Date(this.editCompetition.end)
			this.endDate = end.getFullYear() + '-' + (end.getMonth() + 1).toString().padStart(2, '0') + '-' + end.getDate().toString().padStart(2, '0')
			this.endTime = end.toTimeString().split(' ')[0]*/
		},
		deleteObject (e) {
			e.preventDefault()
			this.deleteRequest(this.url + '/' + this.objectToDelete, this.noCompetition === false ? false : true).then(this.$refs.deleteObject.hide).then(this.load)
		},
		setDeleteObject (e) {
			console.log(e.target)
			this.objectToDelete = parseInt(e.target.parentNode.parentNode.parentNode.childNodes[4].innerText)
		},
		toTitleCase (string) {
			return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		}
	},
	mounted () {
		this.setColumns = [{
			label: 'ID',
			field: 'id',
			filterOptions: {
				enabled: true
			},
			type: 'number',
			width: '50px'
		}].concat(this.columns).concat([{
			label: 'Actions',
			field: 'actions',
			width: '150px'
		}])
		this.load()
		this.$parent.$parent.$on('reload', this.load)
	}
}
</script>