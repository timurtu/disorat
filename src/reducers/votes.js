/**
 * Created by timur on 1/16/17.
 */

const addReason = (state, action, opt) => state.map(vote => {

  if (vote.id === action.id) {

    const reason = vote[`reasons${opt}`].find(r => r.reason === action.reason.reason)

    if (reason) {

      const index = vote[`reasons${opt}`].indexOf(reason)

      const newVote = {
        ...vote
      }

      newVote[`reasons${opt}`] = [
        ...vote[`reasons${opt}`].slice(0, index),
        {
          reason: reason.reason,
          count: reason.count + 1
        },
        ...vote[`reasons${opt}`].slice(index + 1, vote[`reasons${opt}`].length)
      ]

      return newVote

    } else {

      const newVote = {
        ...vote
      }

      newVote[`reasons${opt}`] = [
        ...vote[`reasons${opt}`],
        {
          reason: action.reason.reason,
          count: 1
        }
      ]

      return newVote
    }
  }

  return vote
})

const votes = (state = [], action) => {

  switch (action.type) {

    case 'CREATE_VOTE':
      return [
        ...state,
        {
          id: action.id,
          title: action.title,
          option1: action.option1,
          option2: action.option2,
          option1votes: 1,
          option2votes: 1,
          reasons1: [],
          reasons2: [],
        }
      ]

    case 'VOTE1':
      return state.map(vote => vote.id === action.id ? {
          ...vote,
          option1votes: vote.option1votes + 1
        } : vote)

    case 'VOTE2':
      return state.map(vote => vote.id === action.id ? {
          ...vote,
          option2votes: vote.option2votes + 1
        } : vote)

    case 'ADD_REASON1':
      return addReason(state, action, 1)

    case 'ADD_REASON2':
      return addReason(state, action, 2)

    default:
      return state
  }
}

export default votes
