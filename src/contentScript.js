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
    console.log("set");

    setTimeout(() => {
        const btnLinkedInExternalApply = document.querySelector("[data-control-name=shareProfileThenExternalApplyControl]");
        const btnLinkedInInternalApply = document.querySelector("[data-control-name=jobdetails_topcard_inapply]");
        console.log(btnLinkedInExternalApply);
        if(btnLinkedInExternalApply) btnLinkedInExternalApply.onclick = () => console.log("clicking");
    }, 500);
}
