import React, { useState, Children, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  stepCircleContainerClassName = '',
  stepContainerClassName = '',
  contentClassName = '',
  footerClassName = '',
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = 'Back',
  nextButtonText = 'Continue',
  disableStepIndicators = false,
  renderStepIndicator,
  ...rest
}) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [direction, setDirection] = useState(0);
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isCompleted = currentStep > totalSteps;
  const isLastStep = currentStep === totalSteps;

  const updateStep = (newStep) => {
    setCurrentStep(newStep);
    if (newStep > totalSteps) {
      onFinalStepCompleted();
    } else {
      onStepChange(newStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      setDirection(1);
      updateStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    setDirection(1);
    updateStep(totalSteps + 1);
  };

  return (
    <div
      className={`flex flex-col w-full h-full ${rest.className || ""}`}
      {...rest}
    >
      <div
        className={`mx-auto w-full rounded-[2rem] ${stepCircleContainerClassName}`}
      >
        <div className={`${stepContainerClassName} flex w-full items-center p-6 md:p-8`}>
          {stepsArray.map((_, index) => {
            const stepNumber = index + 1;
            const isNotLastStep = index < totalSteps - 1;
            return (
              <React.Fragment key={stepNumber}>
                {renderStepIndicator ? (
                  renderStepIndicator({
                    step: stepNumber,
                    currentStep,
                    onStepClick: clicked => {
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    }
                  })
                ) : (
                  <StepIndicator
                    step={stepNumber}
                    disableStepIndicators={disableStepIndicators}
                    currentStep={currentStep}
                    onClickStep={clicked => {
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    }}
                  />
                )}
                {isNotLastStep && <StepConnector isComplete={currentStep > stepNumber} />}
              </React.Fragment>
            );
          })}
        </div>

        <StepContentWrapper
          isCompleted={isCompleted}
          currentStep={currentStep}
          direction={direction}
          className={`space-y-2 px-4 md:px-6 ${contentClassName}`}
        >
          {stepsArray[currentStep - 1]}
        </StepContentWrapper>

        {!isCompleted && (
          <div className={`px-8 pb-8 ${footerClassName}`}>
            <div className={`mt-8 flex ${currentStep !== 1 ? 'justify-between' : 'justify-end'}`}>
              {currentStep !== 1 && (
                <motion.button
                  type="button"
                  onClick={handleBack}
                  whileHover={{ x: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className={`duration-350 rounded px-2 py-1 transition flex items-center gap-1 ${
                    currentStep === 1
                      ? 'pointer-events-none opacity-50 text-neutral-400'
                      : 'text-neutral-400 hover:text-sky-500 font-bold'
                  }`}
                  {...backButtonProps}
                >
                  ← {backButtonText}
                </motion.button>
              )}
              <motion.button
                type="button"
                onClick={isLastStep ? handleComplete : handleNext}
                whileHover={{ scale: 1.05, x: 4 }}
                whileTap={{ scale: 0.95 }}
                className="ir-btn flex"
                {...nextButtonProps}
              >
                {isLastStep ? 'Complete' : nextButtonText}
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StepContentWrapper({
  isCompleted,
  currentStep,
  direction,
  children,
  className = ''
}) {
  const [parentHeight, setParentHeight] = useState(0);

  return (
    <motion.div
      style={{ position: 'relative', overflow: 'hidden' }}
      animate={{ height: isCompleted ? 0 : parentHeight }}
      transition={{ type: 'spring', duration: 0.4 }}
      className={className}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        {!isCompleted && (
          <SlideTransition key={currentStep} direction={direction} onHeightReady={h => setParentHeight(h)}>
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SlideTransition({ children, direction, onHeightReady }) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      onHeightReady(containerRef.current.offsetHeight);
    }
  }, [children, onHeightReady]);

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4 }}
      style={{ position: 'absolute', left: 0, right: 0, top: 0 }}
    >
      {children}
    </motion.div>
  );
}

const stepVariants = {
  enter: (dir) => ({
    x: dir >= 0 ? '100%' : '-100%',
    opacity: 0
  }),
  center: {
    x: '0%',
    opacity: 1
  },
  exit: (dir) => ({
    x: dir >= 0 ? '-100%' : '100%',
    opacity: 0
  })
};

export function Step({ children }) {
  return <div className="w-full px-6 md:px-8">{children}</div>;
}

function StepIndicator({ step, currentStep, onClickStep, disableStepIndicators = false }) {
  const status = currentStep === step ? 'active' : currentStep > step ? 'complete' : 'inactive';

  const handleClick = () => {
    if (step !== currentStep && !disableStepIndicators) {
      onClickStep(step);
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      whileHover={!disableStepIndicators ? { scale: 1.15 } : {}}
      whileTap={!disableStepIndicators ? { scale: 0.95 } : {}}
      className={`relative outline-none focus:outline-none ${disableStepIndicators ? 'pointer-events-none' : 'cursor-pointer'}`}
      animate={status}
      initial={false}
    >
      <motion.div
        variants={{
          inactive: { 
            scale: 1, 
            backgroundColor: 'rgba(15, 23, 42, 0.05)', 
            color: '#64748b',
            boxShadow: '0 0 0 0px rgba(14, 165, 233, 0)'
          },
          active: { 
            scale: 1.1, 
            backgroundColor: '#0ea5e9', 
            color: '#fff',
            boxShadow: '0 0 20px 2px rgba(14, 165, 233, 0.3)'
          },
          complete: { 
            scale: 1, 
            backgroundColor: '#10b981', 
            color: '#fff',
            boxShadow: '0 0 0 0px rgba(16, 185, 129, 0)'
          }
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="flex h-12 w-12 items-center justify-center rounded-2xl font-black shadow-sm dark:bg-slate-800/50"
      >
        {status === 'complete' ? (
          <CheckIcon className="h-6 w-6 text-white" />
        ) : (
          <span className="text-base">{step}</span>
        )}
      </motion.div>
      {status === 'active' && (
        <motion.div
          layoutId="step-glow"
          className="absolute inset-0 rounded-2xl bg-sky-400/20 blur-md -z-10"
          transition={{ duration: 0.4 }}
        />
      )}
    </motion.div>
  );
}

function StepConnector({ isComplete }) {
  return (
    <div className="relative mx-3 h-1 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
      <motion.div
        className="absolute left-0 top-0 h-full bg-gradient-to-r from-sky-400 to-cyan-400"
        initial={false}
        animate={{ width: isComplete ? '100%' : '0%' }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          delay: 0.1,
          type: 'tween',
          ease: 'easeOut',
          duration: 0.3
        }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
