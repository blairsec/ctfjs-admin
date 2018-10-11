<template>
	<div><h5>{{ this.rows.length }} competitions have been created.</h5> <b-button variant="primary" class="mb-2" v-b-modal.createCompetition>Create Competition</b-button>
		<vue-good-table :columns="columns" :rows="rows" :pagination-options="{ enabled: true }" :sort-options="{ enabled: true }">
			    <template slot="table-row" slot-scope="props" >
			    </template>
			    <template slot="table-row" slot-scope="props">
			  <span v-if="props.column.field == 'actions'">
			    <a class="btn btn-sm primary" v-b-modal.deleteCompetition @click="setCompetitionToDelete">Delete</a>
				<a class="btn btn-sm primary"  v-b-modal.editCompetition @click="setEditCompetition">Edit</a>
			  </span>
			  <span v-else>
			    {{props.formattedRow[props.column.field]}}
			  </span>
			</template> 
		</vue-good-table>

		<b-modal id="createCompetition" ref="createCompetition" title="Create Competition" size="lg" hide-footer>
			<div slot="modal-footer"></div>
			<b-form @submit="create">

				<b-form-group id="nameGroup"
				              label="Name:"
				              label-for="name">
				  <b-form-input id="name"
				                type="text"
				                v-model="form.name"
				                required
				                placeholder="Enter name">
				  </b-form-input>
				</b-form-group>
				<b-form-group id="aboutGroup"
				              label="About:"
				              label-for="about">
				  <b-form-textarea id="about"
				                v-model="form.about"
				                required
				                placeholder="Enter about">
				  </b-form-textarea>
				</b-form-group>
				<b-form-group id="teamSizeGroup"
				              label="Team Size:"
				              label-for="teamSize">
				  <b-form-input id="teamSize"
				                type="number"
				                v-model="form.teamSize"
				                required
				                placeholder="Enter team size">
				  </b-form-input>
				</b-form-group>
				<label>Start Time</label><br>
				<input v-model="startDate" name="start-date" type="date">
				<input v-model="startTime" name="start-time" type="time">
				<br><br><label>End Time</label><br>
				<input v-model="endDate" name="end-date" type="date">
				<input v-model="endTime" name="end-time" type="time">
<br><br>

				<b-button type="submit" variant="primary">Create</b-button>
			</b-form>
		</b-modal>
		<b-modal id="editCompetition" ref="editCompetition" title="Edit Competition" size="lg" hide-footer>
			<div slot="modal-footer"></div>
			<b-form @submit="save">

				<b-form-group id="nameGroup"
				              label="Name:"
				              label-for="name">
				  <b-form-input id="name"
				                type="text"
				                v-model="editCompetition.name"
				                required
				                placeholder="Enter name">
				  </b-form-input>
				</b-form-group>
				<b-form-group id="aboutGroup"
				              label="About:"
				              label-for="about">
				  <b-form-textarea id="about"
				                v-model="editCompetition.about"
				                required
				                placeholder="Enter about">
				  </b-form-textarea>
				</b-form-group>
				<b-form-group id="teamSizeGroup"
				              label="Team Size:"
				              label-for="teamSize">
				  <b-form-input id="teamSize"
				                type="number"
				                v-model="editCompetition.teamSize"
				                required
				                placeholder="Enter team size">
				  </b-form-input>
				</b-form-group>
				<label>Start Time</label><br>
				<input v-model="startDate" name="start-date" type="date">
				<input v-model="startTime" name="start-time" type="time">
				<br><br><label>End Time</label><br>
				<input v-model="endDate" name="end-date" type="date">
				<input v-model="endTime" name="end-time" type="time">
<br><br>

				<b-button type="submit" variant="primary">Save</b-button>
			</b-form>
		</b-modal>
		<b-modal id="deleteCompetition" ref="deleteCompetition" title="Delete Competition" size="lg" hide-footer>
			<div slot="modal-footer"></div>
			<p>Are you sure you want to delete that competition?</p>
			<b-button variant="danger" @click="deleteCompetition">Delete</b-button>
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
					label: 'Name',
					field: 'name',
					filterOptions: {
						enabled: true
					}
				},
				{
					label: 'Team Size',
					field: 'teamSize',
					type: 'number'
				},
				{
					label: 'Actions',
					field: 'actions',
					width: '150px'
				}
			],
			rows: [],
			form: {

			},
			startDate: null,
			startTime: null,
			endDate: null,
			endTime: null,
			editCompetition: {},
			competitionToDelete: null
		}
	},
	computed: {
	  start () {
	    return new Date(this.startDate + ' ' + this.startTime).toISOString()
	  },
	  end () {
	    return new Date(this.endDate + ' ' + this.endTime).toISOString()
	  }
	},
	methods: {
		load () {
			this.reload().then(function () { this.get('/competitions', false).then(function (response) {
				this.rows = response.data
			}.bind(this)) }.bind(this))
		},
		 create (e) {
			e.preventDefault()
			this.form.start = this.start
			this.form.end = this.end
			this.form.teamSize = this.form.teamSize ? parseInt(this.form.teamSize) : null
			this.post('/competitions', this.form, false).then(this.$refs.createCompetition.hide).then(this.load)
		},
		save (e) {
			e.preventDefault()
			this.patch('/competitions/'+this.editCompetition.id, this.editCompetition, false).then(this.$refs.editCompetition.hide).then(this.load)
		},
		setEditCompetition (e) {
			this.editCompetition = this.$store.competitions.filter(c => c.id == parseInt(e.target.parentNode.parentNode.parentNode.childNodes[4].innerText))[0]
			var start = new Date(this.editCompetition.start)
			this.startDate = start.getFullYear() + '-' + (start.getMonth() + 1).toString().padStart(2, '0') + '-' + start.getDate().toString().padStart(2, '0')
			this.startTime = start.toTimeString().split(' ')[0]
			var end = new Date(this.editCompetition.end)
			this.endDate = end.getFullYear() + '-' + (end.getMonth() + 1).toString().padStart(2, '0') + '-' + end.getDate().toString().padStart(2, '0')
			this.endTime = end.toTimeString().split(' ')[0]
		},
		deleteCompetition (e) {
			e.preventDefault()
			this.deleteRequest('/competitions/' + this.competitionToDelete, false).then(this.$refs.deleteCompetition.hide).then(this.load)
		},
		setCompetitionToDelete (e) {
			this.competitionToDelete = parseInt(e.target.parentNode.parentNode.parentNode.childNodes[4].innerText)
		}
	},
	mounted () {
		this.load()
	}
}
</script>