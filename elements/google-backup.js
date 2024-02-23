(function (){

    const client_id = '1058975365257-ina8f37k7o2l4k5kprp7dn6hau27t3l6.apps.googleusercontent.com';
    const client_secret = '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';
    const redirect_uri = 'http://localhost:8080';
    const scope = 'https://www.googleapis.com/auth/drive.file';
    const params = `client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=token&scope=${scope}`;
    const url = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;

    let isLoggedIn = false;

    function upload2(oauthToken) {
        const metadata = { name: 'test.json', mimeType: 'application/json' };
        const form = new FormData();
        form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
        form.append('file', JSON.stringify({ hello: 'world 2' }));

        fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
            method: 'PUT',
            headers: new Headers({ Authorization: 'Bearer ' + oauthToken }),
            body: form
        })
            .then(result => result.json())
            .then(value => {
                console.log('Uploaded. Result:\n' + JSON.stringify(value, null, 2));
            })
            .catch(err => console.error(err))
    }

 

    function upload(oauthToken) {
        const metadata = { name: 'test.json', mimeType: 'application/json' };
        const form = new FormData();
        form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
        form.append('file', JSON.stringify({ hello: 'world 2' }));

        fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
            method: 'POST',
            headers: new Headers({ Authorization: 'Bearer ' + oauthToken }),
            body: form
        })
            .then(result => result.json())
            .then(value => {
                console.log('Uploaded. Result:\n' + JSON.stringify(value, null, 2));
            })
            .catch(err => console.error(err))
    }

    class GoogleBackup extends HTMLElement {

        connectedCallback() {

            const queryString = new URLSearchParams(window.location.hash);

            const access_token = queryString.get('#access_token');

            console.log(access_token);
            upload(access_token);
        }

        login() {
            window.location = url;
        }

        save(fileName, fileData) {

        }

        load(fileName) {

        }
    }

    customElements.define('google-backup', GoogleBackup);
})();
