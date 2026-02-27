'use client'

import LeftPanel from '@/components/profile/Dashboard/left-panel'
import RightPanel from '@/components/profile/Dashboard/right-panel'
import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
    const [step, setStep] = useState(0)
    const { currentUser, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !currentUser) {
            router.push('/login')
        }
    }, [currentUser, loading, router])

    if (loading || !currentUser) {
        return null
    }

    return (
        <div className='flex flex-col md:flex-row gap-5 md:gap-8 p-4 md:p-6 min-h-screen'>

            {/* LEFT PANEL */}
            <div className='w-full md:w-[280px] lg:w-[320px]'>
                <LeftPanel step={step} setStep={setStep} />
            </div>

            {/* RIGHT PANEL */}
            <div className='flex-1 overflow-auto'>
                <RightPanel setStep={setStep} step={step} />
            </div>

        </div>
    )
}