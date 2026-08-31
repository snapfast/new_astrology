"use client";

import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ExploreTools from "@/components/ExploreTools";
import KPHoraryGeneration from "@/components/KPHoraryGeneration";

export default function KPHoraryClientPage() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <PageHeader
        title="KP Prashna Kundli"
        description="Cast a Horary chart based on Krishnamurti Paddhati (KP) using a number from 1 to 249."
      />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Suspense fallback={<div className="p-8 text-center">Loading form...</div>}>
            <KPHoraryGeneration />
          </Suspense>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-surface">
        <ExploreTools currentPath="/kp-horary" />
      </section>

      <Footer />
    </main>
  );
}