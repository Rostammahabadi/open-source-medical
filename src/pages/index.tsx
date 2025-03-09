import { Hero } from '@/components/features/home/Hero';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>CostCure - Transparent Healthcare Costs</title>
        <meta
          name="description"
          content="Upload and compare real hospital bills to find the best prices on medical procedures."
        />
      </Head>
      <main>
        <Hero />
      </main>
    </>
  );
}
