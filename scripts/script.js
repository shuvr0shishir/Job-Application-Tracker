// Useful Functions
function getElement(parameter) {
    const input = document.querySelector(parameter);
    return input;
};


// interview + reject array
let interviewList = [];
let rejectedList = [];


// current tab
let currentTab = '#all-tab';

// Count elements
let allCount = getElement('#all-count');
let interviewCount = getElement('#interview-count');
let rejectedCount = getElement('#rejected-count');


// main container
const mainContainer = getElement('main');

// nothing container
const nothingContainer = getElement('#nothing-container');

// interview container
const interviewContainer = getElement('#interview-container');

// reject container
const rejectContainer = getElement('#reject-container');


// all applicants container
const allApplications = getElement('#all-applications');


// tabJobsCount
const tabJobsEle = getElement('#tabJobsCount');
let tabJobsCount = allApplications.children.length;
tabJobsEle.innerText = tabJobsCount;



// update main dashboard
function updateDash() {
    allCount.innerText = allApplications.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
};
updateDash();

// tab toggle function
function tabSwitch(id) {
    currentTab = id;

    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.add("bg-white", "text-[#64748B]");  //add default to all
        tab.classList.remove("bg-[#3B82F6]", "text-white");  //remove accent from all
    });

    getElement(id).classList.remove("bg-white", "text-[#64748B]"); //remove default from selected 
    getElement(id).classList.add("bg-[#3B82F6]", "text-white"); //add accent to selected

    if (currentTab == '#all-tab') {
        tabJobsCount = allApplications.children.length;
        tabJobsEle.innerText = tabJobsCount;
        updateDash();

        if (tabJobsCount === 0) {
            allApplications.classList.add('hidden');
            interviewContainer.classList.add('hidden');
            rejectContainer.classList.add('hidden');
            nothingContainer.classList.remove('hidden');
        } else {
            nothingContainer.classList.add('hidden');
            interviewContainer.classList.add('hidden');
            rejectContainer.classList.add('hidden');
            allApplications.classList.remove('hidden');
        }

    }
    else if (currentTab == '#interview-tab') {
        tabJobsCount = interviewContainer.children.length;
        tabJobsEle.innerText = tabJobsCount;
        updateDash();

        if (tabJobsCount === 0) {
            allApplications.classList.add('hidden');
            interviewContainer.classList.add('hidden');
            rejectContainer.classList.add('hidden');
            nothingContainer.classList.remove('hidden');
        } else {
            allApplications.classList.add('hidden');
            nothingContainer.classList.add('hidden');
            rejectContainer.classList.add('hidden');
            interviewContainer.classList.remove('hidden');
        }

    }
    else if (currentTab == '#rejected-tab') {
        tabJobsCount = rejectContainer.children.length;
        tabJobsEle.innerText = tabJobsCount;
        updateDash();


        if (tabJobsCount === 0) {
            allApplications.classList.add('hidden');
            interviewContainer.classList.add('hidden');
            rejectContainer.classList.add('hidden');
            nothingContainer.classList.remove('hidden');
        } else {
            allApplications.classList.add('hidden');
            nothingContainer.classList.add('hidden');
            interviewContainer.classList.add('hidden');
            rejectContainer.classList.remove('hidden');
        }
    }
};


