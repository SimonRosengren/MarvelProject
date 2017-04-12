
Marvel.database = {
    addWinnerToDatabase: function(winner) {
        $.ajax({
            type: 'POST',
            url: '/vote',
            data: { winner: winner }
        })
    }   
}