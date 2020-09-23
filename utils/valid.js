var valid = {
    checkParams: function(refobj, evalueobj){
        if(Object.keys(refobj).sort().toString() == Object.keys(evalueobj).sort().toString()){
            return true;
          }
            return false;
    },
    checkPassword: function(password){
        var passRegex = /^(?=[A-Z]{1,1})(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))\S{6,}$/g
        if (password.match(passRegex) == null){
            return false;
        }
        return true;
    },
    checkEmail: function(email){
        var emailRegex  = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g
        if (email.match(emailRegex) == null){
            return false;
        }
        return true;
    }
};

module.exports = valid;
