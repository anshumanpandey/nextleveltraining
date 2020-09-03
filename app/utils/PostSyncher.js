import Upload from 'react-native-background-upload'
import { getGlobalState } from '../state/GlobalState'
import { API_BASE_URL } from '../api/AxiosBootstrap'

const fileUploaderMap = new Map()

const FileSyncher = (fileObject, idToAttach, fileType = "Post") => {
    const token = getGlobalState('token')
    const { uploadPath, uri } = fileObject

    const getPath = () => uploadPath || uri

    const options = {
        url: `${API_BASE_URL}/Users/UploadFile`,
        path: getPath(),
        method: 'POST',
        type: 'multipart',
        maxRetries: 2, // set retry count (Android only). Default 2
        field: "File",
        headers: {
            'content-type': 'multipart/form-data', // Customize content-type
            'Authorization': `Bearer ${token}`
        },
        parameters: {
            Type: fileType,
            Id: idToAttach
        },
        // Below are options only supported on Android
        notification: {
            enabled: false
        },
        useUtf8Charset: true
    }

    const fileKey = `${idToAttach}-${fileType}-${getPath()}`
    if (!fileUploaderMap.has(fileKey)) {
        fileUploaderMap.set(fileKey)
    } else {
        return Promise.reject("Upload already started")
    }


    return Upload.startUpload(options)
        .then((uploadId) => {
            return new Promise((resolve, rejected) => {
                console.log('Upload started')
                Upload.addListener('progress', uploadId, (data) => {
                    console.log(`[${getPath()}] Progress: ${data.progress}%`)
                })
                Upload.addListener('error', uploadId, (data) => {
                    console.log(`[${getPath()}] Error: ${JSON.stringify(data)}`)
                    rejected()
                })
                Upload.addListener('cancelled', uploadId, (data) => {
                    console.log(`[${getPath()}] Cancelled!`)
                })
                Upload.addListener('completed', uploadId, (data) => {
                    // data includes responseCode: number and responseBody: Object
                    console.log(`[${getPath()}] Completed!`)
                    console.log(data)
                    resolve()
                })
            })
        }).catch((err) => {
            console.log('Upload error!', err)
            throw err
        })
}

export default FileSyncher;