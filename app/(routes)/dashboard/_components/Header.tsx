import { Button } from '@/components/ui/button';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Search, Send } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function Header() {
    const { user }: any = useKindeBrowserClient();
    return (
        <div className='flex justify-end w-full gap-4 items-center bg-gray-900 p-3'>
            {/* Search Input */}
            <div className='flex gap-2 items-center border border-gray-600 rounded-md p-1 bg-gray-800 text-gray-300'>
  <Search className='h-4 w-4 text-gray-400' />
  <input 
    type='text' 
    placeholder='Search'
    className='bg-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm placeholder-gray-400'
  />
</div>


            {/* User Image */}
            <div>
                <Image
                    // src={user?.picture || '/default-avatar.png'}
                    src='/img.png'
                    alt='user'
                    width={30}
                    height={30}
                    className='rounded-full border border-gray-500'
                />
            </div>

            {/* Invite Button */}
            <Button 
                className='flex gap-2 items-center text-sm h-8 bg-yellow-600 hover:bg-yellow-500 transition duration-300 text-white px-3 py-1 rounded-md'
            >
                <Send className='h-4 w-4' /> Invite
            </Button>
        </div>
    )
}

export default Header;
