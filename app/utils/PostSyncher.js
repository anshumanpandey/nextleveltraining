import Upload from 'react-native-background-upload'

const SyncPosts = (uri, token) => {
    console.log(uri)
    const options = {
        url: 'http://44.233.116.105/NextLevelTrainingApi/api/Users/UploadFile',
        path: uri,
        method: 'POST',
        type: 'raw',
        maxRetries: 2, // set retry count (Android only). Default 2
        headers: {
            'content-type': 'multipart/form-data', // Customize content-type
            'Authorization': token
        },
        // Below are options only supported on Android
        notification: {
            enabled: false
        },
        useUtf8Charset: true
    }

    Upload.startUpload(options).then((uploadId) => {
        console.log('Upload started')
        Upload.addListener('progress', uploadId, (data) => {
            console.log(`Progress: ${data.progress}%`)
        })
        Upload.addListener('error', uploadId, (data) => {
            console.log(`Error: ${data.error}%`)
        })
        Upload.addListener('cancelled', uploadId, (data) => {
            console.log(`Cancelled!`)
        })
        Upload.addListener('completed', uploadId, (data) => {
            // data includes responseCode: number and responseBody: Object
            console.log('Completed!')
        })
    }).catch((err) => {
        console.log('Upload error!', err)
    })
}

export default SyncPosts;