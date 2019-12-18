const initTriggeredFunc = () => {
    onPageChanges();
}

const onPageChanges = () => {
    const currLocation = trimURL(window.location.toString());
    setTimeout(markAppliedJobInOverViewPage, 100);
    if(isJobDetailPage(currLocation)){
        bindEventToJobApplyButton();
    }
}

const markAppliedJobInOverViewPage = () => {
    const currLocation = trimURL(window.location.toString());
    if(isLinkedInJobPage(currLocation)){
        const jobCards = getJobCardElements(currLocation);
        if(jobCards){
            console.log(`${jobCards.length} job cards found in the page.`);
        }
    }
}

const bindEventToJobApplyButton = () => {
    const currLocation = trimURL(window.location.toString());
    if(isLinkedInJobDetailPage(currLocation)){
        const btnLinkedInExternalApply = document.querySelector("[data-control-name=shareProfileThenExternalApplyControl]");
        const btnLinkedInInternalApply = document.querySelector("[data-control-name=jobdetails_topcard_inapply]");
        if(!btnLinkedInExternalApply && !btnLinkedInInternalApply){
            setTimeout(bindEventToJobApplyButton, 50);
        }
        console.log(btnLinkedInExternalApply);
        if(btnLinkedInExternalApply) {
            btnLinkedInExternalApply.onclick = () => addToJobList(platforms.LinkedIn, jobstatus.Clicked, currLocation);
        }
    }
}

initTriggeredFunc();