'use client'

import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import Modal from '../general/Modal'
import NewDestinationForm from './NewDestinationForm'
import { useDestinationStore } from '@/lib/Stores/destinationStore'

export default function AddNewDestinationButton() {
  const { showAddNewDestinationModal, setShowNewDestinationModal } = useDestinationStore()
  return (
    <main>
      <div className="bg-blue-600 text-white flex p-1 px-3 rounded hover:cursor-pointer hover:bg-blue-800 items-center" onClick={() => setShowNewDestinationModal(true)}>
        <Plus /> add new
      </div>
      <Modal isVisible={showAddNewDestinationModal} onClose={() => setShowNewDestinationModal(false)}>
        <NewDestinationForm />
      </Modal>
    </main>
  )
}
