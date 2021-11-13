const actions = {
  Fetch_Sessions: async ({ commit }) => {
    let req = await fetch('/trunstile-events.json')
    commit('SAVE_SESSIONS', await req.json())
  },
  Fetch_Events: async ({ commit }) => {
    let req = await fetch('/events.json')
    commit('SAVE_EVENTS', await req.json())
  },
}

export default actions
