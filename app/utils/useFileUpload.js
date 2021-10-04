import { useState } from 'react'
import { Platform } from 'react-native'
import Upload from 'react-native-background-upload'
import { API_BASE_URL } from '../api/AxiosBootstrap';
import { useGlobalState } from '../state/GlobalState';

/**
 * Response from API after successful upload
 * @typedef {Object} FileUploadResponse
 * @property {string} id - Record ID
 * @property {string} responseBody - Full url
 */

export const FILE_TYPE_UPLOAD = {
  "PROFILE": "profile",
  "DBS": "dbs",
  "VERIFICATION": "verification",
  "LOCATION": "location",
  "POST": "Post"
}


export const useFileUploader = () => {
  const [token] = useGlobalState('token')
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [data, setData] = useState(undefined);


  /**
   * Save a file
   * @param {Object} params
   * @param {string} params.file - File object returned by file picking libraries
   * @param {string} [params.idToAttach] - Id of the user to attach the file
   * @param {string} params.type - Id of the user to attach the file
   * @returns {Promise<FileUploadResponse>}
   */
  const doUpload = ({ file, idToAttach, type }) => {
    setLoading(true)

    const parameters = {
      Type: type,
    }

    if (idToAttach) {
      parameters.Id = idToAttach
    }
    let path = file.uploadPath || file.uri

    if (Platform.OS === "android") {
      path = path.replace("file://", "");
    }

    const options = {
      url: `${API_BASE_URL}/Users/UploadFile`,
      path,
      method: 'POST',
      type: 'multipart',
      maxRetries: 2, // set retry count (Android only). Default 2
      field: "File",
      headers: {
        'content-type': 'multipart/form-data', // Customize content-type
        'Authorization': `Bearer ${token}`
      },
      parameters,
      // Below are options only supported on Android
      notification: {
        enabled: false
      },
      useUtf8Charset: true
    }

    return Upload.startUpload(options)
      .then((uploadId) => {
        console.log('Upload started')
        Upload.addListener('progress', uploadId, (e) => {
          console.log(`[${path}] Progress: ${e.progress}%`)
        })

        return new Promise((resolve, rejected) => {
          Upload.addListener('error', uploadId, (e) => {
            console.log(`[${path}] Error: ${JSON.stringify(e)}`)
            setError(e)
            setLoading(false)
            rejected(e)
          })
          Upload.addListener('cancelled', uploadId, () => {
            console.log(`[${path}] Cancelled!`)
            setLoading(false)
            rejected(new Error("Cancelled"))
          })
          Upload.addListener('completed', uploadId, (e) => {
            console.log(`[${path}] Completed!`)
            setData(e)
            setLoading(false)
            resolve(e)
          })
        })
      })
  }

  return [
    {
      loading,
      error,
      data,
    },
    doUpload
  ]
}

export const resolveFilePath = (file) => {
  const { uri } = file
  return Platform.OS === 'android' ? uri : `file://${uri}`;
}
