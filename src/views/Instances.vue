<template>
	<div>
		<h1>Instances</h1>
		<div v-for="(value, key) in instances" style="padding: 1em;">
			{{ value.image }}
			({{ value.status }})<br>
			<b-button @click="action(key, 'start')" variant="success">Start</b-button>&nbsp;
			<b-button @click="action(key, 'stop')" variant="warning">Stop</b-button>&nbsp;
			<b-button @click="action(key, 'restart')" variant="info">Restart</b-button>&nbsp;
			<b-button @click="deleteInstance(key)" variant="danger">Delete</b-button>&nbsp;
		</div><br>
		<h3>Create Instance</h3>
		<b-form-group
		              label="Repo:"
		              label-for="repo">
		  <b-form-input id="repo"
		                type="text"
		                v-model="form.repo"
		                required
		                placeholder="Enter repo">
		  </b-form-input>
		</b-form-group>
		<b-form-group
		              label="Tag:"
		              label-for="tag">
		  <b-form-input id="tag"
		                type="text"
		                v-model="form.tag"
		                required
		                placeholder="Enter tag">
		  </b-form-input>
		</b-form-group>
		<b-form-group
		              label="Domain:"
		              label-for="domain">
		  <b-form-input id="domain"
		                type="text"
		                v-model="form.environment.VIRTUAL_HOST"
		                required
		                placeholder="Enter domain">
		  </b-form-input>
		</b-form-group>
		<b-button @click="create" variant="primary">Create</b-button>
	</div>
</template>

<script>
export default {
	data () {
		return {
			instances: [],
			form: {
				repo: null,
				tag: null,
				environment: {
					VIRTUAL_HOST: null
				}
			}
		}
	},
	methods: {
		load () {
			this.get('/narwhal/instances', false).then(function (res) {
				this.instances = res.data
				console.log(this.instances)
			}.bind(this))
		},
		action (instance, action) {
			this.patch('/narwhal/instances/'+instance, {action: action}, false).then(this.load)
		},
		create () {
			this.post('/narwhal/instances', this.form, false).then(this.load).then(function () {
				this.form = {
				repo: null,
				tag: null,
				environment: {
					VIRTUAL_HOST: null
				}
			}
			}.bind(this))
		},
		deleteInstance (instance) {
			this.deleteRequest('/narwhal/instances/'+instance, false).then(this.load)
		}
	},
	mounted () {
		this.load()
	}
}
</script>
