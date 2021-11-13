const mutations = {

  SAVE_EVENTS(state, payload) {
    state.events = payload
  },

  SAVE_SESSIONS(state, payload) {
    let lst = {}
    Object.values(payload).forEach(el => {
      lst[el.sessionId] = el
    })
    state.sessions = lst
  },

}

export default mutations
