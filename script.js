let elements = [];
let molecules = {};
let currentBeaker = [];

// Load data and set up UI
async function startLab() {
    const elData = await fetch('./data/elements.json');
    elements = await elData.json();
    
    const molData = await fetch('./data/molecules.json');
    molecules = await molData.json();

    const grid = document.getElementById('element-grid');
    const controls = document.getElementById('builder-controls');

    elements.forEach(el => {
        // Create explorer button
        let btn = document.createElement('button');
        btn.className = 'btn-el';
        btn.innerText = el.symbol;
        btn.onclick = () => {
            document.getElementById('element-info').innerHTML = `<strong>${el.name}:</strong> ${el.fact}`;
        };
        grid.appendChild(btn);

        // Create builder button
        let addBtn = document.createElement('button');
        addBtn.className = 'btn-el';
        addBtn.innerText = `+ ${el.symbol}`;
        addBtn.onclick = () => {
            currentBeaker.push(el.symbol);
            document.getElementById('beaker-contents').innerText = currentBeaker.join(' + ');
        };
        controls.appendChild(addBtn);
    });
}

document.getElementById('combine-btn').onclick = () => {
    const key = currentBeaker.sort().join(',');
    const result = document.getElementById('molecule-result');
    
    if (molecules[key]) {
        result.innerHTML = `<h3>You made ${molecules[key].name}! ${molecules[key].emoji}</h3><p>${molecules[key].desc}</p>`;
    } else {
        result.innerText = "No reaction yet! Try H + H + O or Na + Cl.";
    }
};

document.getElementById('clear-btn').onclick = () => {
    currentBeaker = [];
    document.getElementById('beaker-contents').innerText = "";
    document.getElementById('molecule-result').innerText = "";
};

startLab();
