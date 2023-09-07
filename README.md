# YouTube Skeleton Clone

Hey there! 👋 Welcome to my GitHub repository for the YouTube Skeleton Clone project. This is a simplified version of YouTube that I built as part of [Neetcode's Full Stack Development course](https://neetcode.io/courses/full-stack-dev/0). I wanted to share my design and development journey with you, so let's dive right in!

Feel free to view current version (in beta) <a href="https://yt-web-client-asxev4o2ta-uc.a.run.app" target="_blank">here</a>.

## Table of Contents
- [Background](#background)
- [Project Goals](#project-goals)
- [Tech Stack](#tech-stack)
- [High-Level Overview](#high-level-overview)
- [In-Depth Design](#in-depth-design)
- [Challenges and Future Improvements](#challenges-and-future-improvements)
- [Conclusion](#conclusion)
- [References](#references)

---

## Background

YouTube is an incredible platform that lets you upload, watch, rate, share, and comment on videos. However, it's also a colossal undertaking, especially with over a billion daily active users. So, instead of trying to recreate the entire YouTube experience, I focused on some core features to create a simplified clone.

## Project Goals

Here are the key objectives I set out to achieve with this project:

- **User Authentication:** Users can sign in and out using their Google accounts.
- **Video Uploading:** Authenticated users can upload videos.
- **Video Transcoding:** Videos are transcoded into multiple formats (e.g., 360p, 720p) for accessibility.
- **Video Viewing:** Users, whether signed in or not, can view lists of uploaded videos and individual videos.

## Tech Stack

Before we delve into the design, let me introduce the technologies I used:

- **Video Storage:** Google Cloud Storage for hosting raw and processed videos.
- **Event Handling:** Cloud Pub/Sub for managing video upload events.
- **Video Processing:** Cloud Run, powered by FFmpeg, for transcoding videos.
- **Metadata Storage:** Firestore to store video metadata.
- **API:** Firebase Functions for building a simple API.
- **Web Client:** Next.js for the web client, hosted on Cloud Run.
- **Authentication:** Firebase Auth for handling user sign-in.

## High-Level Overview

![High-Level Architecture Diagram](public/high-level-architecture.avif)

Here's a bird's-eye view of the project's architecture:

- **Video Storage (Cloud Storage):** Google Cloud Storage holds all the raw and processed videos, offering scalability and cost-effectiveness.

- **Video Upload Events (Cloud Pub/Sub):** When a video is uploaded, a message is sent to a Cloud Pub/Sub topic. This ensures the durability of video upload events and enables asynchronous processing.

- **Video Processing Workers (Cloud Run):** These workers receive Pub/Sub messages and transcode videos using FFmpeg. Cloud Run automatically scales as needed. Processed videos are then uploaded back to Cloud Storage.

- **Video Metadata (Firestore):** Once a video is processed, its metadata is stored in Firestore. This includes information like title and description, crucial for displaying videos in the web client.

- **Video API (Firebase Functions):** Firebase Functions create a simple API, allowing users to upload videos and retrieve video metadata. This can be expanded for more CRUD operations.

- **Web Client (Next.js / Cloud Run):** The web client, powered by Next.js, enables users to sign in and upload videos. It's hosted on Cloud Run.

- **Authentication (Firebase Auth):** Firebase Auth handles user sign-in, making it easy to integrate with Google Sign-In.

## In-Depth Design

### 1. User Sign Up

To make user sign-up seamless, I leveraged Firebase Auth. It manages Google account sign-ups, creating a user record with a unique ID and email address. Additional user details, like name and profile picture, are stored in Firestore. This avoids potential client-side issues by using Firebase Functions to create the user document.

### 2. Video Upload

I designed the system to allow only authenticated users to upload videos. This associates the uploaded video with the user's account and paves the way for implementing upload quotas in the future. To simplify, I used Google Cloud Storage, which excels at handling large video files. Before generating a signed URL for video uploads, user authentication is ensured to maintain security.

### 3. Video Processing

Video processing starts immediately upon upload, but it's possible to receive numerous uploads simultaneously, overwhelming the system. To overcome this, I introduced a message queue, Cloud Pub/Sub, for decoupling uploads and processing. Benefits include:

- Separation of video upload and processing.
- Pub/Sub subscriptions to push messages to processing workers.
- Automatic message buffering by Pub/Sub, enabling dynamic scaling of workers.
- Processed videos are stored in a public Cloud Storage bucket, and metadata is recorded in Firestore for web client display.

It's important to note some limitations, such as Cloud Run request timeouts, Pub/Sub redelivery, and the absence of content checks within videos.

## Challenges and Future Improvements

### Limitations

**1. Long Lived HTTP Requests**
For Pub/Sub, the max ack deadline is 600 seconds, but the max request processing time for Cloud Run is 3600 seconds. If video processing takes longer than 600 seconds, Pub/Sub will close the HTTP connection, causing the message to be stuck in the queue. To address this, we can switch to the Pull Subscription method, allowing us to control when we pull and process messages, and acknowledge them within the ack deadline.

**2. Video Processing Failure**
If video processing fails after pulling a message from the Pub/Sub queue and changing its status to "processing" in Firestore, the message can be stuck in the queue indefinitely. To mitigate this, we could reset the status to "undefined" if processing fails.

**3. File Upload Time Limit**
The signed URL we generate is valid for 15 minutes, but slow internet connections may pose a challenge. However, as long as the upload begins within the 15-minute window, it will continue even after the signed URL expires, as it's used solely for authentication.

**4. Video Streaming**
While Google Cloud Storage offers basic video streaming, it's not as powerful as YouTube's custom video streaming solutions like DASH and HLS. These solutions allow adaptive streaming and chunked video delivery for a smoother viewing experience.

**5. Content Delivery Network**
Serving videos from a Content Delivery Network (CDN) would enhance user experience by reducing latency. Videos served from a geographically close server would load faster.

### Future Work

Here's a list of potential improvements and features for the future:

- Add user's profile picture and email to the web client.
- Allow users to upload multiple videos without refreshing the page.
- Enable users to upload thumbnails for their videos.
- Allow users to add titles and descriptions to their videos.
- Display the uploader's information for each video.
- Implement user subscriptions to other user's channels.
- Implement automatic cleanup of raw videos in Cloud Storage after processing.
- Integrate a CDN to serve videos and reduce latency.
- Consider adding unit and integration tests for improved code quality.

## Conclusion

Thank you for taking the time to explore this project! I hope you've gained valuable insights into designing and architecting applications. Remember, there are many nuances in application design, and it often involves making trade-offs. Building an app like Twitter or YouTube is a complex endeavor that takes time and effort.

Your feedback is highly appreciated as I continuously strive to improve this project. Feel free to share your thoughts and suggestions!


## References

I relied on several references during this project:

- [Neetcode's Full Stack Development course](https://neetcode.io/courses/full-stack-dev/0)
- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
- [Cloud Storage Signed URLs](https://cloud.google.com/storage/docs/access-control/signed-urls)
- [Pub/Sub Push Subscriptions](https://cloud.google.com/pubsub/docs/push)
- [Using Pub/Sub with Cloud Storage](https://cloud.google.com/storage/docs/pubsub-notifications)
- [Using Pub/Sub with Cloud Run](https://cloud.google.com/run/docs/tutorials/pubsub)

Feel free to explore my design and project journey! If you have any questions or suggestions, please don't hesitate to reach out.
