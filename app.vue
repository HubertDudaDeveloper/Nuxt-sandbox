<template>
  <div>
    {{ pokemons }}
  </div>
</template>
<script lang="ts" setup>
import { useStore } from 'vuex'

const store = useStore();

await store.dispatch('loadPokemons');

const pokemons = store.getters.allPokemons; 
</script>