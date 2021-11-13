<template lang="pug">
div
  h1 Сессия: {{session?.sessionId.slice(-10,)}}
  h2 {{moment.unix(session?.timestamp).format('YYYY-MM-DD@HH:mm')}}

  div(v-for="val in state.data" :key="val.id")
    div {{val.productName}}
    div {{val.productCount}}
    div {{dateTime(val)}}
</template>

<script setup>

  import moment from 'moment'

  import {onMounted, reactive, computed} from 'vue'
  import {useStore} from 'vuex'

  const props = defineProps({
    session: String,
    sessionId: String,
    id: String,
  })

  function dateTime(a) {
    return moment.unix(a.timestamp).format('YYYY-MM-DD@HH:mm')
  }

  const store = useStore()
  const session = computed(() => store.getters.getTheSession(props.id))
  onMounted(async () => {
    await store.dispatch('Fetch_Sessions')
    await store.dispatch('Fetch_Events')
  })

  const state = reactive({
    data: computed(() => store.getters.GetEventsBySession(session.value?.sessionId))
  })
</script>
