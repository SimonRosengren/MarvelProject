
Marvel.apiHelper = {
    get: function(url, success, error) {
        let req = new XMLHttpRequest();

        req.addEventListener('load', success.bind(null, req));
        req.addEventListener('error', error != null ? error.bind(null, req) : null);
        
        req.open('GET', url, true);
        req.send();
    },

    post: function(url, data, success, error) {
        let req = new XMLHttpRequest();
        req.addEventListener('load', success.bind(null, req));
        req.addEventListener('error', error.bind(null, req));

        req.setRequestHeader('Content-Type', 'application/json')
        req.open('POST', url, true);
        req.send(JSON.stringify(data));
    }
}