import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

export default function Reveal({ children, delay = 0, as = 'div', className, ...rest }) {
  const Tag = motion[as] ?? motion.div
  return (
    <Tag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
