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

const getLinkedInJobId = (url) => {
    const urlSuffix = url.split("?")[0].replace(/https?:\/\/www.linkedin.com\/jobs\/view\//, "");
    return urlSuffix.replace('/', '');
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
        let jobInfo = data.jobs;
        if(jobInfo === undefined || jobInfo === null) jobInfo = {};
        if(!jobInfo[platform]) jobInfo[platform] = {};
        const jobId = getLinkedInJobId(url);
        updateJobStatus(jobInfo, platform, jobId, jobstatus.Clicked);
    });
}

const updateJobStatus = (jobInfo, platform, jobId, status) => {
    const jobRecord = {status: status, lastUpdated: Date.now()};
    jobInfo[platform][jobId] = jobRecord;
    chrome.storage.sync.set({jobs: jobInfo}, () => console.log("Job list updated."))
}