// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log("The color is green.");
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'www.linkedin.com', urlContains: 'job'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(changeInfo.url){
      const {url} = changeInfo;
      const srcTabId = tab.openerTabId;
      if(srcTabId){ // new tab created by an existing tab.
        chrome.tabs.get(srcTabId, (tab) => {
          const parentURL = trimURL(tab.url);
          if(isLinkedInJobDetailPage(parentURL) && !isLinkedInJobPage(url)){
            // We are jumping from LinkedIn job detail page to external applying page.
            console.log(`Parent tab url: ${tab.url}`);
          }
        });
      }
      if(isLinkedInJobPage(url)){
        chrome.tabs.executeScript(tabId, {
          code: "onPageChanges();"
        }, () => console.log("Execute complete"));
      }
    }
  });
});