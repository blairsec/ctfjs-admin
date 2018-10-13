import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VueStash from 'vue-stash'
import axios from 'axios'
import config from './config'

Vue.use(VueStash)

Vue.mixin({
  methods: {
    markdown (text) {
      return marked(text)
    },
    post (route, data, competition) {
      return axios.post(config.API_URL + (competition === false ? '' : ('/competitions/' + this.$store.competition.id)) + route, data, { headers: { Authorization: 'Token ' + localStorage['token'] } })
    },
    get (route, competition) {
      return axios.get(config.API_URL + (competition === false ? '' : ('/competitions/' + this.$store.competition.id)) + route, { headers: { Authorization: 'Token ' + localStorage['token'] } })
    },
    patch (route, data, competition) {
      return axios.patch(config.API_URL + (competition === false ? '' : ('/competitions/' + this.$store.competition.id)) + route, data, { headers: { Authorization: 'Token ' + localStorage['token'] } })
    },
    put (route, data, competition) {
      return axios.put(config.API_URL + (competition === false ? '' : ('/competitions/' + this.$store.competition.id)) + route, data, { headers: { Authorization: 'Token ' + localStorage['token'] } })
    },
    deleteRequest (route, competition) {
      return axios.delete(config.API_URL + (competition === false ? '' : ('/competitions/' + this.$store.competition.id)) + route, { headers: { Authorization: 'Token ' + localStorage['token'] } })
    },
    logout () {
      localStorage.removeItem('token')
      this.reload()
      this.alert('Success!', 'You have been logged out.', 'success')
    },
    updateCompetition (competition) {
      this.$store.competition = competition
      localStorage.competition = competition.id
      this.reload().then(function () { this.routerKey++ }.bind(this)) 
      this.$emit('reload')
    },
    reload () {
      var emptyUser = {
        id: null,
        username: null,
        eligible: null,
        created: null,
        team: {
          id: null,
          name: null,
          members: [],
          eligible: null,
          affiliation: null,
          created: null,
          score: null,
          solves: []
        }
      }
      return this.get('/competitions', false).then(function (res) {
        this.$store.competitions = res.data
      }.bind(this)).then(() => this.get('/self', false)).then(function (res) {
        this.$store.user = res.data.user
        this.$store.competition = localStorage.competition && this.$store.competitions.filter(c => c.id === parseInt(localStorage.competition))[0] ? this.$store.competitions.filter(c => c.id === parseInt(localStorage.competition))[0] : this.$store.competitions[0]
        this.$store.competitionLoaded = true
        this.$store.loaded = true
      }.bind(this)).catch(() => this.$router.push('/login'))
    }
  }
})


Vue.use(BootstrapVue);

Vue.config.productionTip = false

new Vue({
	router,
	components: { App },
	template: '<App/>',
	data: {
	  store: {
	    user: {
	      id: null,
	      username: null,
	      eligible: null,
	      created: null,
	      team: {
	        id: null,
	        name: null,
	        members: [],
	        eligible: null,
	        affiliation: null,
	        created: null,
	        score: null,
	        solves: []
	      },
	      theme: '',
	    },
	    competition: null,
	    competitions: [],
	    loaded: false,
	    competitionLoaded: false,
	    alerts: []
	  },
	  refreshKey: 1
	},
	mounted () {
	  this.reload()
	},
	render: h => h(App)
}).$mount('#app')
