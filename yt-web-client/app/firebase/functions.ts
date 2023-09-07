import { httpsCallable } from 'firebase/functions';
import { functions } from './firebase';

const generatedUploadUrl = httpsCallable(functions, 'generateUploadUrl');
const getVideosFunction = httpsCallable(functions, 'getVideos');

export interface Video {
  id?: string,
  uid?: string,
  filename?: string,
  status?: 'processing' | 'processed',
  title?: string,
  description?: string  
}

export async function getVideos() {
  const response: any = await getVideosFunction();
  return response.data as Video[];
}

export async function uploadVideo(file: File) {
    const response: any = await generatedUploadUrl({
        fileExtension: file.name.split('.').pop()
    });

    // Upload the file via the signed URL
    await fetch(response?.data?.url, {
        method: 'PUT',
        body: file,
        headers: {
            'Content-Type': file.type
        }
    });
    return;
}