let pollResults;

function createEl(className, tag = 'div') {
    const div = document.createElement(tag);
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
        const el = createEl('poll-row');

        const nameElement = createEl('poll-row__name');
        nameElement.textContent = name;

        el.appendChild(nameElement);

        const resultEl = createEl('poll-row__result');
        const resultBar = createEl('poll-row__result__bar');
        // set all of their sizes to be a ratio of maxVote;
        resultBar.setAttribute("style", "width: " + (result / maxVote * 100) + "%;");

        const voteCount = createEl('poll-row__votes', 'span');
        voteCount.textContent = result + " votes";

        const percent = createEl('poll-row__percent', 'span');
        percent.textContent = (result / totalVotes * 100).toFixed(2) + "%";

        resultEl.appendChild(resultBar);
        resultEl.appendChild(voteCount);

        // only the first item falls inside the result bar
        if(result < maxVote) {
            percent.setAttribute("style", "color: var(--body-color)");
        }

        resultEl.appendChild(percent);

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