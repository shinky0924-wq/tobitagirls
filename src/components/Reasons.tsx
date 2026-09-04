/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { SiteContent } from '../siteContent';
import LucideIcon from './LucideIcon';

interface ReasonsProps {
  content: SiteContent['reasons'];
}

const REASON_IMAGES: Record<string, string> = {
  '01': '/images/reason_01_specialist_1788400820708.jpg',
  '02': '/images/reason_02_beginner_1788400835137.jpg',
  '03': '/images/reason_03_matching_1788400851218.jpg',
  '04': '/images/reason_04_linechat_1788400866609.jpg',
  '05': '/images/reason_05_interview_1788400881787.jpg',
  '06': '/images/reason_06_aftercare_1788400896748.jpg',
};

export default function Reasons({ content }: ReasonsProps) {
  return (
    <section className="py-20 bg-rose-50/10 relative overflow-hidden" id="reasons">
      {/* Decorative ambient blobs */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-rose-100/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-100/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1100px] mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-secondary font-display font-extrabold tracking-widest text-xs md:text-sm block mb-2 uppercase">
            {content.subtitle}
          </span>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl lg:text-4xl mb-4 text-on-surface">
            {content.title}
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-secondary to-rose-300 mx-auto rounded-full mt-4" />
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {content.items.map((reason, idx) => {
            const cardImg = REASON_IMAGES[reason.number] || '/images/tobita_beginner_support_1788153037569.jpg';
            return (
              <motion.div
                key={reason.number}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group flex flex-col bg-white rounded-[2rem] border border-rose-100/70 shadow-sm hover:shadow-xl hover:shadow-rose-100/40 transition-all duration-300 overflow-hidden"
                id={`reason-item-${reason.number}`}
              >
                {/* Visual Header Image */}
                <div className="relative w-full h-36 sm:h-40 overflow-hidden bg-rose-50">
                  <img
                    src={cardImg}
                    alt={reason.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
                  
                  {/* Floating Number Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-secondary font-display font-black text-xs px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1 border border-rose-100">
                    <span className="text-[10px] text-gray-400 font-bold">POINT</span>
                    <span>{reason.number}</span>
                  </div>

                  {/* Icon badge floating on bottom right */}
                  <div className="absolute -bottom-4 right-5 w-12 h-12 rounded-2xl bg-white border-2 border-rose-100 flex items-center justify-center text-secondary shadow-md group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                    <LucideIcon name={reason.iconName} size={22} />
                  </div>
                </div>

                {/* Content body */}
                <div className="p-6 pt-7 flex flex-col flex-1">
                  {/* Title */}
                  <h3 className="font-display font-bold text-base md:text-lg text-on-surface mb-2.5 group-hover:text-secondary transition-colors">
                    {reason.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
