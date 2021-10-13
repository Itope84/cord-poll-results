let pollResults;

function createDiv(className) {
    const div = document.createElement('div');
    div.classList.add(className);
    return div;
}

function renderPageContents() {
    // fetch template and render for each result
    let totalVotes = 0;
    let maxVote = 0;
    // sum total votes initiallu
    // I should be able to reduce this to 2 loops
    Object.values(pollResults).forEach((result) => {
        totalVotes += result;
        if(result > maxVote) maxVote = result;
    })

    const entries = Object.entries(pollResults).sort(([prevName, prevResult], [name, result]) => result > prevResult ? 1 : -1);

    entries.forEach(([name, result]) => {
        const el = createDiv('poll-row');

        console.log(totalVotes, result);

        const nameElement = createDiv('poll-row__name');
        nameElement.textContent = name;

        el.appendChild(nameElement);

        const resultEl = createDiv('poll-row__result');
        const resultBar = createDiv('poll-row__result__bar');
        // set all of their sizes to be a ratio of maxVote;
        resultBar.setAttribute("style", "width: " + (result / maxVote * 100) + "%;");

        resultEl.appendChild(resultBar);

        el.appendChild(resultEl);

        document.querySelector('#results').appendChild(el);
    })
}

function readJson() {
    window.fetch('./example-data.json').then(response => {
        if(!response.ok) {
            console.error("Failed to read file");
        }

        return response.json();
    }).then(json => {
        pollResults = json;
        renderPageContents();
    })
    // .catch(() => {
    //     console.error("Error occured while reading JSON data");
    // })
}

document.addEventListener("DOMContentLoaded", function(){
    // DOMContentLoaded has wide enough browser support for the purpose of this test
    readJson();
});