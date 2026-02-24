// Useful Functions
function getElement(parameter) {
    const input = document.querySelector(parameter);
    return input;
};

function getText(parameter) {
    const input = document.querySelector(parameter);
    return input.innerText;
};

function updateDash() {
    // Count elements
    let allCount = getElement('#all-count');
    let interviewCount = getElement('#interview-count');
    let rejectedCount = getElement('#rejected-count');

    //update
    allCount.innerText = applicants.length;
    interviewCount.innerText = interview.length;
    rejectedCount.innerText = rejected.length;
};


// toggle function
function tabSwitch(parameter) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove("bg-[#3B82F6]","text-white");  //remove accent from all
        tab.classList.add("bg-white","text-[#64748B]");  //add default to all
    });

    getElement(parameter).classList.remove("bg-white","text-[#64748B]"); //remove default from selected 
    getElement(parameter).classList.add("bg-[#3B82F6]","text-white"); //add accent to selected
};


// dynamic card generator
function genCards(array) {
    let applicationContainer = getElement('#application-container');
    applicationContainer.innerHTML = ""; //clear container

    // card maker
    array.forEach(i => {
        const div = document.createElement("div");
        div.innerHTML = `
        <!-- applicant card  -->
            <div class="bg-white p-6 rounded-lg">
                <div class="flex justify-between items-center">

                    <!-- company name + position -->
                    <div class="space-y-1">
                        <h2 class="text-[#002C5C] text-[18px] font-semibold">${i.name}</h2>
                        <h3 class="text-[#64748B] ">${i.position}</h3>
                    </div>

                    <!-- delete btn -->
                    <button class="btn btn-circle w-8 h-8">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>

                <!-- location + type + salary -->
                <div class="text-[#64748B] py-5">
                    <p>${i.location}
                        •
                        ${i.type}
                        •
                        ${i.salary}</p>
                </div>

                <!-- badge -->
                <div class="h-9 badge badge-soft badge-primary text-[#002C5C] text-[14px] font-medium ">${i.status}
                </div>

                <!-- description -->
                <div class="pt-2">
                    <p class="text-sm text-[#323B49]">${i.description}</p>
                </div>

                <!-- 2 buttons: Interview, Rejected -->
                <div class="flex gap-2 pt-5">
                    <button class="btn btn-outline btn-success h-9">INTERVIEW</button>
                    <button class="btn btn-outline btn-error h-9">REJECTED</button>
                </div>
            </div>
        `;
        applicationContainer.appendChild(div);
    });

    // update all counts
    updateDash();
};

