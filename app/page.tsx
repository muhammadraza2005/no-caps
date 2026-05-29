import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, BadgeCheck } from "lucide-react";

export default function Home() {
  const brands = [
    { 
      name: "Nike", 
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
          <path d="M24 7.8L6.442 15.276c-1.456.616-2.679.925-3.668.925-1.12 0-1.933-.392-2.437-1.177-.317-.504-.41-1.143-.28-1.918.13-.775.476-1.6 1.036-2.478.467-.71 1.232-1.643 2.297-2.8a6.122 6.122 0 00-.784 1.848c-.28 1.195-.028 2.072.756 2.632.373.261.886.392 1.54.392.522 0 1.11-.084 1.764-.252L24 7.8z"/>
        </svg>
      ) 
    },
    { 
      name: "Adidas", 
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
          <path d="m24 19.535-8.697-15.07-4.659 2.687 7.145 12.383Zm-8.287 0L9.969 9.59 5.31 12.277l4.192 7.258ZM4.658 14.723l2.776 4.812H1.223L0 17.41Z"/>
        </svg>
      ) 
    },
    { 
      name: "New Era", 
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
          <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontWeight="900" fontSize="5.5" fontFamily="sans-serif" letterSpacing="-0.05em">NEW ERA</text>
        </svg>
      ) 
    },
    { 
      name: "Puma", 
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
          <path d="M23.845 3.008c-.417-.533-1.146-.106-1.467.08-2.284 1.346-2.621 3.716-3.417 5.077-.626 1.09-1.652 1.89-2.58 1.952-.686.049-1.43-.084-2.168-.405-1.807-.781-2.78-1.792-3.017-1.97-.487-.37-4.23-4.015-7.28-4.164 0 0-.372-.75-.465-.763-.222-.025-.45.451-.616.501-.15.053-.413-.512-.565-.487-.153.02-.302.586-.6.877-.22.213-.486.2-.637.463-.052.096-.034.265-.093.42-.127.32-.551.354-.555.697 0 .381.357.454.669.72.248.212.265.362.554.461.258.088.632-.187.964-.088.277.081.543.14.602.423.054.256 0 .658-.34.613-.112-.015-.598-.174-1.198-.11-.725.077-1.553.309-1.634 1.11-.041.447.514.97 1.055.866.371-.071.196-.506.399-.716.267-.27 1.772.944 3.172.944.593 0 1.031-.15 1.467-.605.04-.029.093-.102.155-.11a.632.632 0 01.195.088c1.131.897 1.984 2.7 6.13 2.721.582.007 1.25.279 1.796.777.48.433.764 1.125 1.037 1.825.418 1.053 1.161 2.069 2.292 3.203.06.068.99.78 1.06.833.012.01.084.167.053.255-.02.69-.123 2.67 1.365 2.753.366.02.275-.231.275-.41-.005-.341-.065-.685.113-1.04.253-.478-.526-.709-.509-1.756.019-.784-.645-.651-.984-1.25-.19-.343-.368-.532-.35-.946.073-2.38-.517-3.948-.805-4.327-.227-.294-.423-.403-.207-.54 1.24-.815 1.525-1.574 1.525-1.574.66-1.541 1.256-2.945 2.075-3.57.166-.12.589-.44.852-.56.763-.362 1.173-.578 1.388-.788.356-.337.635-1.053.294-1.48z"/>
        </svg>
      ) 
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-black via-gray-900 to-black text-white py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            {/* Main Headline */}
            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter mb-4 leading-tight">
                NO CAPS
              </h1>
              <p className="text-xl sm:text-2xl text-gray-300 font-light max-w-2xl mx-auto">
                Pakistan's most authentic collection of premium caps(Trust me bro). From Nike to Adidas, we've got the best.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition transform hover:scale-105"
              >
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#brands"
                className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-black transition"
              >
                Explore Brands
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300 pt-8">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-white" /> 100% Authentic
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-6 h-6 text-white" /> Fast Delivery
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-6 h-6 text-white" /> Money Back
              </div>
            </div>
          </div>
        </div>

        {/* Background accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </section>

      {/* Brands Section */}
      <section id="brands" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Trusted Brands
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Shop from the world's most iconic cap brands, all authenticated and verified.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {brands.map((brand) => (
            <Link
              key={brand.name}
              href={`/products?brand=${brand.name.toLowerCase()}`}
              className="group relative overflow-hidden rounded-xl bg-gray-100 aspect-square flex items-center justify-center hover:shadow-xl transition-all hover:scale-105"
            >
              <div className="text-center space-y-3 flex flex-col items-center">
                <div className="text-black flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {brand.svg}
                </div>
                <h3 className="font-bold text-lg">{brand.name}</h3>
              </div>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition"></div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-black text-white rounded-full flex items-center justify-center">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-xl">100% Authentic</h3>
              <p className="text-gray-600">
                Every cap is verified authentic. No counterfeits, ever.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-black text-white rounded-full flex items-center justify-center">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-xl">Fast Shipping</h3>
              <p className="text-gray-600">
                Order today, delivered in 2-3 days across Pakistan.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-black text-white rounded-full flex items-center justify-center">
                <BadgeCheck className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-xl">Satisfaction Guaranteed</h3>
              <p className="text-gray-600">
                Not happy? 30-day money back guarantee, no questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
            Ready to find your perfect cap?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Browse our complete collection of Nike, Adidas, and premium branded caps.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition transform hover:scale-105"
          >
            Start Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}