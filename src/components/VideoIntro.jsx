import { motion } from 'framer-motion'

export default function VideoIntro({ visible, onEnded, onDuration }) {
  return (
    <motion.div
      className="video-intro"
      initial={{ opacity: 1 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 1.4, ease: 'easeInOut' }}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
    >
      <video
        className="video-intro-el"
        src="/hero-timelapse.mp4"
        autoPlay
        muted
        playsInline
        onLoadedMetadata={(e) => onDuration?.(e.currentTarget.duration)}
        onEnded={onEnded}
      />
    </motion.div>
  )
}
