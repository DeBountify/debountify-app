"use client"
import React from 'react'
import { Icon } from '@iconify/react';

// icons website https://icon-sets.iconify.design/
const IconTemplate = ({icon}) => {
  return (
    <div>
        <Icon className='text-5xl text-red-500' icon={icon} />
    </div>
  )
}

export default IconTemplate