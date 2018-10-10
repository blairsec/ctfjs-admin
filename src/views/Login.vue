<template>
	<div>
		<b-form @submit="submit">
			<b-form-group id="usernameGroup"
			              label="Username:"
			              label-for="username">
			  <b-form-input id="username"
			                type="text"
			                v-model="form.username"
			                required
			                placeholder="Enter username">
			  </b-form-input>
			</b-form-group>
			<b-form-group id="passwordGroup"
			              label="Password:"
			              label-for="password">
			  <b-form-input id="password"
			                type="password"
			                v-model="form.password"
			                required
			                placeholder="Enter password">
			  </b-form-input>
			</b-form-group>
			<b-button type="submit" variant="primary">Log In</b-button>
		</b-form>
	</div>
</template>

<script>
export default {
	data () {
		return {
			form: {
				username: '',
				password: ''
			}
		}
	},
	methods: {
		submit (e) {
			e.preventDefault()
			this.post('/admin/auth', { username: this.form.username, password: this.form.password }, false).then(function (res) {
			  localStorage['token'] = res.data.token
			  this.$router.push('/')
			}.bind(this)).then(this.reload).then(function () { alert('You have logged in.') }.bind(this)).catch(function (error) {
			  if (error.response.status === 401) alert('You couldn\'t be logged in. Wrong username or password?')
			  else if (error.response.status === 400) alert('Make sure to fill out all required fields.')
			}.bind(this))
		}
	}
}
</script>