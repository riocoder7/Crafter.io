import { Button } from '@/components/ui/button'
import { Link, Save } from 'lucide-react'
import Image from 'next/image'
import React from 'react'




function WorkspaceHeader({onSave}:any) {
  return (
    <div className='p-3 border-b flex justify-between items-center'>
      <div className='flex gap-2 items-center'>
      <Image
                    // src={user?.picture || '/default-avatar.png'}
                    src='/img.png'
                    alt='user'
                    width={30}
                    height={30}
                    className='rounded-full border border-gray-500'
                />
          <h1 className='
  h-8 
  text-[20px]
  gap-2 
  bg-[hsl(220,40%,8%)] 
  hover:bg-[hsl(220,40%,12%)] 
  rounded-s-sm 
  border 
  border-transparent
  text-white 
  font-bold 
  px-2
  flex 
  items-center
'>
  <strong>File Name</strong>
</h1>

        
       
      </div>
      <div className='flex items-center gap-4'>
        <Button className='h-8 text-[12px]
        gap-2 bg-yellow-500 hover:bg-yellow-600'
        onClick={()=>onSave()}
        > 
        <Save className='h-4 w-4' /> Save </Button>
        <Button className='h-8 text-[12px]
        gap-2 bg-blue-600 hover:bg-blue-700'>
          Share <Link className='h-4 w-4' /> </Button>
      </div>
    </div>
  )
}

export default WorkspaceHeader