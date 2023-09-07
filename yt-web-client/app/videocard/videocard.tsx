import React from 'react'
import { Video } from '../firebase/functions'
import Link from 'next/link'


export default function VideoCard({ filename, id, title, description }: Video) {
  return (
    <Link href={`/watch?v=${filename}`} key={id}>
        <div className="mx-6 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img className="rounded-t-lg" src="thumbnail.png" alt="" />
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    { title ? title : "Video" }
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    { description ? description : "No description provided."}
                </p>
            </div>
        </div>
    </Link>
  )
}
