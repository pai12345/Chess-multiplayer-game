<template>
  <div class="home">
    <div class="logo">
      <chess24-logo />
    </div>
    <tech-challenge
      msg="Welcome to the chess24 Tech Challenge App"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TechChallenge from '@components/TechChallenge.vue'
import Chess24Logo from '@components/Chess24Logo.vue'

@Component({
  components: {
    TechChallenge,
    Chess24Logo
  }
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
</style>
