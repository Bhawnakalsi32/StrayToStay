const initialState={
    load:false,
    msg:""
}

export default function LoaderReducer(state=initialState, action){
    
    switch(action.type){
        case "SHOW":
            return {load:true, msg:action.msg}
        case "HIDE":
            return {load:false}
        default:
            return state
    }
}