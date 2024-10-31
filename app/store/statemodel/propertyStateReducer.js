

export const propertyInitialState = [
    {
        Title : "sample",

    },
    {
        Title : "sample2",
        
    }
];

export const propertyStateReducer = (state, action) => {
    console.log(action , "actionaction");
    switch (action.type) {
        case "REMOVE_PROPERTY":
            return state.filter((item , index) => index !== action.payload.itemIndex);
        case "ADD_PROPERTY":
            return [...state , {Title : action.payload.value} ];
        default:
        return state;
    }
};
