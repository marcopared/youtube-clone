import Image from 'next/image'
import { getVideos } from './firebase/functions'
import Link from 'next/link'
import styles from './page.module.css'
import VideoCard from './videocard/videocard'

export default async function Home() {
  const videos = await getVideos();
  console.log(videos);

  return (
    <main>
      <div className="my-30 flex flex-wrap justify-center">
        {
          videos.map((video) => (
            <VideoCard {...video}/>
          ))
        }
      </div>
    </main>
  )
}

export const revalidate = 0;