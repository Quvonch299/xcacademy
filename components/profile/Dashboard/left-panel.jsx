'use client';
import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';
import GlassButton1 from '@/components/ui/GlassButton1';

export default function LeftPanel({ step = 0, setStep }) {
  const [activeBtn, setActiveBtn] = useState(step);
  const [isOpen, setIsOpen] = useState(true);

  const buttons = [
    'Html & Css',
    'Javascript',
    'React.JS',
    'Next.JS',
    'TypeScript',
  ];

  useEffect(() => {
    setActiveBtn(step);
  }, [step]);

  const panelVariants = {
    open: {
      height: 'auto',
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 250,
        damping: 30,
        when: 'beforeChildren',
        staggerChildren: 0.05,
      },
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 35,
        when: 'afterChildren',
      },
    },
  };

  const buttonVariants = {
    open: { y: 0, opacity: 1 },
    closed: { y: -10, opacity: 0 },
  };

  return (
    <div className="
      w-full 
      md:w-[280px] 
      lg:w-[320px] 
      p-4 md:p-6 
      md:h-screen 
      shadow-[0_0_4px_0_#76767626] 
      rounded-xl
      bg-white
    ">

      {/* Header */}
      <div
        className="flex items-center justify-between cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-sm md:text-base font-medium">
          Мой профиль
        </h2>

        <motion.div
          animate={{ rotate: isOpen ? 0 : 180 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <IoIosArrowDown size={20} />
        </motion.div>
      </div>

      {/* Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            variants={panelVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="flex flex-col gap-4 mt-4 overflow-hidden"
          >
            {buttons.map((btn, idx) => (
              <motion.div key={btn} variants={buttonVariants}>
                <GlassButton1
                  w="w-full"
                  h="h-[56px] md:h-[60px]"
                  text={btn}
                  textsize="text-lg md:text-xl"
                  active={activeBtn === idx}
                  onClick={() => {
                    setActiveBtn(idx);
                    setStep(idx);
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}