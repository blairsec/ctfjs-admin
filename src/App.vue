<template>
  <div>
    <b-navbar variant="info" type="dark" toggleable="md">
      <router-link to="/"><b-navbar-brand>CTF Admin</b-navbar-brand></router-link>

      <b-navbar-nav>
        <b-nav-item><router-link to="/users">Users</router-link></b-nav-item>
        <b-nav-item><router-link to="/teams">Teams</router-link></b-nav-item>
        <b-nav-item><router-link to="/challenges">Challenges</router-link></b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item>Competitions</b-nav-item>
        <b-nav-item-dropdown :text="$store.competition ? $store.competition.name : ''" right>
          <b-dropdown-item @click="updateCompetition(competition); $refs.view.load()" v-for="(competition, index) in $store.competitions" :key="index">{{ competition.name }}</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item>Log Out</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <router-view class="m-4" ref="view"></router-view>
  </div>
</template>

<style lang="scss">
@import '../node_modules/bootstrap/dist/css/bootstrap.css';
@import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
@import '../node_modules/vue-good-table/dist/vue-good-table.css';

a, a:hover {
  color: inherit;
  text-decoration: inherit;
}
</style>
