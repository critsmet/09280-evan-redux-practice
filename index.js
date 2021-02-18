let messages = document.getElementById('messages')
let messageForm = document.getElementById('add-message-form')

//a reducer is like a set instructions for how to change state

//reducers always take in the current version of state (we should always set a default state value), and an action (which is just an object with a key of "TYPE")
//the first argument has uses the equal sign to provide a default value if the argument is undefined or null
function appReducer(state = {messages: [], anotherKey: anotherValue}, action){
  switch(action.type){
    case "ADD_MESSAGE":
      //the return value from the switch statement will become the new state
      //state does not automatically merge like in React's setState so we must spread ...state to keep all other keys/values
      return {...state, messages: [...state.messages, action.payload]}
    default:
      return state
  }
}

function createStore(reducer){
  //we're using a closure to protect our state
  let state = reducer(undefined, {})
  //we're returning an object that gives us two functions: One to view state (the getState function) and one to change state (dispatch)
  //these are the only two ways to view the state and to change the state
  return {
    dispatch: function(action){ state = reducer(state, action)},
    getState: function(){ return {...state} }
  }
}

const store = createStore(appReducer)

function render(){
  //.map takes in a callback function and composes a new array of the return values after passing in each element from the original array into that callback function
  messages.innerHTML = store.getState().messages.map(message => `<li>${message}</li>`).join("")
}

messageForm.addEventListener('submit', function(event){
  event.preventDefault()
  let message = event.target.message.value
  store.dispatch({type: "ADD_MESSAGE", payload: message})
  event.target.reset()
  render()
})
