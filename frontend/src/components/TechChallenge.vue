<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p class="description">{{ description }}</p>
    <p class="hint">Here you get a King to start with... <img src="../assets/pieces/svg/white/k.svg" /></p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class TechChallenge extends Vue {
  @Prop() private msg!: string
  @Prop() private description!: string
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
a {
  color: #42b983;
}

.hint {
  display: inline-flex;
  align-items: center;
  line-height: 1;
}
</style>
