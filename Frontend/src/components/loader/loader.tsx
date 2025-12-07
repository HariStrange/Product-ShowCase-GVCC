import { LucideLoader } from 'lucide-react'
function Loader() {
  return (
    <div className='min-h-[70vh] flex items-center justify-center'>
        <LucideLoader className='mx-auto mt-10 h-8 w-8 animate-spin text-primary' />
    </div>
  )
}

export default Loader