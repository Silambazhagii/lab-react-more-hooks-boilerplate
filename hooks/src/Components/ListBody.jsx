import React, { useReducer } from 'react';

const initialState = {
  items: [],
  currentInput: '',
  showBox: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [
          ...state.items,
          { id: state.items.length, val: action.payload, hideContent: false },
        ],
        currentInput: '',
        showBox: true,
      };
    case 'TOGGLE_CONTENT':
      return {
        ...state,
        items: state.items.map((item, i) =>
          i === action.payload
            ? { ...item, hideContent: !item.hideContent }
            : item
        ),
      };
    case 'UPDATE_INPUT':
      return { ...state, currentInput: action.payload };
    default:
      return state;
  }
};

export default function ListBody() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleContent = (index) => {
    dispatch({ type: 'TOGGLE_CONTENT', payload: index });
  };

  const storeInput = (e) => {
    if (e.code === 'Enter') {
      const newValue = e.target.value;
      if (newValue) {
        dispatch({ type: 'ADD_ITEM', payload: newValue });
      }
    } else {
      dispatch({ type: 'UPDATE_INPUT', payload: e.target.value });
    }
  };

  return (
    <div>
      <input
        type="text"
        value={state.currentInput}
        onChange={(e) => storeInput(e)}
        onKeyDown={(e) => storeInput(e)}
      />
      {state.showBox ? (
        state.items.map((item, index) => (
          <div key={index} className="box">
            {item.hideContent ? (
              <h2 className="text">The content is hidden</h2>
            ) : (
              <h2 className="text">{item.val}</h2>
            )}
            <button
              className="toggle"
              onClick={() => toggleContent(index)}
            >
              Toggle
            </button>
          </div>
        ))
      ) : (
        ''
      )}
    </div>
  );
}

