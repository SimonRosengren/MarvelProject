
var Marvel = {
    privateKey: "c49d621e8cb90e99dcc76543a1c6682863ca9ece",
    publicKey: "4e4c4629dc02b846216360561c9aa443",

    init: function() {
        this.heroes.get()
    }
};

Marvel.init = Marvel.init.bind(Marvel);
document.addEventListener("DOMContentLoaded", Marvel.init);