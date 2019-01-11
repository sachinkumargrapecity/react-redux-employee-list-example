
function reducer (state = {},action) {
    switch(action.type){
        case 'AddEmployee':{
            return Object.assign(state,{
                [action.id] : { // computed key
                    ...action.info,
                    id:action.id
                }
            });
        }
        case 'UpdateEmployee':{
            return Object.assign(state,{
                [action.id] : { // computed key
                    ...action.info,
                    id:action.id
                }
            });
        }
        default:{
            return state;
        }
    }
}

export default reducer; // there can be only one default export