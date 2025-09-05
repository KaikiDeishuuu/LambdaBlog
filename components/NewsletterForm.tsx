// src/components/NewsletterForm.tsx
'use client'

import { useState } from 'react'

const LoadingSpinner = () => (
  <svg
    className="h-5 w-5 animate-spin text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
)

const NewsletterForm = () => {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const subscribe = async (e) => {
    e.preventDefault()
    if (!email) return
    setState('loading')
    setMessage('')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message || '订阅失败，请稍后再试。')
      }
      setState('success')
      setMessage('感谢订阅！请查收您的确认邮件。')
      setTimeout(() => {
        setEmail('')
        setState('idle')
        setMessage('')
      }, 3000)
    } catch (error) {
      setState('error')
      setMessage(error.message)
    }
  }

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100">
        Subscribe to our Newsletter
      </h2>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Get the latest articles and updates delivered to your inbox.
      </p>
      <form className="mt-4" onSubmit={subscribe}>
        {/* --- 关键修复: 添加了响应式类，让表单元素在手机上垂直堆叠 --- */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-grow">
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="peer block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 transition-colors duration-200 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 focus:outline-none dark:border-gray-700 dark:bg-transparent dark:text-gray-100"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              htmlFor="email-address"
              className="absolute top-2 left-4 origin-[0] -translate-y-4 scale-75 cursor-text text-gray-500 transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-teal-600 dark:text-gray-400"
            >
              Your email
            </label>
          </div>
          <button
            type="submit"
            disabled={state === 'loading'}
            // --- 关键修复: 让按钮在手机上全宽，在桌面恢复固定宽度 ---
            className="relative flex w-full shrink-0 items-center justify-center rounded-md border border-transparent bg-teal-600 px-5 py-2 font-medium text-white transition-all duration-200 ease-in-out hover:scale-105 hover:bg-teal-700 focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 focus:ring-offset-white focus:outline-none active:scale-100 disabled:cursor-not-allowed disabled:opacity-50 sm:w-32 dark:focus:ring-offset-gray-900"
          >
            {state === 'loading' ? <LoadingSpinner /> : 'Subscribe'}
          </button>
        </div>
      </form>
      {message && (
        <p className={`mt-2 text-sm ${state === 'error' ? 'text-red-500' : 'text-green-500'}`}>
          {message}
        </p>
      )}
    </div>
  )
}

export default NewsletterForm
