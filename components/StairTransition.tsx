"use client"

import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation";
import Stairs from "./Stairs";

const StairTransition: React.FC = () => {                           // Muestra las escaleras y el fondo se desvanece.

  const pathname = usePathname()

  return (
    <>
      <AnimatePresence                                    // Espera hasta que las animaciones de salida terminen antes de iniciar las de entrada
        mode="wait"
      >                       
        <div 
          key={pathname}                                  // El div se renderizará cada vez que la ruta cambia, activando las animaciones
        >
          <div className="h-screen w-screen fixed top-0 left-0 right-0 pointer-events-none z-40 flex">
            <Stairs />
          </div>

          <motion.div 
            className="h-screen w-screen fixed bg-primary top-0 pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{
              opacity: 0,                                 // Hace que desaparezca el div que ocupa toda la pantalla 
              transition: {
                delay: 1,
                duration: 0.4,
                ease: "easeInOut"
              }
            }}
          />
        </div>
      </AnimatePresence>
    </>
  )
}

export default StairTransition