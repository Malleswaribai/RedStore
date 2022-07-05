const alphanumeric = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const generateHash = ()=>{
    var code = "";
    for(var i = 0; i < 20; i++){
        code += alphanumeric.charAt(Math.floor(Math.random()*63)%62);
    }
    return code;
}
module.exports=generateHash;
