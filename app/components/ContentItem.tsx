import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface ContentItemProps {
  title: string
  image: string
  link: string
}

export default function ContentItem({ title, image, link }: ContentItemProps) {
  return (
    <Link 
      href={link}
      className="group block bg-white transition-all duration-500 ease-in-out transform hover:scale-[1.02]"
    >
      <div className="relative aspect-video">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="pt-2">
        <h3 className="font-mono text-[11px] group-hover:text-orange-500 transition-colors">
          {title}
        </h3>
      </div>
    </Link>
  )
} 