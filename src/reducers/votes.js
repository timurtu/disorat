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
          option2votes: 1
        }
      ]

    default:
      return state
  }
}

export default votes
