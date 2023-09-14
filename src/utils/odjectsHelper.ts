export const updateObjectInArray =(items,itemId,objPropName,newObjProps)=> {
    items.map(el => el[objPropName] === itemId
        ? {...el, ...newObjProps}
        : el)
}