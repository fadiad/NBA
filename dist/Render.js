
function render(playersArr) {
    $('#results').empty()
    const source = $('#players-template').html()
    const template = Handlebars.compile(source)
    let newHtml = template({ players: playersArr })
    $('#results').append(newHtml)
}