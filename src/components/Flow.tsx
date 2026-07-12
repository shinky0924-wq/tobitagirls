/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { SiteContent } from '../siteContent';

interface FlowProps {
  content: SiteContent['flow'];
}

export default function Flow({ content }: FlowProps) {
  return (
    <section className="py-20 bg-rose-50/10 overflow-hidden" id="flow">
      <div className="max-w-[1100px] mx-auto px-6">
        
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-secondary font-display font-bold tracking-widest text-xs md:text-sm block mb-2 uppercase">
            {content.subtitle}
          </span>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl lg:text-4xl mb-4 text-on-surface">
            {content.title}
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-secondary to-rose-300 mx-auto rounded-full mt-4" />
        </div>

        {/* Dynamic Connective Flow Cards */}
        <div className="relative" id="workflow-wrapper">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-[50px] left-[5%] right-[5%] h-0.5 border-t-2 border-dashed border-secondary/30 -z-10" />

          <div className="flex flex-col sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 relative z-10">
            {content.items.map((step, idx) => (
              <div key={step.number} className="flex flex-col items-center w-full">
                {/* Connecting arrow down on mobile, shown between steps */}
                {idx > 0 && (
                  <div className="sm:hidden my-1 text-secondary/40 animate-bounce">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="flex flex-row sm:flex-col items-center sm:text-center text-left bg-white sm:bg-transparent p-4 sm:p-0 rounded-2xl sm:rounded-none border sm:border-0 border-rose-100/40 shadow-sm sm:shadow-none w-full gap-4 sm:gap-0 group"
                  id={`flow-step-${step.number}`}
                >
                  {/* Round Badge Number component */}
                  <div className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 rounded-full bg-white border-4 border-secondary flex items-center justify-center font-display font-black text-lg sm:text-xl text-secondary shadow-md group-hover:bg-secondary group-hover:text-white transition-all duration-300 sm:mb-4 transform group-hover:scale-105">
                    {step.number}
                  </div>

                  {/* Step Description wrapper */}
                  <div className="flex-1 sm:w-full sm:bg-white px-3 sm:px-4 py-1 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold text-on-surface sm:shadow-sm sm:border sm:border-rose-50 group-hover:border-secondary/20 group-hover:shadow-md transition-all leading-relaxed sm:leading-tight">
                    {step.title}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
