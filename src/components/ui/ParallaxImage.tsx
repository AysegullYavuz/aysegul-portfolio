import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { easeOutQuint } from './Reveal'

/**
 * Image that is revealed with a clip-path wipe and drifts subtly on scroll.
 * `range` is the parallax travel in percent of the image height.
 */
export function ParallaxImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  range = 12,
  priority = false,
  width = 1024,
  height = 1024,
  scaleOnHover = false,
}: {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  range?: number
  priority?: boolean
  width?: number
  height?: number
  scaleOnHover?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${range}%`, `${range}%`])

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      initial={reduce ? false : { clipPath: 'inset(12% 8% 12% 8% round 1.5rem)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 0rem)' }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 1.4, ease: easeOutQuint }}
    >
      <div
        className={`h-full w-full ${
          scaleOnHover ? 'transition-transform duration-[1200ms] ease-out-quint group-hover:scale-[1.045]' : ''
        }`}
      >
        <motion.img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          style={reduce ? undefined : { y, scale: 1 + (range * 2) / 100 }}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      </div>
    </motion.div>
  )
}
