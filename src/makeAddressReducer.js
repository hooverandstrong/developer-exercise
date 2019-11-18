import { LOAD, CHANGE, ADD, SAVE, DISABLE, RESTORE } from './actions';


export default function makeAddressReducer(service) {
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
        const id = action.payload;
        const promises = state.filter(item => !item.ActiveTo).map(item => {
          console.log(item);
          return service.Save(id, item);
        });
        Promise.all(promises).then(() => console.log('saved'));
        return state;

      case DISABLE:
      case RESTORE:
      default:
        return state;
    } 
  }
}
