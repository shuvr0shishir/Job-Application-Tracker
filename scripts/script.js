// interview + reject array
let interviewList = [];
let rejectedList = [];


// Count elements
let allCount = getElement('#all-count');
let interviewCount = getElement('#interview-count');
let rejectedCount = getElement('#rejected-count');

// all applicants container
const allApplications = getElement('#all-applications');

// main container
const mainContainer = getElement('main');



function updateDash() {
    allCount.innerText = allApplications.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
};
updateDash();

// toggle function
function tabSwitch(id) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.add("bg-white", "text-[#64748B]");  //add default to all
        tab.classList.remove("bg-[#3B82F6]", "text-white");  //remove accent from all
    });

    getElement(id).classList.remove("bg-white", "text-[#64748B]"); //remove default from selected 
    getElement(id).classList.add("bg-[#3B82F6]", "text-white"); //add accent to selected
};



