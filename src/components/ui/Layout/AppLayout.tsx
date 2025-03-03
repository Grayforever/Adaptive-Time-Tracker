import  { ReactNode } from 'react'
import { SidebarProvider } from '../sidebar'
import AppSideBar from './AppSideBar'


const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
         <SidebarProvider defaultOpen={true}>
            <AppSideBar />
            {/* {showSideBar?(<AppSideBar />):''} */}
            <main className='w-full'>
            {children}
            </main>
    </SidebarProvider>
  )
}

export default AppLayout