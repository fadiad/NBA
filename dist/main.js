$('#search-btn').on('click', function () {
    let input = $('input').val()
    if (input != '') {
        $.get(`/teams/${input}`, function (teamPlayers) {
            render(teamPlayers)
        })
    }
    else {
        $('#results p').css('display', 'block')
    }
})

$('#results').on('click', '.player', function () {
    let name = $(this).find("h2").text().split(' ')
    let dreamTeamMember = false;

    $.get('/dreamTeam', function (dreamTeam) {
        dreamTeamMember = false;

        for (const player of dreamTeam) {
            if (player.fname == name[0] && player.lname == name[1]) {
                dreamTeamMember = true
                break
            }
        }

        if (!dreamTeamMember) {
            $.post('/addPlayer', {
                firstName: name[0]
                , lastName: name[1]
            }, function (response) { })
        } else {
            $.post('/deletePlayer', {
                firstName: name[0]
                , lastName: name[1]
            }, function (response) { render(response) })
        }
    })
})

$('#DreamTeam-btn').on('click', function () {
    $.get('/dreamTeam', function (dreamTeam) {
        render(dreamTeam)
    })
})


// not in use : 
const updateVisited = function () {
    $.ajax({
        data: { teamName: "wizards", teamId: "1610612764" }, // example 
        url: '/team',
        method: "PUT",
        success: function (response) { }
    })
}
