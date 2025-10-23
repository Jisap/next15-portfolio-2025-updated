"use client"

import { motion } from "framer-motion"

const stairAnimation = {
  initial: {
    top: "0%",
  },
  animate: {
    top: "100%",
  },
  exit: {
    top: ["100%", "0%"],
  },
}

// ReverseIndex calcula un índice inverso para crear un retraso escalonado.
// El retraso escalonado hace que el primer div tenga el mayor retraso,
// y cada div subsiguiente tenga un retraso menor, creando un efecto visual de "escalera" en movimiento.

const reverseIndex = (index: number) => {
  const totalSteps = 6;
  return totalSteps - index - 1 
}

const Stairs: React.FC = () => {
  return (
    <>
       {[...Array(6)].map((_, index) => {
        return(
          <motion.div 
            key={index}
            variants={stairAnimation} // Cada motion.div se anima desde top: 0% a top: 100% cuando se monta, y se anima de vuelta desde top: 100% a top: 0% cuando se desmonta.
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.4,
              ease: 'easeInOut',
              delay: reverseIndex(index) * 0.1  // El retraso escalonado hace que el primer div tenga el mayor retraso, y cada div subsiguiente tenga un retraso menor, creando un efecto visual de "escalera" en movimiento.
            }}
            className="h-full w-full bg-accent relative"
            />
        )
       })}
    </>
  )
}

export default Stairs