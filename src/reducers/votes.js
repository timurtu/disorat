/**
 * Created by timur on 1/16/17.
 */

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

    case 'ADD_REASON1':
      return state.map(vote => {

        if (vote.id === action.id) {

          const reason = vote.reasons1.find(r => r.reason === action.reason.reason)

          if (reason) {

            const index = vote.reasons1.indexOf(reason)

            return {
              ...vote,
              reasons1: [
                ...vote.reasons1.slice(0, index),
                {
                  reason: reason.reason,
                  count: reason.count + 1
                },
                ...vote.reasons1.slice(index + 1, vote.reasons1.length)
              ]
            }
          } else {
            return {
              ...vote,
              reasons1: [
                ...vote.reasons1,
                {
                  reason: action.reason.reason,
                  count: 1
                }
              ]
            }
          }
        }
        return vote
      })

    default:
      return state
  }
}

export default votes
