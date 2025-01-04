import React from 'react'

const Footer = () => {
  return (
   <footer className='py-6 md:px-8 md:py-0 text-white bg-black border-t border-gray-800'>
    <div className='flex flex-col items-center justify-center md:flex-row gap-4 md:h-24'>
        <p className='text-sm md:text-left text-center text-balance leading-loose'>
            Built by {" "}
            <a href="https://github.com/Mohad-Ali" target='_blank' className='font-medium underline underline-offset-4'>md_ali</a>
            . The source code is available on {" "}
            <a href="https://github.com/Mohad-Ali" target='_blank' rel="noreferrer" className='font-medium underline underline-offset-4'> Github</a>
            .
        </p>
    </div>
   </footer>
  )
}

export default Footer
