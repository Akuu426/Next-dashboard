// // useActionState.js
// import { useState } from 'react';

// const useActionState = (action, initialState) => {
//   const [state, setState] = useState(initialState);

//   const executeAction = async (payload) => {
//     try {
//       const result = await action(payload);
//       setState(result);
//     } catch (error) {
//       console.error('Action failed', error);
//     }
//   };

//   return [state, executeAction];
// };

// export default useActionState;


import { useState } from 'react';

// Define types for the action function and state
type ActionFunction<TPayload, TResult> = (payload: TPayload) => Promise<TResult>;

const useActionState = <TPayload, TResult>(action: ActionFunction<TPayload, TResult>, initialState: TResult) => {
  const [state, setState] = useState<TResult>(initialState);

  const executeAction = async (payload: TPayload) => {
    try {
      const result = await action(payload);
      setState(result);
    } catch (error) {
      console.error('Action failed', error);
    }
  };

  return [state, executeAction] as const;
};

export default useActionState;
