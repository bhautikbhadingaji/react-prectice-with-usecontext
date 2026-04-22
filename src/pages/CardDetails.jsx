import { useContext, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { PostContext } from '../context/Context'
import { Drawers } from '../components/Drawers'

export const CardDetails = ({ postData }) => {

  const { posts } = useContext(PostContext)
  const post = posts.find((p) => p.id === postData)

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-800">
        <div className="w-full text-center text-white">
          <h1 className="font-bold border-gray-500 mb-5">TITLE : {post.title} </h1>
          <p>BODY : {post.body}</p>
        </div>
      </div>
    </div>


  )
}