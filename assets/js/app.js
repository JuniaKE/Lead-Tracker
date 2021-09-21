let saveButton = document.getElementById("save-button");
let myLeads = getLeads() || [];
const inputEl = document.getElementById("input-el");
let lead = document.getElementById("lead");
let leadCount = document.getElementById("lead-count");
let errorEl = document.getElementById("error");
let clearLeadsBtn = document.getElementById("clear-leads");
let saveTabBtn = document.getElementById("save-tab");
// const tabs = [
//     { url: "https://linkedin.com/in/juniakeofficial" }
// ];
saveButton.addEventListener("click", () => {
    const lead = inputEl.value;
    if (lead.length === 0) {
        errorEl.textContent = 'You cannot save an empty lead. Try Again!';
    } else {
        errorEl.textContent = "";
        myLeads.push(lead);
    }
    storeLeads();
    renderLeads()
    inputEl.value = "";
});
renderLeads();

function renderLeads() {
    let leads = "";
    const storedLeads = getLeads();
    console.log("Stored Leads: ", storedLeads);
    if (storedLeads) {
        leadCount.textContent = `Total Leads: ${storedLeads.length}`;
        for (let i = 0; i < storedLeads.length; i++) {
            const element = storedLeads[i];
            leads += `<li><a href="${element}" target="_blank">${element}</a></li>`;
        }
        lead.innerHTML = leads;
    }
}

function storeLeads() {
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
}

function getLeads() {
    const leads = localStorage.getItem("myLeads");
    return JSON.parse(leads);
}

clearLeadsBtn.addEventListener('dblclick', () => {
    clearLeads();

})

function clearLeads() {
    localStorage.clear();
    renderLeads();
    reloadPage();
}

function reloadPage() {
    location.reload();
}

saveTabBtn.style = "color: black";
saveTabBtn.addEventListener('click', (event) => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        let url = tabs[0].url;
        myLeads.push(url);
        storeLeads();
        renderLeads();
    });

});