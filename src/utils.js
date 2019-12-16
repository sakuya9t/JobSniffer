// CSS classnames to find according to current path
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
}