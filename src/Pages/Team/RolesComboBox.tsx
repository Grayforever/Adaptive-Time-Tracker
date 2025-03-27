import React, { BaseSyntheticEvent, useEffect, useState } from 'react'
import { Button } from '../../components/ui/button'
import { Separator } from '../../components/ui/separator'
import { theme } from '@/theme'
import { CircleCheck } from 'lucide-react'
import { roles } from '@/types/UserRoles'

interface comboprops{
    data:roles[],
    value:number[],
    dataKey:keyof roles
    datavalue:keyof roles
    label:string,
    multiple?:boolean
    onchange?:(value: number[])=>void
}

const RolesComboBox:React.FC<comboprops> = ({data,value,label,dataKey,datavalue,onchange}) => {
    const [isOpen,setisOpen] = useState<boolean>(false)
    const [activeList,setactiveList] = useState<roles[]>([])
    const [filteredList,setfilteredList] = useState<roles[]>([])
    

    useEffect(()=>{
        if(data.length){
            const filterList = data.filter(item=> value.includes(item[dataKey] as number))
            setactiveList(filterList);
            setfilteredList(data);
        }
    },[value,data])

    const handleSearch = (e:BaseSyntheticEvent)=>{
        const searchTerm = e.target.value.toLowerCase();
        if (searchTerm) {
        const findList = data.filter((item) =>
            String(item[datavalue]).toLowerCase().includes(searchTerm)
        );
        setfilteredList(findList);
        } else {
        setfilteredList(data);
        }
  };

    const handleSelectItem = (selecteditem:number)=>{
        let selected = []
        if(value.includes(selecteditem)){
            selected = value.filter(_=>_!=selecteditem)
        }else{
            selected = [...value,selecteditem]
        }
        if(onchange)
            onchange(selected)
    }
  return (
    <div>
        <div className="comboContainer relative w-full flex items-center flex-wrap rounded-[10px]" style={{border:"1px solid var(--color-gray-300)"}}>
            {
                activeList.map(_=>(<label className='p-1 px-[8px] h-fit m-0 text-white mx-1 rounded-2xl text-[13px]' style={{background:theme.colors.primary[4]}}>{_[datavalue]}</label>))
            }
            <div className="">
                <input type='search' onChange={handleSearch} id='roleInput' className='text-[14px] px-2 py-2 outline-none border-none focus-visible:border-none shadow-none' placeholder={label} onFocus={()=>setisOpen(true)} onBlur={()=>setTimeout(() => {
                    setisOpen(false)
                }, 200)}/>
            </div>
           {
            isOpen?(
                <div className="absolute bg-white w-[80%] top-10 rounded-[10px] p-3 z-999" style={{boxShadow:'2px 3px 10px #0000001c'}}>
                    {
                         filteredList.length?
                        filteredList.map((item,index)=>(
                            <>
                            <Button className='w-full cursor-pointer flex justify-between text-[13px] text-gray-700' variant={'ghost'} onClick={()=>handleSelectItem(item[dataKey] as number)}>
                                {item[datavalue]}
                                {
                                    value.includes(item[dataKey] as number)?
                                    (<CircleCheck stroke={theme.colors.success[8]} size={30}/>):
                                    ''
                                }
                                </Button>
                            {
                                filteredList.length-1!=index?
                                (<Separator/>):''
                            }
                            </>
                        )):
                        (<p className='text-[13px]'>No Result</p>)
                    }
                </div>
            ):''
           }
        </div>
    </div>
  )
}

export default RolesComboBox