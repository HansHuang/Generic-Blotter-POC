import fetch from 'node-fetch';

function approve() {
    return fetch('http://localhost:12345').catch(err => ({ data: 'approve request sent' }))
}

export const menus = [{
    title: "Approve",
    run: approve
}];
