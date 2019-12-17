// CSS classnames to find according to current path
const platforms = {LinkedIn: 'LinkedIn'};
const jobstatus = {Clicked: 'Clicked', Applied: 'Applied'}

const LinkedInJobCardPathClass = {
    '/jobs/tracker/saved/': 'jobs-saved-job-card',
    '/jobs/': 'job-card',
    '/jobs/search/': 'job-card-search'
};

const isLinkedInJobPage = (url) => {
    const match = url.match(/^https?:\/\/www.linkedin.com\/jobs\/*/);
    return !!match && match.length > 0;
}

const isLinkedInJobDetailPage = (url) => {
    const match = url.match(/^https?:\/\/www.linkedin.com\/jobs\/view\/*/);
    return !!match && match.length > 0;
}

const getJobCardElements = (url) => {
    console.log(url);
    const urlNoParam = url.split("?")[0]; // remove parameters from get method
    if(isLinkedInJobPage(urlNoParam)){
        const suffix = urlNoParam.replace(/https?:\/\/www.linkedin.com/, "");
        return document.getElementsByClassName(LinkedInJobCardPathClass[suffix]);
    }
    return [];
}

const findElementByInnerText = (label, text) => Array.from(document.querySelectorAll(label)).find(e => e.textContent.trim() === text);

const addToJobList = (platform, status, url) => {
    chrome.storage.sync.get('jobs', (data) => {
        let updated = {...data};
        console.log(updated);
        if(!updated[platform]) updated[platform] = [];
        updated[platform].push(url);
        chrome.storage.sync.set({jobs: updated}, () => console.log("Added to job list."))
    });
}