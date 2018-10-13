<template>
  <div>
    <h1>Add File</h1><br>
    <b-form-input id="file"
                  required
                  placeholder="Enter source path (ex: challenge/file)"
                  v-model="file.source">
    </b-form-input><br>
    <b-form-textarea id="destination"
                  required
                  placeholder="Enter destination"
                  v-model="file.destination">
    </b-form-textarea><br>
    <b-button @click="save" variant="primary">Add</b-button>
  </div>
</template>

<script>
export default {
	data () {
		return {
			file: {
				source: null,
				destination: null
			}
		}
	},
	methods: {
		save () {
			this.put('/files/'+this.file.source, {destination: this.file.destination}, false).then(function () {
				this.file = {
					source: null,
					destination: null
				}
			}.bind(this))
		}
	}
}
</script>

<style lang="scss">
</style>
