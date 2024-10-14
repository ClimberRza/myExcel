import { createStore } from './createStore'

const initialState = {
  count: 0
}

const reducer = (state, action) => {
  if (action.type === 'ADD') {
    return {...state, count: state.count + 1}
  }
  return {...state}
}

describe('CreateStore:', () => {
  let store
  let handler

  beforeEach(() => {
    store = createStore(reducer, initialState)
    // флаг для этой ф-ци (toBeCalled) даётся с помощью api Jest-а
    handler = jest.fn(() => {})
  })

  test('should return store object', () => {
    expect(store).toBeDefined()
    expect(store.dispatch).toBeDefined()
    expect(store.subscribe).toBeDefined()
    expect(store.getState).toBeDefined()
  })

  test('should return object as state', () => {
    expect(store).toBeInstanceOf(Object)
  })

  test('should return default state', () => {
    expect(store.getState()).toStrictEqual(initialState)
  })

  test('should change state if action exists', () => {
    store.dispatch({type: 'ADD'})
    expect(store.getState().count).toBe(1)
  })

  test('should NOT change state if action does\'nt exists', () => {
    store.dispatch({type: 'NON_EXIST_ACTION'})
    expect(store.getState().count).toBe(0)
  })

  test('should call subscribed function', () => {
    store.subscribe(handler)
    store.dispatch({type: 'ADD'})
    expect(handler).toHaveBeenCalled()
    expect(handler).toHaveBeenCalledWith(store.getState())
  })

  test('should NOT call sub if unsubscribe', () => {
    const sub = store.subscribe(handler)
    sub.unsubscribe()
    store.dispatch({type: 'ADD'})
    expect(handler).not.toHaveBeenCalled()
  })

  test('should dispatch in async way', () => {
    setTimeout(() => {
      store.dispatch({type: 'ADD'})
    }, 500)
    setTimeout(() => {
      expect(store.getState().count).toBe(1)
    }, 1000)
  })
})
