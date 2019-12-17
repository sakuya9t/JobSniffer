const initTriggeredFunc = () => {

    const currLocation = window.location.toString();
    const elements = getJobCardElements(currLocation);
    console.log(elements);
    
    window.addEventListener("load", () => {
        onPageChanges();
    });
}

initTriggeredFunc();

const onPageChanges = () => {
    // Fire the buttonBinding event each time when we switch to a job detail page.
    setTimeout(bindEventToJobApplyButton, 200);
}

const bindEventToJobApplyButton = () => {
    const currLocation = window.location.toString();
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