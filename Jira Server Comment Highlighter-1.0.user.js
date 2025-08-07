// ==UserScript==
// @name         Jira Server Comment Highlighter
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Highlight divs with class 'twixi-wrap verbose actionContainer' that contain certain text
// @author       andr016
// @match        https://*/browse/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Configuration
    const CHECK_TEXT = 'Restricted to'
    const STYLE_BG_GREEN = {backgroundColor: '#dfd'} // Light green
    const STYLE_BG_RED = {backgroundColor: '#fdd'} // Light red

    function CheckText(element) {
        const text = element.textContent || '';
        return text.includes(CHECK_TEXT);
    }

    function highlightCheckTextContainers() {
        document.querySelectorAll('div.issue-data-block.activity-comment.twixi-block').forEach(div => {
            if (!div.dataset.checkTextHighlighted) {
                if(CheckText(div)) Object.assign(div.style, STYLE_BG_GREEN);
                else Object.assign(div.style, STYLE_BG_RED);
                div.dataset.checkTextHighlighted = 'true';
            }
        });
    }

    setTimeout(highlightCheckTextContainers, 1000);

    new MutationObserver(() => {
        setTimeout(highlightCheckTextContainers, 500);
    }).observe(document.body, { childList: true, subtree: true });
})();