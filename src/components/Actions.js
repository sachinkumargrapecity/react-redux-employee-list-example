import store from '../store/Store';

let id = 0;
const idGenerator = () => {
    return ++id;
}

const AddEmployee = (action) => {
    store.dispatch (Object.assign({ info: action }, { id: idGenerator() }, { type: 'AddEmployee' }));
}

const UpdateEmployee = (action)=>{
    store.dispatch (Object.assign({info:action.info},{id: action.id},{type : 'UpdateEmployee'}))
}
export { AddEmployee,UpdateEmployee };