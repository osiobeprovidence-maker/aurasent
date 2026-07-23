import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ArrowRight, Chrome, ShieldCheck, ShoppingBag, User, X, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface LoginPageProps {
  onLogin: (role: string) => void;
  onCancel: () => void;
}

export default function LoginPage({ onLogin, onCancel }: LoginPageProps) {
  const { signInWithEmail, signUpWithEmail, signInWithGoogle, isOwner } = useAuth();
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithGoogle();
      onLogin(isOwner ? 'owner' : 'user');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isSignUp) {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
      const role = email === 'riderezzy@gmail.com' ? 'owner' : 'user';
      onLogin(role);
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-ivory flex items-center justify-center p-6 overflow-y-auto">
      <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] border border-charcoal rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] border border-charcoal rounded-full" />
      </div>

      <button 
        onClick={onCancel}
        className="absolute top-10 right-10 p-3 hover:text-gold transition-colors z-[210]"
      >
        <X size={24} />
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-10 rounded-[3rem] shadow-2xl relative z-10 border border-beige"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif tracking-[0.3em] uppercase mb-2">AuraScent</h1>
          <p className="text-[10px] tracking-[0.2em] uppercase text-gold font-bold">The Private Circle</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-xs text-center">
            {error}
          </div>
        )}

        <AnimatePresence mode="wait">
          {!showEmailForm ? (
            <motion.div 
              key="options"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <button 
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-4 py-4 px-8 border border-beige rounded-full text-xs uppercase tracking-[0.2em] hover:bg-beige transition-all group disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Chrome size={18} className="text-charcoal/60" />
                )}
                Continue with Google
              </button>

              <button 
                onClick={() => setShowEmailForm(true)}
                disabled={loading}
                className="w-full flex items-center justify-center gap-4 py-4 px-8 bg-charcoal text-white rounded-full text-xs uppercase tracking-[0.2em] hover:bg-gold transition-all disabled:opacity-50"
              >
                <Mail size={18} />
                Continue with Email
              </button>

              <p className="text-center text-[10px] text-charcoal/40 uppercase tracking-widest leading-relaxed mt-8">
                By entering the circle, you agree to our <br />
                <a href="#" className="underline hover:text-gold transition-colors">Privacy Terms</a> and <a href="#" className="underline hover:text-gold transition-colors">House Rules</a>.
              </p>
            </motion.div>
          ) : (
            <motion.div 
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <button 
                onClick={() => setShowEmailForm(false)}
                className="text-[9px] uppercase tracking-[0.2em] text-gold font-bold mb-8 flex items-center gap-2 hover:translate-x-[-4px] transition-transform"
              >
                <ArrowRight size={12} className="rotate-180" /> Back to Selection
              </button>

              <h2 className="text-2xl font-serif mb-8">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && (
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    className="checkout-input" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                  />
                )}
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="checkout-input" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="checkout-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-charcoal text-white py-4 rounded-full text-[10px] uppercase tracking-[0.2em] hover:bg-gold transition-all mt-4 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : null}
                  {isSignUp ? 'Join the Circle' : 'Enter the Circle'}
                </button>
              </form>

              <div className="mt-8 text-center">
                <button 
                  onClick={() => setIsSignUp(!isSignUp)}
                  disabled={loading}
                  className="text-[10px] uppercase tracking-[0.2em] text-charcoal/40 hover:text-gold transition-colors"
                >
                  {isSignUp ? 'Already a member? Sign In' : 'New to AuraScent? Create Account'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
