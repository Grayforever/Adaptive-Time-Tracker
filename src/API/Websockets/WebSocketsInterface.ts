import Pusher from 'pusher-js'
import { useEffect, useState } from 'react'

interface props{
    message:string
}

export const useSockets = ()=>{
    const [socketMessage,setsocketMessage]=useState<props>()
    useEffect(()=>{
        const pusher = new Pusher('427204b31ff24972ae41', {
            cluster: 'mt1',
            wsHost: '127.0.0.1',
            wsPort: 6001,
            forceTLS: false,
            disableStats: true,
        });
      
        const channel = pusher.subscribe('BroadCastChannel');
      
        channel.bind('BroadCastNotifications', (data:{message:string}) => {
            setsocketMessage(data);
        });
      
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    },[])

    return socketMessage
}