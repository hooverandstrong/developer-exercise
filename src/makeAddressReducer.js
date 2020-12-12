import { LOAD, CHANGE, ADD, SAVE, DISABLE, RESTORE } from './actions';


export default function makeAddressReducer(service) {
  let idx;
  return (state, action) => {
    switch (action.type) {
      case LOAD: 
      case CHANGE:
        return action.payload;

      case ADD: 
        const n = state.filter(x => x.Id === undefined).length;
        return [
          ...state,
          service.Create(`new-${n}`)
        ];
      case SAVE:
        const promises = state.filter(item => !item.ActiveTo).map(item => {
          console.log(item);
          return service.Save(action.payload, item);
        });
        Promise.all(promises).then(() => console.log('saved'));
        return state;

      case DISABLE:
        idx = state.findIndex(item => item.Id === action.payload);
        const disabling = state[idx];
        const today = new Date();
        disabling.ActiveTo = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
        service.Save(disabling.CustomerId, disabling);
        return [
          ...state.slice(0, idx),
          disabling,
          ...state.slice(idx + 1)
        ];

      case RESTORE:
        idx = state.findIndex(item => item.Id === action.payload);
        const enabling = state[idx];
        enabling.ActiveTo = undefined;
        service.Save(enabling.CustomerId, enabling);
        return [
          ...state.slice(0, idx),
          enabling,
          ...state.slice(idx + 1)
        ];

      default:
        return state;
    } 
  }
}
