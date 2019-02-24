<template>
  <div>
    <h1>Shell Deployment</h1><br>
    <div class="challenge">
		<b-form-file id="file" required></b-form-file><br><br>
		<b-button @click="save">Deploy Challenge</b-button>
		<br><br><h3>{{ status }}</h3>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
	data () {
		return {
			status: ''
		}
	},
	methods: {
		save () {
			var formData = new FormData()
			formData.append('challenge', document.getElementById('file').files[0])
			this.post('/shell/deploy/challenge', formData, false).then(function (res) {
				this.status = 'Success.'
			}.bind(this)).catch(function () {
				this.status = 'Failure.'
			}.bind(this))
		},
	}
}
</script>

<style lang="scss">
</style>
