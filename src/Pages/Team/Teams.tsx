import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Boxes, Users } from 'lucide-react'
import { useState } from 'react'
import TeamsView from './TeamsView'
import { theme } from '@/theme'

const Teams = () => {
    const [tabIndex,settabIndex] = useState(0)
  return (
    <div className="p-5">
      <div className="px-[2vw] py-[3vh] flex">
        <h3 className="text-gray-400 text-1xl md:text-3xl">Teams</h3>
      </div>
      
      <div className="bg-white w-full px-[2vw] py-[3vw] rounded-3xl">
      <div className="flex h-6 items-center text-sm">
            <Separator orientation="vertical" />
            <Button variant={tabIndex==0?'default':'ghost'} style={tabIndex==0?{background:theme.colors.primary[8]}:{}} onClick={()=>settabIndex(0)} className='mx-2 w-[150px]'>Teams <Users /> </Button>
            <Separator orientation="vertical" />
            <Button variant={tabIndex==1?'default':'ghost'} style={tabIndex==1?{background:theme.colors.primary[8]}:{}} onClick={()=>settabIndex(1)} className='mx-2 w-[150px]'>Work Groups <Boxes /></Button>
            <Separator orientation="vertical" />
        </div>
        <Separator orientation='horizontal' className='mt-3'/>
        <br />
        <br />
        {
            tabIndex==0?
            (<TeamsView/>):
            ''
        }
      </div>
    </div>
  )
}

export default Teams