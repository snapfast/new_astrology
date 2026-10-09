'use client';

import React from 'react';
import { SPECIALIZED_SERVICES } from '@/lib/consultations';
import { SOCIAL_PROFILES } from '@/lib/social-data';
import Script from 'next/script';

export default function AboutClient() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 md:space-y-16">
      {/* Practitioner Bio & Mantra Block */}
      <div className="bg-white border border-outline/20 shadow-sm rounded-3xl p-8 md:p-12 text-center space-y-8">
        <div className="prose prose-lg max-w-2xl mx-auto font-body text-on-surface leading-relaxed space-y-4">
          <p className="text-base md:text-lg text-on-surface/90">
            Born into the{' '}
            <a
              href="https://en.wikipedia.org/wiki/Bali_clan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline font-medium hover:text-accent/80 transition-colors"
            >
              Bali family
            </a>
            {' '}in Ambala City, Rahul Bali was nurtured in classical Brahmin traditions from an early age. After completing his schooling in Ambala, he earned a double degree in engineering and has served as a software engineer at Google since 2018.
          </p>
          <p className="text-base md:text-lg text-on-surface/90">
            Blending contemporary analytical perspectives with timeless traditional wisdom, he finds continuous inspiration in traveling across India.
          </p>
          <p className="text-base md:text-lg text-on-surface/90">
            Pandit Rahul Bali Ji offers serene and practical life guidance through{' '}
            <strong className="text-on-surface font-semibold">Jyotish Shastra</strong>
            . His thoughtful approach harmonizes classical astrology with gentle psychological insight, helping individuals understand deep-rooted thinking patterns, navigate life with clarity, and cultivate inner harmony.
          </p>
        </div>
        <div className="pt-6 border-t border-outline/10 text-xl md:text-2xl text-accent font-hindi tracking-wide">
          ॥ ॐ नमो भगवते वासुदेवाय नमः ॥
        </div>
      </div>

      {/* Specialized Services List Card */}
      <div className="bg-white border border-outline/20 shadow-sm rounded-3xl p-8 md:p-12 space-y-8">
        <div className="text-center">
          <h2 className="text-xs md:text-sm font-medium uppercase text-accent font-label tracking-[0.25em]">
            Specialized Services
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 text-center">
          {SPECIALIZED_SERVICES.map((service) => (
            <p
              key={service.id}
              className="text-sm md:text-base font-medium text-on-surface/90 py-1"
            >
              {service.title}
            </p>
          ))}
        </div>
      </div>
      {/* Featured on Instagram */}
      <div className="bg-white border border-outline/20 shadow-sm rounded-3xl p-8 md:p-12 space-y-6 flex flex-col items-center">
        <div className="text-center">
          <h2 className="text-xs md:text-sm font-medium uppercase text-accent font-label tracking-[0.25em]">
            Featured on Instagram
          </h2>
        </div>
        <div className="w-full flex flex-col gap-6 justify-center items-center">
          <blockquote
            className="instagram-media"
            data-instgrm-captioned
            data-instgrm-permalink="https://www.instagram.com/reel/DUvQh7vidZS/?utm_source=ig_embed&amp;utm_campaign=loading"
            data-instgrm-version="14"
            style={{
              background: '#FFF',
              border: 0,
              borderRadius: '3px',
              boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
              margin: '1px',
              maxWidth: '540px',
              minWidth: '326px',
              padding: 0,
              width: '99.375%',
            }}
          >
            <div style={{ padding: '16px' }}>
              <a
                href="https://www.instagram.com/reel/DUvQh7vidZS/?utm_source=ig_embed&amp;utm_campaign=loading"
                style={{
                  background: '#FFFFFF',
                  lineHeight: 0,
                  padding: '0 0',
                  textAlign: 'center',
                  textDecoration: 'none',
                  width: '100%',
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', flexGrow: 0, height: '40px', marginRight: '14px', width: '40px' }}></div>
                  <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>
                    <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', marginBottom: '6px', width: '100px' }}></div>
                    <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', width: '60px' }}></div>
                  </div>
                </div>
                <div style={{ padding: '19% 0' }}></div>
                <div style={{ display: 'block', height: '50px', margin: '0 auto 12px', width: '50px' }}>
                  <svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                      <g transform="translate(-511.000000, -20.000000)" fill="#000000">
                        <g>
                          <path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
                <div style={{ paddingTop: '8px' }}>
                  <div style={{ color: '#3897f0', fontFamily: 'Arial,sans-serif', fontSize: '14px', fontStyle: 'normal', fontWeight: 550, lineHeight: '18px' }}>
                    View this post on Instagram
                  </div>
                </div>
                <div style={{ padding: '12.5% 0' }}></div>
                <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '14px', alignItems: 'center' }}>
                  <div>
                    <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', height: '12.5px', width: '12.5px', transform: 'translateX(0px) translateY(7px)' }}></div>
                    <div style={{ backgroundColor: '#F4F4F4', height: '12.5px', transform: 'rotate(-45deg) translateX(3px) translateY(1px)', width: '12.5px', flexGrow: 0, marginRight: '14px', marginLeft: '2px' }}></div>
                    <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', height: '12.5px', width: '12.5px', transform: 'translateX(9px) translateY(-18px)' }}></div>
                  </div>
                  <div style={{ marginLeft: '8px' }}>
                    <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', flexGrow: 0, height: '20px', width: '20px' }}></div>
                    <div style={{ width: 0, height: 0, borderTop: '2px solid transparent', borderLeft: '6px solid #f4f4f4', borderBottom: '2px solid transparent', transform: 'translateX(16px) translateY(-4px) rotate(30deg)' }}></div>
                  </div>
                  <div style={{ marginLeft: 'auto' }}>
                    <div style={{ width: 0, borderTop: '8px solid #F4F4F4', borderRight: '8px solid transparent', transform: 'translateY(16px)' }}></div>
                    <div style={{ backgroundColor: '#F4F4F4', flexGrow: 0, height: '12px', width: '16px', transform: 'translateY(-4px)' }}></div>
                    <div style={{ width: 0, height: 0, borderTop: '8px solid #F4F4F4', borderLeft: '8px solid transparent', transform: 'translateY(-4px) translateX(8px)' }}></div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center', marginBottom: '24px' }}>
                  <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', marginBottom: '6px', width: '224px' }}></div>
                  <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', width: '144px' }}></div>
                </div>
              </a>
              <p style={{ color: '#c9c8cd', fontFamily: 'Arial,sans-serif', fontSize: '14px', lineHeight: '17px', marginBottom: 0, marginTop: '8px', overflow: 'hidden', padding: '8px 0 7px', textAlign: 'center', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <a href="https://www.instagram.com/reel/DUvQh7vidZS/?utm_source=ig_embed&amp;utm_campaign=loading" style={{ color: '#c9c8cd', fontFamily: 'Arial,sans-serif', fontSize: '14px', fontStyle: 'normal', fontWeight: 'normal', lineHeight: '17px', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
                  A post shared by Bali Astrology (@baliastrology)
                </a>
              </p>
            </div>
          </blockquote>
        </div>
        <Script src="https://www.instagram.com/embed.js" strategy="afterInteractive" />
      </div>



      {/* Featured on Threads */}
      <div className="bg-white border border-outline/20 shadow-sm rounded-3xl p-8 md:p-12 space-y-6 flex flex-col items-center">
        <div className="text-center">
          <h2 className="text-xs md:text-sm font-medium uppercase text-accent font-label tracking-[0.25em]">
            Featured on Threads
          </h2>
        </div>
        <div className="w-full flex flex-col gap-6 justify-center items-center">
          <blockquote
            className="text-post-media"
            data-text-post-permalink="https://www.threads.com/@baliastrology/post/Dd2CG6YE1Qm"
            data-text-post-version="0"
            id="ig-tp-Dd2CG6YE1Qm"
            style={{
              background: '#FFF',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: '#00000026',
              borderRadius: '16px',
              maxWidth: '100%',
              margin: '1px',
              minWidth: '270px',
              padding: 0,
              width: '100%',
            }}
          >
            <a
              href="https://www.threads.com/@baliastrology/post/Dd2CG6YE1Qm"
              style={{
                background: '#FFFFFF',
                lineHeight: 0,
                padding: '0 0',
                textAlign: 'center',
                textDecoration: 'none',
                width: '100%',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'block', height: '32px', width: '32px', paddingBottom: '20px' }}>
                  <svg aria-label="Threads" height="32px" role="img" viewBox="0 0 192 192" width="32px" xmlns="http://www.w3.org/2000/svg">
                    <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z" />
                  </svg>
                </div>
                <div style={{ fontSize: '15px', lineHeight: '21px', color: '#000000', fontWeight: 600 }}>
                  View on Threads
                </div>
              </div>
            </a>
          </blockquote>
          <blockquote
            className="text-post-media"
            data-text-post-permalink="https://www.threads.com/@baliastrology/post/Da5t2Y2j-S_"
            data-text-post-version="0"
            id="ig-tp-Da5t2Y2j-S_"
            style={{
              background: "#FFF",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "#00000026",
              borderRadius: "16px",
              maxWidth: "100%",
              margin: "1px",
              minWidth: "270px",
              padding: 0,
              width: "100%",
            }}
          >
            <a
              href="https://www.threads.com/@baliastrology/post/Da5t2Y2j-S_"
              style={{
                background: "#FFFFFF",
                lineHeight: 0,
                padding: "0 0",
                textAlign: "center",
                textDecoration: "none",
                width: "100%",
                fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div style={{ padding: "40px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ display: "block", height: "32px", width: "32px", paddingBottom: "20px" }}>
                  <svg aria-label="Threads" height="32px" role="img" viewBox="0 0 192 192" width="32px" xmlns="http://www.w3.org/2000/svg">
                    <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z" />
                  </svg>
                </div>
                <div style={{ fontSize: "15px", lineHeight: "21px", color: "#000000", fontWeight: 600 }}>
                  View on Threads
                </div>
              </div>
            </a>
          </blockquote>
          <blockquote
            className="text-post-media"
            data-text-post-permalink="https://www.threads.com/@baliastrology/post/DbnbWEbDw6u"
            data-text-post-version="0"
            id="ig-tp-DbnbWEbDw6u"
            style={{
              background: '#FFF',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: '#00000026',
              borderRadius: '16px',
              maxWidth: '100%',
              margin: '1px',
              minWidth: '270px',
              padding: 0,
              width: '100%',
            }}
          >
            <a
              href="https://www.threads.com/@baliastrology/post/DbnbWEbDw6u"
              style={{
                background: '#FFFFFF',
                lineHeight: 0,
                padding: '0 0',
                textAlign: 'center',
                textDecoration: 'none',
                width: '100%',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'block', height: '32px', width: '32px', paddingBottom: '20px' }}>
                  <svg aria-label="Threads" height="32px" role="img" viewBox="0 0 192 192" width="32px" xmlns="http://www.w3.org/2000/svg">
                    <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z" />
                  </svg>
                </div>
                <div style={{ fontSize: '15px', lineHeight: '21px', color: '#000000', fontWeight: 600 }}>
                  View on Threads
                </div>
              </div>
            </a>
          </blockquote>
        </div>
        <Script src="https://www.threads.com/embed.js" strategy="afterInteractive" />
      </div>

      {/* Email & Social Links Card */}
      <div className="bg-white border border-outline/20 shadow-sm rounded-3xl p-8 md:p-12 text-center space-y-10">
        <div className="space-y-3">
          <h2 className="text-xs md:text-sm font-medium uppercase text-accent font-label tracking-[0.25em]">
            Email Address
          </h2>
          <a
            href="mailto:rahulbaliastrology@gmail.com"
            className="text-xl md:text-2xl font-body font-medium text-on-surface hover:text-accent transition-colors inline-block"
          >
            rahulbaliastrology@gmail.com
          </a>
        </div>

        <div className="space-y-6 pt-8 border-t border-outline/10">
          <h2 className="text-xs md:text-sm font-medium uppercase text-accent font-label tracking-[0.25em]">
            Online Presence
          </h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <a
              href={SOCIAL_PROFILES.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border border-outline/20 bg-surface-bright flex items-center justify-center text-[#E1306C] hover:bg-[#E1306C] hover:border-[#E1306C] hover:text-white transition-all duration-300 text-2xl shadow-sm fill-current"
              aria-label="Instagram"
            >
              <svg className="w-6 h-6" viewBox="0 0 448 512">
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
              </svg>
            </a>
            <a
              href={SOCIAL_PROFILES.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border border-outline/20 bg-surface-bright flex items-center justify-center text-[#FF0000] hover:bg-[#FF0000] hover:border-[#FF0000] hover:text-white transition-all duration-300 text-2xl shadow-sm fill-current"
              aria-label="YouTube"
            >
              <svg className="w-6 h-6" viewBox="0 0 576 512">
                <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
              </svg>
            </a>
            <a
              href={SOCIAL_PROFILES.threads}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border border-outline/20 bg-surface-bright flex items-center justify-center text-[#000000] hover:bg-[#000000] hover:border-[#000000] hover:text-white transition-all duration-300 text-2xl shadow-sm fill-current"
              aria-label="Threads"
            >
              <svg className="w-6 h-6" viewBox="0 0 448 512">
                <path d="M331.5 235.7c-2.5 0-5.1.2-7.6.6-.4-3-.9-6-1.6-8.9-13.3-60.7-68.8-103.8-131-97.1-50.5 5.5-91.8 42.2-101.3 92.4-11.3 59.8 23 118.8 81.2 136 32.1 9.5 66.8 4 93.4-14.8 22.8-16.1 38.3-40.8 42.8-68.3 10.7 1.8 21.6 1.9 32.3-.3 13.9-2.9 27-9.5 37.8-19 23.3-20.5 35.8-51.3 33.7-82.6-3.8-57.1-43.2-105.1-98.3-119.8-70.1-18.7-144 18.5-172.5 83.2-24.8 56.4-11.3 123.8 32.5 166.7 40.2 39.4 99 53.6 153.2 37.1 23.8-7.3 45.7-20.5 63.8-38.3l23.5 23.5c-22.8 22.4-50.5 38.8-80.7 48-67.9 20.7-141.7 2.9-192.1-46.5C8 387 -9 302.2 22 231.6 57.6 150.6 150 104 237.7 127.4c69.1 18.4 118.5 78.5 123.2 150 2.6 39.3-13.1 78.1-42.3 103.8-13.7 12.1-30.3 20.5-48 24.2-17.7 3.7-36.1 2.5-53.3-3.4 3.7-18.9 1-38.6-7.8-55.8zm-105.8 52.4c-30.4 0-55.1-24.7-55.1-55.1s24.7-55.1 55.1-55.1 55.1 24.7 55.1 55.1-24.7 55.1-55.1 55.1z"/>
              </svg>
            </a>
            <a
              href={SOCIAL_PROFILES.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border border-outline/20 bg-surface-bright flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white transition-all duration-300 text-2xl shadow-sm fill-current"
              aria-label="Facebook"
            >
              <svg className="w-6 h-6" viewBox="0 0 320 512">
                <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V137.9c0-25.7 12.6-50.8 53-50.8h41V3.2S252.7 0 215.5 0C138 0 88 47.1 88 132.1v69.4H0v97.8h80z"/>
              </svg>
            </a>
            <a
              href={SOCIAL_PROFILES.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border border-outline/20 bg-surface-bright flex items-center justify-center text-[#0A66C2] hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white transition-all duration-300 text-2xl shadow-sm fill-current"
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6" viewBox="0 0 448 512">
                <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/>
              </svg>
            </a>
            <a
              href={SOCIAL_PROFILES.tumblr}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border border-outline/20 bg-surface-bright flex items-center justify-center text-[#36465D] hover:bg-[#36465D] hover:border-[#36465D] hover:text-white transition-all duration-300 text-2xl shadow-sm fill-current"
              aria-label="Tumblr"
            >
              <svg className="w-6 h-6" viewBox="0 0 320 512">
                <path d="M309.8 480.3c-13.6 14.5-35.8 25.1-66.3 31.7-28.1 6.1-58.1 3.5-84.7-7.6-32.9-13.7-52.1-43.2-52.1-85.8V232H54.1c-14.8 0-26.8-12-26.8-26.8v-72.3c0-14.8 12-26.8 26.8-26.8 27.6 0 51.5-12.7 67.2-34.1 14.4-19.6 22.8-44.5 24.6-71.1C146.5 8.9 156.4 0 168.6 0h78.3c14.8 0 26.8 12 26.8 26.8v106.3h80.1c14.8 0 26.8 12 26.8 26.8v72.3c0 14.8-12 26.8-26.8 26.8h-80.1v151.7c0 17.8 4.2 29.8 12.8 36.2 8.3 6.1 20.3 8.3 36.3 6.6 15.6-1.7 30.6-6.7 44.1-14.7 12.8-7.6 29.2-3.1 36.8 9.7l32.1 53.8c7.7 12.7 3.3 29.2-9.6 36.8z"/>
              </svg>
            </a>
            <a
              href={SOCIAL_PROFILES.reddit}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border border-outline/20 bg-surface-bright flex items-center justify-center text-[#FF4500] hover:bg-[#FF4500] hover:border-[#FF4500] hover:text-white transition-all duration-300 text-2xl shadow-sm fill-current"
              aria-label="Reddit"
            >
              <svg className="w-6 h-6" viewBox="0 0 512 512">
                <path d="M440.3 203.5c-15 0-28.2 6.2-37.9 15.9-35.7-24.7-83.8-40.6-137.1-42.3l23.3-109.7 76.1 16.2c.8 19.3 16.6 34.6 36.1 34.6 20 0 36.3-16.3 36.3-36.3s-16.3-36.3-36.3-36.3c-13.3 0-25 7.2-31.3 18l-84.5-18c-3.6-.8-7.3.3-9.9 2.8s-3.7 6.2-3 9.9l-25.7 120.9c-54.7 1.4-103.8 17.3-139.8 42.3-9.7-9.7-22.9-15.9-37.9-15.9-29.5 0-53.5 24-53.5 53.5 0 20.2 11.2 37.8 27.8 47-1.1 6.3-1.7 12.8-1.7 19.3 0 98.2 111.9 178 250 178s250-79.8 250-178c0-6.6-.6-13-1.7-19.3 16.5-9.2 27.8-26.8 27.8-47 0-29.5-24-53.5-53.5-53.5zM170.1 285.8c14.2 0 25.7 11.5 25.7 25.7s-11.5 25.7-25.7 25.7-25.7-11.5-25.7-25.7 11.5-25.7 25.7-25.7zm171.8 120.7c-26.7 26.7-77 26.7-103.7 0-5-5-5-13.1 0-18.1 5-5 13.1-5 18.1 0 16.8 16.8 50.7 16.8 67.5 0 5-5 13.1-5 18.1 0 5 5 5 13.1 0 18.1zm-8.1-69.3c-14.2 0-25.7-11.5-25.7-25.7s11.5-25.7 25.7-25.7 25.7 11.5 25.7 25.7-11.5 25.7-25.7 25.7z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
