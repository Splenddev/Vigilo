import React, { useState, useEffect } from 'react';
import {
  FaSignInAlt,
  FaQrcode,
  FaChartBar,
  FaBell,
  FaUsers,
  FaGraduationCap,
  FaCheckCircle,
  FaArrowRight,
  FaPlay,
  FaUserCheck,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaShieldAlt,
  FaFileDownload,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: FaQrcode,
      title: 'QR Code Check-ins',
      description: 'Students scan unique QR codes for instant marking',
    },
    {
      icon: FaChartBar,
      title: 'Real-time Analytics',
      description: 'Track attendance trends and export reports',
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Location Verification',
      description: 'Confirm check-ins with live geo-location',
    },
    {
      icon: FaCalendarAlt,
      title: 'Class Scheduling',
      description: 'Manage recurring sessions with automated reminders',
    },
    {
      icon: FaFileDownload,
      title: 'Export Records',
      description: 'Download attendance data as PDF or CSV',
    },
    {
      icon: FaShieldAlt,
      title: 'Policy Support',
      description: 'Customize rules to match your institution’s policy',
    },
  ];

  const stats = [
    { number: '50K+', label: 'Students Tracked' },
    { number: '500+', label: 'Educational Institutions' },
    { number: '99.9%', label: 'Accuracy Rate' },
    { number: '24/7', label: 'Support Available' },
  ];

  const testimonials = [
    {
      quote:
        'Vigilo transformed our attendance management. What used to take hours now happens in minutes.',
      author: 'Dr. Sarah Johnson',
      role: 'Academic Director, Stanford University',
    },
    {
      quote:
        'The analytics features help us identify at-risk students early and provide timely support.',
      author: 'Prof. Michael Chen',
      role: 'Department Head, MIT',
    },
    {
      quote:
        "Students love the QR code system - it's fast, reliable, and eliminates manual errors.",
      author: 'Lisa Rodriguez',
      role: 'Registrar, UC Berkeley',
    },
  ];

  const benefits = [
    'Save time on roll calls',
    'Reduce paperwork',
    'Mark attendance instantly',
    'Improve record accuracy',
    'Export attendance reports',
    'Simple for students to use',
  ];

  return (
    <div className="">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute -bottom-32 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 mb-8 text-sm font-medium text-purple-300 bg-purple-900/50 rounded-full border border-purple-700/50 backdrop-blur-sm">
              <FaGraduationCap className="w-4 h-4 mr-2" />
              Trusted by 500+ Educational Institutions
            </div>

            <h1 className="text-5xl font-bold text-white sm:text-6xl lg:text-7xl">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Vigilo
              </span>
            </h1>

            <p className="max-w-3xl mx-auto mt-6 text-xl text-gray-300 sm:text-2xl">
              The smarter way to manage class attendance with cutting-edge
              technology, real-time insights, and seamless integration.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 mt-10 sm:flex-row">
              <button
                className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white btn-primary rounded-xl shadow-2xl hover:shadow-purple-500/25"
                onClick={() => navigate(user ? `/${user?.role}` : '/auth')}>
                <FaSignInAlt className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                {user ? 'Proceed to dashboard' : 'Get Started Free'}
                <div className="absolute inset-0 bg-white/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              <button className="group inline-flex items-center px-8 py-4 text-lg font-semibold text-white border-2 border-purple-500/50 rounded-xl hover:border-purple-400 hover:bg-purple-500/10 transition-all duration-200">
                <FaPlay className="w-4 h-4 mr-2" />
                Watch Demo
                <FaArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-8 mt-12 text-gray-400">
              <div className="text-sm">No setup stress</div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="text-sm">Runs on any device</div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="text-sm">Pay only when you use it</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-black/30 backdrop-blur-sm">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center">
                <div className="text-4xl font-bold text-white lg:text-5xl">
                  {stat.number}
                </div>
                <div className="mt-2 text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        data-animate
        className="py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white sm:text-5xl">
              Powerful Features for Modern Education
            </h2>
            <p className="max-w-2xl mx-auto mt-6 text-xl text-gray-300">
              Everything you need to streamline attendance management and boost
              student engagement
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 ${
                  isVisible.features ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}>
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-4 text-2xl font-semibold text-white text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        id="benefits"
        data-animate
        className="py-24 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white sm:text-5xl mb-6">
                Why Choose Vigilo?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of educators who have revolutionized their
                attendance management with our comprehensive solution.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3">
                    <FaCheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-2xl opacity-20"></div>
              <div className="relative p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <FaUsers className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">
                      Live Dashboard
                    </div>
                    <div className="text-gray-400 text-sm">
                      Real-time attendance tracking
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-300">Computer Science 101</span>
                    <span className="text-green-400">98% Present</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-300">Mathematics 201</span>
                    <span className="text-yellow-400">85% Present</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-300">Physics 301</span>
                    <span className="text-green-400">92% Present</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white sm:text-5xl mb-6">
              Trusted by Educators Worldwide
            </h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentTestimonial * 100}%)`,
                }}>
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 p-12 text-center">
                    <blockquote className="text-2xl font-medium text-white mb-8">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="text-gray-400">
                      <div className="font-semibold text-white">
                        {testimonial.author}
                      </div>
                      <div>{testimonial.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial
                      ? 'bg-purple-500'
                      : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white sm:text-5xl mb-6">
            Ready to Transform Your Attendance Management?
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-purple-100 mb-10">
            Join thousands of institutions already using Vigilo to streamline
            their processes and improve student outcomes.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="group inline-flex items-center px-8 py-4 text-lg font-semibold text-purple-600 bg-white rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-2xl">
              <FaSignInAlt className="w-5 h-5 mr-2" />
              Start Your Free Trial
            </button>
            <button className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/50 rounded-xl hover:border-white hover:bg-white/10 transition-all duration-200">
              Schedule Demo
              <FaArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
