import React from 'react'

export default function ButtonHidden() {
  return (
    <>
    <a href="">
            <img src="/asset/icon-account.png" alt="Logo"  className="w-20" />
    </a>  
    <a href={"register"}  className="px-3 py-2 bg-blue-light rounded-3xl ml-4 hover:text-neutral-50 hidden">Đăng xuất</a>
    </>
  )
}
