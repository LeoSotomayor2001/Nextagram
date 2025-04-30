import React from 'react'

export default function ActionsCommentsButtons() {
  return (
    <div className='flex gap-2 justify-end'>
          <button className='text-red-600 dark:text-red-400 cursor-pointer'>Eliminar</button>
          <button className='text-blue-500 dark:text-blue-300 cursor-pointer'>Editar</button>
    </div>
  )
}
