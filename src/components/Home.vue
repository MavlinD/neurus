<template lang="pug">
div
  h1 Выберите сессию

  div(v-for="val, key in data" :key="val.id")
    router-link(class='session' :to="{name: 'session', params: { id: val.id, sessionId: val.sessionId }}")
      | Сессия {{key.slice(-10,)}} от {{dateTime(val)}}

</template>

<script setup>

  import {onMounted, computed} from 'vue'
  import {useStore} from 'vuex'
  import moment from 'moment'

  const store = useStore()
  const data = computed(() => store.getters.GetSessions)
  onMounted(async () => {
    await store.dispatch('Fetch_Sessions')
  })

  function dateTime(a) {
    return moment.unix(a.timestamp).format('YYYY-MM-DD@HH:mm')
  }

</script>

<style lang="scss">
a {
  display: inline-block;
  color: #42b983;
  outline: #c9d8ea 1px solid;
  padding: 1rem 2rem;

    text-decoration: none;
  &:hover {
    text-decoration: underline;
  }

  &.session {
    min-width: 30rem;
  }
}
</style>
