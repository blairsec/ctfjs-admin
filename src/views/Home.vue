<template>
  <div>
    <h1>Home</h1>
    <b-form-input id="title"
                  required
                  placeholder="Enter homepage title"
                  v-model="home.title">
    </b-form-input><br>
    <b-form-textarea id="content"
                  required
                  placeholder="Enter homepage text"
                  v-model="home.content">
    </b-form-textarea><br>
    <b-button @click="save" variant="primary">Save</b-button>
  </div>
</template>

<script>
export default {
	data () {
		return {
			home: {
				title: null,
				content: null
			}
		}
	},
	mounted () {
		this.get('/home', false).then(function (res) {
			this.home = res.data
		}.bind(this))
	},
	methods: {
		save () {
			this.put('/home', this.home, false)
		}
	}
}
</script>

<style lang="scss">
</style>
