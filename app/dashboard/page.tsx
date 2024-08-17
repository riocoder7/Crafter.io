"use client"

import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs'
import React from 'react'

function page() {
  return (
    <div>DashBoard
<LogoutLink>
<button>Logout</button>
</LogoutLink>
    </div>
  )
}   

export default page