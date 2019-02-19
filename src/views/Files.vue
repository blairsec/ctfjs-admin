<template>
  <div>
    <h1>Challenge Files</h1><br>
    <div class="challenge" v-for="challenge in challenges">
    	<h2>{{ challenge.title }} <b-button variant="primary" @click="toggle(challenge.id)">{{ show[challenge.id] ? 'Hide' : 'Show' }}</b-button></h2>
    	<div v-if="show[challenge.id]">
    		<ul><li class="file" v-for="file in files[challenge.id]">{{ file.url }} <b-button variant="info" :href="file.url">View</b-button>&nbsp;<b-button variant="danger" @click="deleteFile(file.id, challenge.id)">Delete</b-button><br></li></ul>
    		<b-row><b-col><b-form-file id="file" required></b-form-file></b-col><b-col><b-button @click="save(challenge.id)">Add File</b-button></b-col></b-row>
    		<br>
    	</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
	data () {
		return {
			file: {
				source: null,
				destination: null
			},
			challenges: [],
			show: {},
			files: {}
		}
	},
	methods: {
		save (c) {
			var formData = new FormData()
			formData.append('file', document.getElementById('file').files[0])
			this.post('/challenges/' + c + '/files', formData, {
				headers: { 'Content-Type': 'multipart/form-data' }
			}).then(function (res) {
				this.loadFiles(c)
			}.bind(this))
		},
		toggle (c) {
			this.$set(this.show, c, !this.show[c])
			this.loadFiles(c)
		},
		deleteFile (f, c) {
			this.deleteRequest('/challenges/' + c + '/files/' + f).then(function (res) {
				this.loadFiles(c)
			}.bind(this))
		},
		loadFiles (c) {
			this.get('/challenges/' + c + '/files').then(function (res) {
				this.$set(this.files, c, res.data)
			}.bind(this))
		}
	},
	mounted () {
		this.reload().then(function () { this.get('/challenges').then(function (res) {
			this.challenges = res.data
		}.bind(this))}.bind(this))
	}
}
</script>

<style lang="scss">
</style>