// Event listeners 
mainContainer.addEventListener("click", (event) => {

    // interview button fire
    if (event.target.classList.contains('interview-btn')) {
        const parentNode = event.target.parentNode.parentNode;
        const companyName = parentNode.querySelector('.companyName').innerText;
        const position = parentNode.querySelector('.position').innerText;
        const lts = parentNode.querySelector('.lts').innerText;
        const description = parentNode.querySelector('.description').innerText;

        // making card object
        const cardInfo = {
            companyName,
            position,
            lts,
            status: "INTERVIEW",
            description,
        }

        //badge modification
        const allCards = document.querySelectorAll('.applicant-card');
        allCards.forEach(card => {
            const allNames = card.querySelector('.companyName').innerText;

            if (allNames == companyName) {
                const status = card.querySelector('.badge');
                status.innerText = "INTERVIEW";

                status.classList.remove('bg-[#EEF4FF]', 'bg-[#f87272]', 'text-[#002C5C]');
                status.classList.add('bg-[#36d399]', 'text-white');
            }
        });

        // reject list theke remove
        rejectedList = rejectedList.filter(item => item.companyName != companyName);

        // already ache kina test 
        const isExist = interviewList.find(item => item.companyName == companyName);

        // jodi exist na kore tahole push
        if (!isExist) {
            interviewList.push(cardInfo);
        }

        // tab count update + if o then nothing page
        if (currentTab == '#rejected-tab') {
            renderRejected();
            tabJobsCount = rejectContainer.children.length;
            tabJobsEle.innerText = tabJobsCount;
            updateDash();

            if (tabJobsCount === 0) {
                allApplications.classList.add('hidden');
                interviewContainer.classList.add('hidden');
                rejectContainer.classList.add('hidden');
                nothingContainer.classList.remove('hidden');
            } else {
                allApplications.classList.add('hidden');
                nothingContainer.classList.add('hidden');
                interviewContainer.classList.add('hidden');
                rejectContainer.classList.remove('hidden');
            }
        }

        // update dashboard + interview tab a card generate
        updateDash();
        renderInterview();
    }

    // rejected button fire
    else if (event.target.classList.contains('rejected-btn')) {
        const parentNode = event.target.parentNode.parentNode;
        const companyName = parentNode.querySelector('.companyName').innerText;
        const position = parentNode.querySelector('.position').innerText;
        const lts = parentNode.querySelector('.lts').innerText;
        const description = parentNode.querySelector('.description').innerText;

        // making card object
        const cardInfo = {
            companyName,
            position,
            lts,
            status: "REJECTED",
            description,
        }

        //badge modification
        const allCards = document.querySelectorAll('.applicant-card');
        allCards.forEach(card => {
            const allNames = card.querySelector('.companyName').innerText;

            if (allNames == companyName) {
                const status = card.querySelector('.badge');
                status.innerText = "REJECTED";

                status.classList.remove('bg-[#EEF4FF]', 'bg-[#36d399]', 'text-[#002C5C]');
                status.classList.add('bg-[#f87272]', 'text-white');
            }
        });

        // interview list theke remove
        interviewList = interviewList.filter(item => item.companyName != companyName);

        // already ache kina test 
        const isExist = rejectedList.find(item => item.companyName == companyName);

        // jodi exist na kore tahole push
        if (!isExist) {
            rejectedList.push(cardInfo);
        }

        // tab count update + if o then nothing page
        if (currentTab == '#interview-tab') {
            renderInterview();
            tabJobsCount = interviewContainer.children.length;
            tabJobsEle.innerText = tabJobsCount;
            updateDash();

            if (tabJobsCount === 0) {
                allApplications.classList.add('hidden');
                interviewContainer.classList.add('hidden');
                rejectContainer.classList.add('hidden');
                nothingContainer.classList.remove('hidden');
            } else {
                allApplications.classList.add('hidden');
                nothingContainer.classList.add('hidden');
                rejectContainer.classList.add('hidden');
                interviewContainer.classList.remove('hidden');
            }
        }

        // update dashboard + rejected tab a card generate
        updateDash();
        renderRejected();
    }

    // delete button fire
    else if (event.target.closest('.dlt-btn')) {
        const parentNode = event.target.closest('.applicant-card');
        const companyName = parentNode.querySelector('.companyName').innerText;

        // dlt and update array list of interview and rejected
        interviewList = interviewList.filter(item => item.companyName != companyName);
        rejectedList = rejectedList.filter(item => item.companyName != companyName);

        // all company name check if match then remove
        const allCards = document.querySelectorAll('.companyName');
        allCards.forEach(name => {
            if (name.innerText == companyName) {
                name.closest('.applicant-card').remove();
            }
        });

        // update dash and array list
        updateDash();
        renderInterview();
        renderRejected();

        // tab job count update and nothing page if 0 job
        if (currentTab == '#all-tab') {
            tabJobsCount = allApplications.children.length;
            tabJobsEle.innerText = tabJobsCount;

            if (tabJobsCount === 0) {
                allApplications.classList.add('hidden');
                interviewContainer.classList.add('hidden');
                rejectContainer.classList.add('hidden');
                nothingContainer.classList.remove('hidden');
            }
        }
        else if (currentTab == '#interview-tab') {
            tabJobsCount = interviewList.length;
            tabJobsEle.innerText = tabJobsCount;

            if (tabJobsCount === 0) {
                allApplications.classList.add('hidden');
                interviewContainer.classList.add('hidden');
                rejectContainer.classList.add('hidden');
                nothingContainer.classList.remove('hidden');
            }
        }
        else if (currentTab == '#rejected-tab') {
            tabJobsCount = rejectedList.length;
            tabJobsEle.innerText = tabJobsCount;

            if (tabJobsCount === 0) {
                allApplications.classList.add('hidden');
                interviewContainer.classList.add('hidden');
                rejectContainer.classList.add('hidden');
                nothingContainer.classList.remove('hidden');
            }
        }
    }
    
});

