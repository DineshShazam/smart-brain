export const initState = {
    imageURL : '',
    imageBox : {},
    Celeb : '',
    DemoGraph : {},
    userDetails : {},
    entriesValue: '',
    entriesValueBol : false,
}


const reducer = (state = initState,action) => {

    switch (action.type) {
        case 'IMAGE_URL':
            return {
                ...state,
                imageURL : action.payload
            }
        
        case 'BOUNDING_BOX' : 
            return {
                ...state,
                imageBox : action.payload
            }
        
        case 'CELEBIRITY' :
            return {
                ...state,
                Celeb : action.payload
            }
        
        case 'DEMOGRAPHICS' :
            return {
                ...state,
                DemoGraph : action.payload
            }

        case 'EMPTY_IMAGE_URL' :
            return {
                ...state,
                imageURL : '',
            }

        case 'EMPTY_VALUE' :
            return {
                ...state,
                 Celeb : '',
                 DemoGraph: {},
                 imageBox : {},
            }
        
        case 'USERDETAILS' : 
            return {
                ...state,
                userDetails: action.payload
            }

        case 'ENTRIESDETAILS' : 
            return {
                ...state,
                entriesValue : action.payload,
                entriesValueBol : true
            }
    
        default:
            return state;
    }
    
}

export default reducer;