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
    setTimeout(bindEventToJobApplyButton, 500);
}

const bindEventToJobApplyButton = () => {
    const currLocation = window.location.toString();
    const btnLinkedInExternalApply = document.querySelector("[data-control-name=shareProfileThenExternalApplyControl]");
    const btnLinkedInInternalApply = document.querySelector("[data-control-name=jobdetails_topcard_inapply]");
    console.log(btnLinkedInExternalApply);
    if(btnLinkedInExternalApply) btnLinkedInExternalApply.onclick = () => console.log("clicking");
}
