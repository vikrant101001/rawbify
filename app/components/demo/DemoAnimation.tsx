'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface DemoAnimationProps {
  children: ReactNode
  type?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'bounce' | 'rotate'
  delay?: number
  duration?: number
  className?: string
}

export default function DemoAnimation({
  children,
  type = 'fadeIn',
  delay = 0,
  duration = 0.5,
  className = ''
}: DemoAnimationProps) {
  const getAnimationVariants = () => {
    switch (type) {
      case 'fadeIn':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 }
        }
      
      case 'slideUp':
        return {
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -50 }
        }
      
      case 'slideLeft':
        return {
          initial: { opacity: 0, x: 50 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -50 }
        }
      
      case 'slideRight':
        return {
          initial: { opacity: 0, x: -50 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: 50 }
        }
      
      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.8 }
        }
      
      case 'bounce':
        return {
          initial: { opacity: 0, y: -100 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: 100 }
        }
      
      case 'rotate':
        return {
          initial: { opacity: 0, rotate: -180 },
          animate: { opacity: 1, rotate: 0 },
          exit: { opacity: 0, rotate: 180 }
        }
      
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 }
        }
    }
  }

  const variants = getAnimationVariants()
  
  const transition = type === 'bounce' 
    ? { 
        type: "spring", 
        damping: 10, 
        stiffness: 100,
        delay
      }
    : { 
        duration, 
        delay,
        ease: "easeOut"
      }

  return (
    <motion.div
      initial={variants.initial}
      animate={variants.animate}
      exit={variants.exit}
      transition={transition as any}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Specialized animation components for common demo use cases
export const FadeInUp = ({ children, delay = 0, className = '' }: { 
  children: ReactNode
  delay?: number
  className?: string 
}) => (
  <DemoAnimation type="slideUp" delay={delay} className={className}>
    {children}
  </DemoAnimation>
)

export const ScaleIn = ({ children, delay = 0, className = '' }: { 
  children: ReactNode
  delay?: number
  className?: string 
}) => (
  <DemoAnimation type="scale" delay={delay} className={className}>
    {children}
  </DemoAnimation>
)

export const SlideInLeft = ({ children, delay = 0, className = '' }: { 
  children: ReactNode
  delay?: number
  className?: string 
}) => (
  <DemoAnimation type="slideLeft" delay={delay} className={className}>
    {children}
  </DemoAnimation>
)

export const BounceIn = ({ children, delay = 0, className = '' }: { 
  children: ReactNode
  delay?: number
  className?: string 
}) => (
  <DemoAnimation type="bounce" delay={delay} className={className}>
    {children}
  </DemoAnimation>
)
