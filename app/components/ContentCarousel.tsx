'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ContentItem from './ContentItem'

interface ContentItem {
  title: string
  image: string
  link: string
}

interface ContentCarouselProps {
  items: ContentItem[]
}

export default function ContentCarousel({ items }: ContentCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % items.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [items.length])

  const handleNext = () => {
    setCurrentIndex((current) => (current + 1) % items.length)
  }

  const handlePrev = () => {
    setCurrentIndex((current) => (current - 1 + items.length) % items.length)
  }

  // Create an array with duplicated items for seamless looping
  const extendedItems = [...items, ...items, ...items]

  return (
    <div className="relative group">
      <div className="overflow-hidden">
        <motion.div 
          className="flex"
          initial={false}
          animate={{ x: `-${(currentIndex * 100) / 3}%` }}
          transition={{
            duration: 0.8,
            ease: "easeInOut"
          }}
          style={{ width: '300%' }}
        >
          {extendedItems.map((item, index) => (
            <motion.div 
              key={`${index}`}
              className="w-1/3 flex-shrink-0 px-2"
            >
              <ContentItem {...item} />
            </motion.div>
          ))}
        </motion.div>
      </div>
      <button 
        onClick={handlePrev}
        className="absolute left-0 top-0 h-full px-6 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Previous"
      >
        <span className="font-mono text-xs tracking-wider hover:text-orange-500 transition-colors">←</span>
      </button>
      <button 
        onClick={handleNext}
        className="absolute right-0 top-0 h-full px-6 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Next"
      >
        <span className="font-mono text-xs tracking-wider hover:text-orange-500 transition-colors">→</span>
      </button>
    </div>
  )
} 