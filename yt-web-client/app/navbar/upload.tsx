'use client';

import { Fragment } from "react";
import { uploadVideo } from "../firebase/functions";

import styles from "./upload.module.css";

export default function Upload() {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.item(0);
        if (file) {
            handleUpload(file);
        }
    }

    const handleUpload = async (file: File) => {
        try {
            const response = await uploadVideo(file);
            alert(`File uploaded successfully: Response: ${JSON.stringify(response)}`)
        } catch (error) {
            alert(`Failed to upload file: ${error}`);
        }
    }

    return (
        <Fragment>
            <input id="upload" className={styles.uploadInput} type="file" accept="video/*" 
                onChange={handleFileChange}
            />
            <label htmlFor="upload" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                Upload Video
            </label>
        </Fragment>
    )
}