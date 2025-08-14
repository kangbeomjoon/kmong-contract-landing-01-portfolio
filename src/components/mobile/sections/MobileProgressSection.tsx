'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

interface ProgressStep {
  id: number
  title: string
  description: string
  imagePath: string
  imageAlt: string
}

const progressSteps: ProgressStep[] = [
  {
    id: 1,
    title: "회원가입 및 기본 설정",
    description: "간편한 회원가입으로 바즈비 플랫폼에 입문하고, 기본 설정을 완료하세요.",
    imagePath: "/images/mobile/progress/step-1@2x.png",
    imageAlt: "회원가입 및 기본 설정 일러스트"
  },
  {
    id: 2,
    title: "콘텐츠 제작 및 업로드",
    description: "매력적인 콘텐츠를 제작하고 플랫폼에 업로드하여 고객들과 만나보세요.",
    imagePath: "/images/mobile/progress/step-2@2x.png",
    imageAlt: "콘텐츠 제작 및 업로드 일러스트"
  },
  {
    id: 3,
    title: "수익 창출 및 분석",
    description: "데이터 분석을 통해 수익을 최대화하고 지속적인 성장을 이뤄보세요.",
    imagePath: "/images/mobile/progress/step-3@2x.png",
    imageAlt: "수익 창출 및 분석 일러스트"
  }
]

const MobileProgressSection: React.FC = () => {
  const [sectionRef, sectionInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.3
      }
    }
  }

  const titleVariants = {
    hidden: { 
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0
    }
  }

  const stepVariants = {
    hidden: { 
      opacity: 0,
      y: 40
    },
    visible: {
      opacity: 1,
      y: 0
    }
  }

  const progressLineVariants = {
    hidden: { 
      scaleY: 0,
      opacity: 0 
    },
    visible: {
      scaleY: 1,
      opacity: 1
    }
  }

  const imageVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: 1
    }
  }

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-black text-white py-16 px-4 overflow-hidden"
      aria-labelledby="progress-title"
    >
      <motion.div
        className="max-w-sm mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={sectionInView ? "visible" : "hidden"}
      >
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          variants={titleVariants}
        >
          <h2 
            id="progress-title"
            className="text-2xl font-bold leading-tight mb-4"
          >
            바즈비 플랫폼을 이용해<br />
            어떻게 사업성장을<br />
            느끼나요?
          </h2>
        </motion.div>

        {/* Progress Steps */}
        <div className="relative">
          {/* Progress Line */}
          <motion.div
            className="absolute left-6 top-12 bottom-12 w-0.5 bg-gradient-to-b from-red-500 via-red-400 to-red-300"
            variants={progressLineVariants}
            transition={{ 
              duration: 1.2,
              ease: "easeOut",
              delay: 0.5
            }}
            style={{ transformOrigin: "top center" }}
          />

          {/* Steps */}
          {progressSteps.map((step, index) => (
              <motion.div
                key={step.id}
                className={`relative flex items-start mb-16 ${
                  index === progressSteps.length - 1 ? 'mb-0' : ''
                }`}
                variants={stepVariants}
                transition={{
                  duration: 0.7,
                  ease: "easeOut"
                }}
              >
                {/* Step Number Circle */}
                <motion.div
                  className="relative z-10 flex-shrink-0 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-6 shadow-lg"
                  whileInView={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <span className="text-white font-bold text-lg">
                    {step.id}
                  </span>
                </motion.div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  {/* Text Content */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-white">
                      {step.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Image */}
                  <motion.div
                    className="relative w-full h-48 bg-gray-900 rounded-lg overflow-hidden shadow-xl"
                    variants={imageVariants}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut"
                    }}
                    whileInView="visible"
                    initial="hidden"
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <Image
                      src={step.imagePath}
                      alt={step.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 400px"
                      priority={index === 0}
                    />
                    
                    {/* Image Overlay for Better Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </motion.div>
                </div>
              </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          variants={titleVariants}
          transition={{
            duration: 0.8,
            ease: "easeOut"
          }}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true }}
        >
          <motion.button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-4 rounded-full transition-colors duration-300 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="바즈비 플랫폼 시작하기"
          >
            바즈비와 함께 시작하기
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Background Decorative Elements */}
      <div className="absolute top-20 right-4 w-2 h-20 bg-gradient-to-b from-red-500/30 to-transparent rounded-full" />
      <div className="absolute bottom-32 left-4 w-1 h-16 bg-gradient-to-t from-red-400/40 to-transparent rounded-full" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-400/30 rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </section>
  )
}

export default MobileProgressSection