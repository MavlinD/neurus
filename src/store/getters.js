const getters = {
  GetSessions: state => {
    return state.sessions
  },
  GetEventsBySession: state => sessionId => {
    return state.events.filter(el => el.sessionId == sessionId)
  },
  getTheSession: state => id => {
    return Object.values(state.sessions).find(el => el.id == id)
  },
}

export default getters
