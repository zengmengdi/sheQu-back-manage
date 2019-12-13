function typeFilter(obj) {
    var str=String(obj);
    if(str.includes('[')){
        var arr=JSON.parse(str);
        str=arr.join()
    }
    return str
}
export default typeFilter