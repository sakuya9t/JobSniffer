const initTriggeredFunc = () => {
    
    $(document).ready = () => {
        console.log("set");
        const btnLinkedInExternalApply = document.querySelector("[data-control-name=shareProfileThenExternalApplyControl]");
        const btnLinkedInInternalApply = document.querySelector("[data-control-name=jobdetails_topcard_inapply]");
        if(btnLinkedInExternalApply) btnLinkedInExternalApply.onclick = () => console.log("clicking");
    }


    const currLocation = window.location.toString();
    const elements = getJobCardElements(currLocation);
    console.log(elements);
}

initTriggeredFunc();