// interview container a card generate
function renderInterview() {
    // old interview container clear 
    interviewContainer.innerHTML = '';

    interviewList.forEach(item => {
        let div = document.createElement('div');
        div.innerHTML = `
        <!-- interview card -->
        <div class="applicant-card bg-white p-6 rounded-lg">
                <div class="flex justify-between items-center">

                    <!-- company name + position -->
                    <div class="space-y-1">
                        <h2 class="companyName text-[#002C5C] text-[18px] font-semibold">${item.companyName}</h2>
                        <h3 class="position text-[#64748B] ">${item.position}</h3>
                    </div>

                    <!-- delete btn -->
                    <button class="dlt-btn btn btn-circle w-8 h-8">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>

                <!-- location + type + salary -->
                <div class="lts text-[#64748B] py-5">
                    <p>${item.lts}</p>
                </div>

                <!-- badge -->
                <div class="badge h-9 text-[14px] font-medium bg-[#36d399] text-[#ffffff]">${item.status}
                </div>

                <!-- description -->
                <div class="pt-2">
                    <p class="description text-sm text-[#323B49]">${item.description}</p>
                </div>

                <!-- 2 buttons: Interview, Rejected -->
                <div class="flex gap-2 pt-5">
                    <button class="interview-btn btn btn-outline btn-success h-9">INTERVIEW</button>
                    <button class="rejected-btn btn btn-outline btn-error h-9">REJECTED</button>
                </div>
            </div>
        `;
        
        interviewContainer.appendChild(div);
    })
};

// reject container a card generate
function renderRejected() {
    // old reject container clear
    rejectContainer.innerHTML = '';

    rejectedList.forEach(item => {
        let div = document.createElement('div');
        div.innerHTML = `
        <!-- interview card -->
        <div class="applicant-card bg-white p-6 rounded-lg">
                <div class="flex justify-between items-center">

                    <!-- company name + position -->
                    <div class="space-y-1">
                        <h2 class="companyName text-[#002C5C] text-[18px] font-semibold">${item.companyName}</h2>
                        <h3 class="position text-[#64748B] ">${item.position}</h3>
                    </div>

                    <!-- delete btn -->
                    <button class="dlt-btn btn btn-circle w-8 h-8">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>

                <!-- location + type + salary -->
                <div class="lts text-[#64748B] py-5">
                    <p>${item.lts}</p>
                </div>

                <!-- badge -->
                <div class="badge h-9 text-[14px] font-medium bg-[#f87272] text-[#ffffff]">${item.status}
                </div>

                <!-- description -->
                <div class="pt-2">
                    <p class="description text-sm text-[#323B49]">${item.description}</p>
                </div>

                <!-- 2 buttons: Interview, Rejected -->
                <div class="flex gap-2 pt-5">
                    <button class="interview-btn btn btn-outline btn-success h-9">INTERVIEW</button>
                    <button class="rejected-btn btn btn-outline btn-error h-9">REJECTED</button>
                </div>
            </div>
        `;

        rejectContainer.appendChild(div);
    })
};